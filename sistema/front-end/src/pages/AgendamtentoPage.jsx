import { useEffect, useState } from "react";
import AgendamentoForm from "../components/AgendamentoForm";
import AlterarDataForm from "../components/AlterarDataForm";


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
//         placa: "XYZ-4321",
//         modelo: "Civic",
//         marca: "Honda",
//         ano: 2011,
//         clienteId: 2
//     }
// ]

// const agendamentosMockados = [
//     {
//         id: 1,
//         veiculoId: 1,
//         dataAgendamento: "2027-10-31T09:00:00",
//         descricaoServico: "Troca de óleo",
//         status: "Agendado"
//     },
//     {
//         id: 2,
//         veiculoId: 2,
//         dataAgendamento: "2026-10-31T14:30:00",
//         descricaoServico: "Alinhamento e balanceamento",
//         status: "Agendado"
//     }
// ]

export default function AgendamentoPage() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [agendamentoEditando, setagendamentoEditando] = useState(null);

    const [ordenacao, setOrdenacao] = useState('dia');

    const handleMudarOrdenacao = (novaOrdenacao) => {
        setOrdenacao(novaOrdenacao);
    }

    useEffect(() => {
        const buscaAgendamentosEVeiculos = async () => {
            try {
                const resposta = await fetch('http://localhost:3001/api/agendamentos');
                const veiculoResposta = await fetch('http://localhost:3001/api/veiculos');


                const data = await resposta.json();
                const dataVeiculo = await veiculoResposta.json();

                console.log([data, dataVeiculo])

                setAgendamentos(data);
                setVeiculos(dataVeiculo);


            } catch (error) {
                console.error('Erro ao buscar agendamentos e veículos:', error);
            }
        };

        buscaAgendamentosEVeiculos();
    }, [])

    useEffect(() => {

        const agendamentosOrdenados = [...agendamentos];

        if (ordenacao == 'dia') {
            agendamentosOrdenados.sort((a, b) => new Date(a.dataAgendamento) - new Date(b.dataAgendamento));
        }
        if (ordenacao == 'mes') {
            agendamentosOrdenados.sort((a, b) => new Date(a.dataAgendamento).getMonth() - new Date(b.dataAgendamento).getMonth());
        }
        if (ordenacao == 'ano') {
            agendamentosOrdenados.sort((a, b) => new Date(a.dataAgendamento).getFullYear() - new Date(b.dataAgendamento).getFullYear());
        }
        setAgendamentos(agendamentosOrdenados);
    }, [ordenacao]);

    const handleSalvar = async (dadosAgendamento) => {
        if (agendamentoEditando) {
            setAgendamentos(agendamentos => agendamentos.map(
                agendamento => agendamento.id == agendamentoEditando.id ? { ...dadosAgendamento, id: agendamentoEditando.id } : agendamento
            ))

        } else {

            try {
                const resposta = await fetch('http://localhost:3001/api/agendamentos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosAgendamento)
                })

                const data = await resposta.json();

                const novoCliente = {
                    ...dadosAgendamento,
                    id: data.id
                }
                setAgendamentos(agendamentos => [...agendamentos, novoCliente])

            } catch (error) {
                console.error('Erro ao criar cliente', error);
            }
        }
    }

    const [agendamentoForm, setAgendamentoForm] = useState(null);
    const handleSalvarNovaData = (novaData) => {
        setAgendamentoForm(agendamentos.map(
            agendamento => {
                if (agendamento.id == agendamentoForm.id) {
                    return { ...agendamento, dataAgendamento: novaData }
                }

                return agendamento;
            }
        ))
        setAgendamentoForm(null);
    }

    return (
        <div>
            <h3>Gerenciamento de Agendamentos</h3>

            <AgendamentoForm
                onSalvar={handleSalvar}
                veiculos={veiculos}
            />

            <span>Critério de Ordenação:</span>
            <button onClick={() => handleMudarOrdenacao('dia')}>Por Dia</button>
            <button onClick={() => handleMudarOrdenacao('mes')}>Por Mês</button>
            <button onClick={() => handleMudarOrdenacao('ano')}>Por Ano</button>

            <table>
                <thead>
                    <tr>
                        <th>Data e Horário</th>
                        <th>Serviço</th>
                        <th>Veículo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        agendamentos.map(
                            agendamento => (
                                <tr key={agendamento.id}>
                                    <td>
                                        {new Date(agendamento.
                                            data_agendamento
                                        ).toLocaleDateString('pt-BR')} |
                                        {new Date(agendamento.
                                            data_agendamento
                                        ).toLocaleTimeString('pt-BR')}
                                    </td>

                                    <td>{agendamento.descricao_servico}</td>

                                    <td>{
                                        veiculos.map(
                                            veiculo => veiculo.id == agendamento.VEICULO_ID && `${veiculo.modelo} ${veiculo.ano}`
                                        )
                                    }</td>

                                    <td>
                                        <button onClick={() => setAgendamentoForm(agendamento)}>
                                            Alterar Data
                                        </button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>

            <AlterarDataForm
                isOpen={!!agendamentoForm}
                agendamento={agendamentoForm}
                onSalvar={handleSalvarNovaData}
                onFechar={() => setAgendamentoForm(null)}
            />
        </div>
    )

}