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

            rows.forEach((row) =>{
                const cpf_cliente =crypto.decrypt(row.CPF_CLIENTE);
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

        }

    } catch(error) {
        console.error('Erro ao listar agendamento', error);
        return res.status(500).json({
            error: "Erro ao buscar os agendamentos",
            errorMessage: error.message
        });
    }
}
export default new AgendamentoController();