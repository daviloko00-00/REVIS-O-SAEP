import { useState } from "react";
import VeiculoForm from "../components/VeiculoForm";


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

const veiculosMockados = [
    {
        id: 1,
        placa: "ABC-1234",
        modelo: "Palio",
        marca: "Fiat",
        ano: 2008,
        clienteId: 1
    },
    {
        id: 2,
        placa: "CDE-1234",
        modelo: "Civic",
        marca: "Honda",
        ano: 2011,
        clienteId: 2
    }
]

export default function VeiculoPage() {
    const [clientes, setClientes] = useState(clientesMockados);
    const [veiculos, setVeiculos] = useState(veiculosMockados);


    const handleSalvar = (dadosVeiculo) => {
        const novoVeiculo ={
            ...dadosVeiculo,
            id: crypto.randomUUID
        }

        setVeiculos( veiculos => [...veiculos, novoVeiculo])
    }


    return (
        <div>
            <h3>Gerenciamento de Clientes</h3>

            <VeiculoForm
                clientes={clientes}
                onSalvar={handleSalvar}


            />

            <table>
                <thead>
                    <tr>
                        <th>Placa </th>
                        <th>Modelo</th>
                        <th>Marca </th>
                        <th>Ano</th>
                        <th>Cliente proprietário</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        veiculos.map(
                            veiculo => (
                                <tr key={veiculo.id}>
                                    <td>{veiculo.placa}</td>
                                    <td>{veiculo.modelo}</td>
                                    <td>{veiculo.marca}</td>
                                    <td>{veiculo.ano}</td>
                                    <td>{clientes.map(
                                        cliente => cliente.id == veiculo.clienteId && cliente.nome
                                    )}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>


        </div>
    )

}