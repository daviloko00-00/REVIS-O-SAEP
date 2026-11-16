import pool from "../config/dbconfig.js";
import crypto from "../utils/crypto.js";

class AgendamentoController {
    async listar(req, res) {
        const { ordenarPor } = req.query;

        try {
            let orderByClause = `ORDER BY DATE (a.data_agendamento) ASC, a.data_agendamento ASC;`
            if (ordenarPor === 'mes') {
                let orderByClause = `ORDER BY MONTH (a.data_agendamento) ASC, a.data_agendamento ASC;`
            } else if (ordenarPor === 'ano') {
                let orderByClause = `ORDER BY YEAR (a.data_agendamento) ASC, a.data_agendamento ASC;`
            }
            const sql = `SELECT  
	a.id, a.data_agendamento, a.descricao_servico, a.status, 
    c.id AS ID_CLIENTE, c.nome as NOME_CLIENTE, c.cpf as CPF_CLIENTE, c.telefone 
    AS TELEFONE_CLIENTE, c.email AS EMAIL_CLIENTE,
    v.id as VEICULO_ID, v.placa as PLACA_VEICULO, v.modelo as MODELO_VEICULO, v.marca as MARCA_MODELO, v.ano as ANO_VEICULO
    FROM agendamentos a
    JOIN veiculos v 
    ON a.veiculo_id = v.id
    join clientes c 
    on v.cliente_id = c.id
    ${orderByClause}
    `;
            const [rows] = await pool.query(sql);
            console.log(rows)

            rows.forEach((row) => {
                const cpf_cliente = crypto.decrypt(row.CPF_CLIENTE);
                row.CPF_CLIENTE = cpf_cliente

                console.log(cpf_cliente)
            })



            // const agendamentos = rows.map((row)=>({
            //     id : row.id,
            //     data_agendamento : row.data_agendamento,
            //     descricao_servico: row.descricao_servico,
            //     veiculo_id : row.veiculo_id,
            //     status: row.status,
            //     cliente_id: row.cliente_id,
            //     cliente_nome: row.cliente_nome

            // }))
            return res.json(rows)



        } catch (error) {
            console.error('Erro ao listar agendamento', error);
            return res.status(500).json({
                error: "Erro ao buscar os agendamentos",
                errorMessage: error.message
            });
        }
    }
    async criar(req, res) {
        const { data_agendamento, descricao_servico, veiculo_id, status } = req.body;
        console.log(req.body);

        if (!data_agendamento || !descricao_servico || !veiculo_id)
            res.status(400).json({ message: 'Todos os campos são obrigatórios' });

        try {
            const [result] = await pool.query(
                'INSERT INTO agendamentos (data_agendamento, descricao_servico, veiculo_id, status) VALUES (?, ?, ?, ?);', [data_agendamento, descricao_servico, parseInt(veiculo_id, 10), status || 'Agendado']
            );

            return res.status(201).json({ message: "Agendamento cadastrado com sucesso!", id: result.insertId });

        } catch (error) {
            console.error(error);
            return res.status(500).json(
                {
                    message: ' erro ao cadastrar agendamento', errorMessage: error.message
                }
            );
        }

    }
    async atualizarData(req, res) {
        const { id } = req.params;
        const { nova_data } = req.body;

        if (!nova_data)
            return res.status(400).json({ message: "Insira uma nova data para a atualização" });
        try {
            const [result] = await pool.query(`UPDATE agendamentos SET data_agendamento = ? WHERE id = ?`, [nova_data, id]);

            if (result.affectedRows === 0)
                return res.status(404).json({ error: "Agendamento não encontrado" });

            return res.json({ message: " data de agendamento atualizada no sistema" })
        } catch (error) {
            console.error("Erro ao atualizar data de agendamento", error);
            return res.status(500).json({
                error: "Erro ao salvar a nova data no banco"
            })
        }

    }
}
export default new AgendamentoController();