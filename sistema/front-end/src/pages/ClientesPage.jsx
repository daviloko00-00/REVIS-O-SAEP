import { useState } from "react";
import ClienteForm from "../components/ClienteForm";


const clientesMockados = [{
    id: 1,
    nome: "maycon",
    cpf: "123.456.789-10",
    telefone: "(19) 12345-1234",
    email: "maycon@gmail.com"
},
{
    id: 2,
    nome: "maycon",
    cpf: "123.456.789-10",
    telefone: "(19) 12345-1234",
    email: "maycon@gmail.com"
},
{
    id: 3,
    nome: "maycon",
    cpf: "123.456.789-10",
    telefone: "(19) 12345-1234",
    email: "maycon@gmail.com"
},
{
    id: 4,
    nome: "maycon",
    cpf: "123.456.789-10",
    telefone: "(19) 12345-1234",
    email: "maycon@gmail.com"
},

]

export default function ClientesPage() {
    const [clientes, setClientes] = useState(clientesMockados);
    const [clienteEditando, setClienteEditando] = useState(null);

    const handleCancelarEdicao = () => {
        setClienteEditando(null);
    }

    const handleSalvar = (dadosCLientes) => {
        if (clienteEditando)
            setClientes(clientes => clientes.map(
                cliente => cliente.id == clienteEditando.id ? { ...dadosCLientes, id: clienteEditando.id } : cliente
            ))
        else {
            const novoCliente = {
                ...dadosCLientes,
                id: Date.now()
            }
            setClientes(clientes => [...clientes, novoCliente])
        }
        

    }

    return (
        <div>
            <h3>Gerenciamento de Clientes</h3>

            <ClienteForm
                clienteEditando={clienteEditando}
                onCancelar={handleCancelarEdicao}
                onSalvar={handleSalvar}


            />

            <table>
                <thead>
                    <tr>
                        <th>Nome do Ciiente </th>
                        <th>CPF </th>
                        <th>Telefone </th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientes.map(
                            cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.email}</td>
                                    <td><button onClick={() => setClienteEditando(cliente)}>✏️Editar</button></td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>


        </div>
    )
}