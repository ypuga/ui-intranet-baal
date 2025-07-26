import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FinshTramitePage from '../../App/Clientes/Pages/FinshTramitePage'
import FinishTramiteCrmPage from '../../App/Clientes/Pages/FinishTramiteCrmPage'

const FinalizarTramitesRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<FinshTramitePage />} />
            <Route path="tdc" element={<FinshTramitePage />} />
            <Route path="crm" element={<FinishTramiteCrmPage />} />
        </Routes>
    )
}

export default FinalizarTramitesRoutes
