import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [ email, setEmail] = useState('');
    const [ senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();


    const handleSubmit = ()=>{
        navigate("/clientes")
    }

    return(
        <div>
            <form>
                <label>email</label>
                <input type="email" placeholder="digite seu email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
                <label>senha</label>
                <input type="password" placeholder="Digite sua Senha" value={senha} onChange={(e)=> setSenha(e.target.value)} required />
                <button type="submit" onClick={handleSubmit}>entrar</button>
                
            </form>
            <div>{erro && (
                <strong>Erro: {erro}</strong>
            )}</div>
        </div>
    )
}