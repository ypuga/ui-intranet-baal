import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../App/Home/Pages/Home'
import AuthRoutes from './Routes/AuthRoutes'
import { useSelector } from 'react-redux'
import ProspectosRoutes from './Routes/ProspectosRoutes'
import ClientesRoutes from './Routes/ClientesRoutes'
import EjecutivosRoutes from './Routes/EjecutivosRoutes'

const AppRouter = () => {

  const { isAuth } = useSelector(state => state.sistema);

  return (
    <Routes>
      {!isAuth ? (
        <Route path="*" element={<AuthRoutes />} />
      ) : (
        <>
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/prospectos/*" element={<ProspectosRoutes />} />
          <Route path='/clientes/*' element={<ClientesRoutes/>}/>
          <Route path='/ejecutivo/*' element={<EjecutivosRoutes/>}/>
        </>
      )}
    </Routes>

  )
}

export default AppRouter
