import { useState, useEffect } from "react";
import VeiculoForm from "../components/VeiculoForm";


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

// const veiculosMockados = [
//     {
//         id: 1,
//         placa: "ABC-1234",
//         modelo: "Palio",
//         marca: "Fiat",
//         ano: 2008,
//         clienteId: 1
//     },
//     {
//         id: 2,
//         placa: "CDE-1234",
//         modelo: "Civic",
//         marca: "Honda",
//         ano: 2011,
//         clienteId: 2
//     }
// ]

export default function VeiculoPage() {
    const [clientes, setClientes] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [veiculoEditando, setVeiculoEditando] = useState(null)


    const handleSalvar = async (dadosVeiculos) => {
        if (setVeiculoEditando)
            setVeiculos(Veiculos => Veiculos.map(
                veiculo => veiculo.id == veiculoEditando.id ? { ...dadosVeiculos, id: veiculoEditando.id } : veiculo))

        else {

            try {
                const resposta = await fetch('http://localhost:3001/api/veiculos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosVeiculos)
                })

                const data = await resposta.json();

                const novoVeiculo = {
                    ...dadosVeiculos,
                    id: data.id
                }
                setVeiculos(veiculo => [...veiculo, novoVeiculo])

            } catch (error) {
                console.error('Erro ao criar cliente', error);
            }
        }

    }

    useEffect(()=>{
        const buscaVeiculos = async () => {
            const resposta  = await fetch('http://localhost:3001/api/veiculos');
            const dados = await resposta.json();
            setVeiculos(dados)
            console.log(dados)
        }
        const buscaClientes = async () => {
            const resposta  = await fetch('http://localhost:3001/api/clientes');
            const dados = await resposta.json();
            setClientes(dados)
            
        }
        
        buscaVeiculos();
        buscaClientes();
    }, [])


    return (
        <div>
            <h3>Gerenciamento de Veículos</h3>

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
                                    <td>{veiculo.NomeCliente}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>


        </div>
    )

}