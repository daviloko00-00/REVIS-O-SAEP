import mysql from 'mysql2/promise.js';
import 'dotenv'

class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.HOST || 'localhost',
            user: process.env.USER || 'root',
            password: process.env.PASSWORD || '1234',
            database: process.env.DATABASE || 'oficina_db',
            port: process.env.PORT || '3306',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        })
    }
    getPool() {
        return this.pool
    }
    async testConnection() {
        try {
            const conn = await this.pool.getConnection()
            console.log('Conexão com o MYSQL realizada')
        } catch (error) {
            console.log("Erro ao realizar a conexão:", error.message);
        }
    }
}

const databaseInstance = new Database();
databaseInstance.testConnection();

export default databaseInstance.getPool();