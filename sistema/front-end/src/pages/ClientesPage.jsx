import { useState, useEffect } from "react";
import ClienteForm from "../components/ClienteForm";

// const clientesMockados = [{
//     id: 1,
//     nome: "maycon",
//     cpf: "123.456.789-10",
//     telefone: "(19) 12345-1234",
//     email: "maycon@gmail.com"
// },
// {
//     id: 2,
//     nome: "maycon",
//     cpf: "123.456.789-10",
//     telefone: "(19) 12345-1234",
//     email: "maycon@gmail.com"
// },
// {
//     id: 3,
//     nome: "maycon",
//     cpf: "123.456.789-10",
//     telefone: "(19) 12345-1234",
//     email: "maycon@gmail.com"
// },
// {
//     id: 4,
//     nome: "maycon",
//     cpf: "123.456.789-10",
//     telefone: "(19) 12345-1234",
//     email: "maycon@gmail.com"
// },

// ]

export default function ClientesPage() {
    const [clientes, setClientes] = useState([]);
    const [clienteEditando, setClienteEditando] = useState(null);

    const handleCancelarEdicao = () => {
        setClienteEditando();
    }

    const handleSalvar = async (dadosCLientes) => {
        if (clienteEditando)
            setClientes(clientes => clientes.map(
                cliente => cliente.id == clienteEditando.id ? { ...dadosCLientes, id: clienteEditando.id } : cliente
            ))
        else {


            try {
                const resposta = await fetch('http://localhost:3001/api/clientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosCLientes)
                })

                const data = await resposta.json();

                const novoCliente = {
                    ...dadosCLientes,
                    id: data.id
                }
                setClientes(clientes => [...clientes, novoCliente])

            } catch (error) {
                console.error('Erro ao criar cliente', error);
            }
        }

    }
    useEffect(() => {
            const buscaClientes = async () => {
                try {
                    const resposta = await fetch('http://localhost:3001/api/clientes')
                    console.log(resposta);
                    const data = await resposta.json()
                    setClientes(data)
                    
                } catch (error) {
                    console.error('Erro ao buscar o cliente', error)
                }
            }

            buscaClientes();
        }, [])

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