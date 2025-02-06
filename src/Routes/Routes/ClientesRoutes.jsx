import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AltaTDCPage from '../../App/Clientes/Pages/AltaTDCPage'
import AltaCRPPage from '../../App/Clientes/Pages/AltaCRPPage'
import AltaCRMPage from '../../App/Clientes/Pages/AltaCRMPage'
import AltaCuentaClientesPage from '../../App/Clientes/Pages/AltaCuentaClientesPage'
import { OfertasPage } from '../../App/Clientes/Pages/OfertasPage'

const ClientesRoutes = () => {
  return (
    <Routes>
        <Route path="solicitar/*" element={<AltaCuentaClientesPage/>}/>
        <Route path="solicitar/tdc" element={<AltaTDCPage/>}/>
        <Route path="solicitar/crp" element={<AltaCRPPage/>}/>
        <Route path="solicitar/crm" element={<AltaCRMPage/>}/>
        <Route path="solicitar/cuenta-clientes" element={<AltaCuentaClientesPage/>}/>
        <Route path="ofertas/*" element={<OfertasPage/>}/>
    </Routes>
  )
}

export default ClientesRoutes
