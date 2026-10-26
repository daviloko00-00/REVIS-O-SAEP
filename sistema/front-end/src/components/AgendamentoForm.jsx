import { useState } from "react";

export default function AgendamentoForm({ veiculos, onSalvar, }) {
    const [formData, setFormaData] = useState({
        veiculoId: '',
        dataAgendamento: '',
        descricaoServico: '',
        status: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar(formData);

        setFormaData({
            veiculoId: '',
            dataAgendamento: '',
            descricaoServico: '',
            status: '',

        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormaData((prevData) => ({ ...prevData, [name]: value, }))
    }

    return (
        <div>
            <h5>
                Novo Agendamento
                <form >
                    <label>Veículo do Atendimento</label>
                    <select name="veiculoId" value={formData.veiculoId} required onChange={handleChange}>
                        <option value="">Selecione O veiculo</option>
                        {
                            veiculos.map(
                                (veiculo) => (
                                    <option value={veiculo.id} key={veiculo.id}>
                                        {veiculo.modelo} (CPF: {veiculo.placa})
                                    </option>
                                )
                            )
                        }
                    </select>
                    <label>data do Agendamento</label>
                    <input type="datetime-local" name="dataAgendamento" value={formData.dataAgendamento} required onChange={handleChange} />
                    <label>descricaoServico</label>
                    <textarea rows="2" name="descricaoServico" value={formData.descricaoServico} required onChange={handleChange} ></textarea>
                    
                    <button type="submit" onClick={handleSubmit}>
                        Confirmar Agendamento
                    </button>
                </form>
            </h5>
        </div>
    )
}