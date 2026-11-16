import pool from "../config/dbconfig.js";

class VeiculoController {
    async listar(req, res) {
        try {
            const [rows] = await pool.query(
                'SELECT  v.id, v.marca, v.modelo, v.placa, v.ano, c.nome as NomeCliente  FROM veiculos v join clientes c on v.cliente_id = c.id ORDER BY v.id DESC  ');

            return res.json(rows)
        } catch (error) {
            console.error('Erro ao listar veiculo', error);
            return res.status(500).json({
                error: "Erro ao buscar os veiculos",
                errorMessage: error.message
            });
        }
    }

    async criar(req, res) {
        const { placa, modelo, marca, ano, cliente_id } = req.body;

        if (!placa || !modelo || !marca || !ano || !cliente_id)
            return res.status(400).json({
                error: "todos os campos devem ser preenchidos"
            })
        try {
            const [result] = await pool.query(
                `INSERT INTO veiculos ( placa, modelo, marca, ano, cliente_id ) VALUES (?,?,?,?,?);`, [placa, modelo, marca, ano, cliente_id]
            )
            return res.status(201).json({
                message: "Veiculo cadastrado com sucesso.",
                id: result.insertId
            })
        } catch (error) {
            console.error('Erro ao cadastrar veiculo', error);
            return res.status(500).json({
                error: "Erro ao cadastrar os veiculos",
                errorMessage: error.message
            });
        }
    }
}
export default new VeiculoController();