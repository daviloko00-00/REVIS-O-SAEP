import pool from "../config/dbconfig.js";

class VeiculoController {
    async listar(req, res) {
        const [rows] = await pool.query(
            'SELECT  v.id, v.marca, v.modelo, c.nome as NomeCliente FROM veiculos v join clientes c on v.cliente_id = c.id ORDER BY v.id DESC  ');
        
        return res.json(rows)
    } catch(error) {
        console.error('Erro ao listar veiculo', error);
        return res.status(500).json({
            error: "Erro ao buscar os veiculos",
            errorMessage: error.message
        });
    }
}
export default new VeiculoController();