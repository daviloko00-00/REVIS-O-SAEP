import mysql from 'mysql2/promise.js';
import 'dotenv'

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port : process.env.PORT,
    waitForConnections: true,
    connectionLimit : 10,
    queueLimit : 0,
})

export default connection;
