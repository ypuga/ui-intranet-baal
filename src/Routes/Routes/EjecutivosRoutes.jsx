import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CarteraPage from '../../App/Ejecutivos/Pages/CarteraPage'
import ClientesPage from '../../App/Ejecutivos/Pages/ClientesPage'

const EjecutivosRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<CarteraPage />} />
            <Route path="cartera" element={<CarteraPage />} />
            <Route path="clientes" element={<ClientesPage/>} />
        </Routes>
    )
}

export default EjecutivosRoutes
