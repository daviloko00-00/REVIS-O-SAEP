import 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/router.js';
import crypto from './utils/crypto.js';

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:3000'
    ],
    credentials: true
}))

//MIDDLEWARES para parsing do corpo e cookies
app.use(express.json())
app.use(cookieParser())


//ROTAS E API
app.use("/api", router);

//MIDDLEWARES para rotas não encontradas
app.use((req, res) =>{
    res.status(404).json({
        error: 'Recurso ou rota não encontrada'
    })
})
const original = "12345678901";

const encrypted = crypto.encrypt(original);
const decrypted = crypto.decrypt(encrypted);

console.log({ original, encrypted, decrypted });

//inicialização do servidor
app.listen(PORT, ()=>{
    console.log(`Servidor respondendo em http://localhost:${PORT}`)
})