import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CarteraPage from '../../App/Ejecutivos/Pages/CarteraPage'

const EjecutivosRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<CarteraPage />} />
            <Route path="cartera" element={<CarteraPage />} />
        </Routes>
    )
}

export default EjecutivosRoutes
