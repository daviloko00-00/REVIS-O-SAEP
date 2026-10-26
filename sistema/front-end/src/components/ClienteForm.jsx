import { useEffect, useState } from "react";

export default function ClienteForm({ clienteEditando, onSalvar, onCancelar }) {
    const [formData, setFormaData] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: ''
    })

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSalvar(formData);
        setFormaData({
            nome: '',
            cpf: '',
            telefone : '',
            email: '',

        })
    }

    const handleCancelar = (e) =>{
        setFormaData({
            nome: '',
            cpf: '',
            telefone : '',
            email: '',

        })
    }
    

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormaData((prevData)=>({...prevData, [name] : value,}))
    }

    return (
        <div>
            <h5>
                {clienteEditando ? `✏️Editando Cliente : ${clienteEditando.nome} ` : 'Cadastar novo CLiente'}
                <form >
                    <label>nome Completo</label>
                    <input type="text" name="nome" value={formData.nome} required onChange={handleChange} />
                    <label>CPF</label>
                    <input type="text" name="cpf" value={formData.cpf} required onChange={handleChange} />
                    <label>Telefone</label>
                    <input type="text" name="telefone" value={formData.telefone} required onChange={handleChange} />
                    <label>email</label>
                    <input type="email" name="email" value={formData.email} required onChange={handleChange} />

                    {clienteEditando && (
                        <button type="button" onClick={handleCancelar}>
                            Cancelar
                        </button>
                    )
                    }
                    <button type="submit" onClick={handleSubmit}>
                        Salvar Cliente
                    </button>
                </form>
            </h5>
        </div>
    )
}