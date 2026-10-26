import pool from "../config/dbconfig.js";
import crypto from "../utils/crypto.js";


class ClienteController {
    async listar(req, res) {
        const { termo } = req.query;

        try {
            let clientes;
            if (termo && termo.trim() != '') {
                const busca = `%${termo.trim()}%`
                const [rows] = await pool.query('SELECT * FROM clientes WHERE nome LIKE ? OR email LIKE ? ORDER BY id DESC', [busca, busca]);
                clientes = rows
            } else {
                const [rows] = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
                clientes = rows
            }
            return res.json(clientes)
        } catch (error) {
            console.error('Erro ao listar cliente', error);
            return res.status(500).json({
                error: "Erro ao buscar os clientes",
                errorMessage: error.message
            });

        }
    }

    async criar(req, res) {
        const { nome, cpf, telefone, email } = req.body;
        if (!nome || !cpf || !telefone || !email) {
            return res.status(400).json({ error: "Verifique os valores enviados" });
        }
        try {
            
            const cpfCriptografado = crypto.encrypt(cpf);
            const [rows] = await pool.query(`INSERT INTO clientes (nome, cpf, telefone, email) VALUES (?,?,?,?)`, [nome, cpfCriptografado, telefone, email]);
            return res.status(201).json({message: 'Registro realizado com sucesso', id: rows.insertId});
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error)
            return res.status(500).json({
                error: "Erro ao cadastrar cliente",
                errorMessage: errorMessage
            })
        }
    }
}
export default new ClienteController();