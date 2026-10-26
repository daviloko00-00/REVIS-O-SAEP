//algoritmo : AES-256-CBC

import crypto from "crypto";

const algorithm ='aes-256-cbc';
const secretkey = Buffer.from(process.env.CRYPTOKEY || '12345678901234567890123456789012');
const initialIv = Buffer.from(process.env.CPF_IV || '1234567890123456');

function encrypt(text){
    if (!text) return text;
    try {
        const cipher = crypto.createCipheriv(algorithm,secretkey, initialIv)
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (error) {
        console.error('Erro ao criptografar', error);
        return text;        
    }
}

function decrypt(encryptedText){
    if (!encryptedText) return encryptedText;
    try{
    const decipher = crypto.createDecipheriv(
            algorithm,
            secretkey,
            initialIv, 
        );
        let decrypted = decipher.update(
            encryptedText,
            'hex',
            'utf8'
        );
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Erro ao descriptografar', error);
        return error;   
    }
}

export default {encrypt, decrypt}


