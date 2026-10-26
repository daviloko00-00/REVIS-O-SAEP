
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import ClientesPage from "./pages/ClientesPage"
import VeiculoPage from "./pages/VeiculosPAge"
import AgendamentosPage from "./pages/AgendamtentoPage"


function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/clientes" element={<ClientesPage/>}/>
      <Route path="/veiculos" element={<VeiculoPage/>}/>
      <Route path="/agendamentos" element={<AgendamentosPage/>}/>
      <Route path="*" element={<Navigate to="/login" replace/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App
