import { useState } from "react";

export default function VeiculoForm({ clientes, onSalvar, }) {
    const [formData, setFormaData] = useState({
        placa: '',
        modelo: '',
        marca: '',
        ano: '',
        clienteId: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar(formData);
        setFormaData({
            placa: '',
            modelo: '',
            marca: '',
            ano: '',
            clienteId: ''

        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormaData((prevData) => ({ ...prevData, [name]: value, }))
    }

    return (
        <div>
            <h5>
                Cadastar novo Veículo
                <form >
                    <label>placa do Veículo</label>
                    <input type="text" name="placa" value={formData.placa} required onChange={handleChange} />
                    <label>modelo</label>
                    <input type="text" name="modelo" value={formData.modelo} required onChange={handleChange} />
                    <label>marca</label>
                    <input type="text" name="marca" value={formData.marca} required onChange={handleChange} />
                    <label>ano do veículo</label>
                    <input type="number" name="ano" value={formData.ano} required onChange={handleChange} />

                    <label >proprietário do veículo:</label>
                    <select name="clienteId" value={formData.clienteId} required onChange={handleChange}>
                        <option value="">Selecione O Cliente</option>
                        {
                            clientes.map(
                                (cliente) => (
                                    <option value={cliente.id} key={cliente.id}>
                                        {cliente.nome} (CPF: {cliente.cpf})
                                    </option>
                                )
                            )
                        }
                    </select>
                    <button type="submit" onClick={handleSubmit}>
                        Salvar Veículo
                    </button>
                </form>
            </h5>
        </div>
    )
}