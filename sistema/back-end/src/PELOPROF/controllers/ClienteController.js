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
            return res.status(201).json({ message: 'Registro realizado com sucesso', id: rows.insertId });
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error)
            return res.status(500).json({
                error: "Erro ao cadastrar cliente",
                errorMessage: errorMessage
            })
        }
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const { nome, cpf, telefone, email } = req.body;

        if (!nome || !cpf || !telefone || !email)
            return res.status(400).json({
                error: "Todos os campos devem ser obrigatóriamente preenchidos"
            })
        try {
            const cpfCriptografado = crypto.encrypt(cpf);

            const [result] = await pool.query(
                "UPDATE clientes SET nome = ?, cpf = ?, telefone = ?, email = ? WHERE id = ?;",
                [nome, cpfCriptografado, telefone, email, id]);

            if (result.affectedRows === 0)
                return res.status(400).json({
                    error: "Cliente não encontrado para atualização"
                });

            return res.json({
                message: "Dados do cliente atualizados com sucesso"
            })
        } catch (error) {
            console.error('Erro ao atualizar dados do cliente:', error)
            return res.status(500).json({
                error: "Erro ao atualizar o cliente",
                errorMessage: errorMessage
            })
        }
    }
}
export default new ClienteController();