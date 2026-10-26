import connection from "./bdRepositories";


const genericModel = {

    criarCliente: async (nome, cpf, telefone, email) => {
        try {
            const [result] = connection.execute('INSERT INTO clientes (nome, cpf, telefone, email) VALUES (?,?,?,?)', [nome, cpf, telefone, email])
            return result.insertId
        } catch (error) {
            throw error;
        }
    },
    excluirCliente: async (id) => {
        try {
            const [result] = connection.execute('DELETE * FROM clientes WHERE id=?', id);
            return [result]
        } catch (error) {
            throw error;
        }
    },
    alterarCliente: async (nome, cpf, telefone, email) => {
        try {
            const [result] = connection.execute('UPDATE clientes SET nome=? cpf=? telefone=? email? WHERE id=?', [nome, cpf, telefone, email]);
        } catch (error) {
            throw error;
        }
    },

    listarClientes: async () => {
        try {
            const [result] = connection.execute('SELECET * FROM clientes');
            return result;
        } catch (error) {
            throw error;
        }
    },
    criarVeiculo: async (nome, cpf, telefone, email) => {
        try {
            const [result] = connection.execute('INSERT INTO veiculos (nome, cpf, telefone, email) VALUES (?,?,?,?)', [nome, cpf, telefone, email])
            return result.insertId
        } catch (error) {
            throw error;
        }
    },
    excluirVeiculo: async (id) => {
        try {
            const [result] = connection.execute('DELETE * FROM veiculos WHERE id=?', id);
            return [result]
        } catch (error) {
            throw error;
        }
    },
    alterarVeiculo: async (nome, cpf, telefone, email) => {
        try {
            const [result] = connection.execute('UPDATE veiculos SET nome=? cpf=? telefone=? email? WHERE id=?', [nome, cpf, telefone, email]);
        } catch (error) {
            throw error;
        }
    },

    listarVeiculos: async () => {
        try {
            const [result] = connection.execute('SELECET * FROM veiculos');
            return result;
        } catch (error) {
            throw error;
        }
    }
}