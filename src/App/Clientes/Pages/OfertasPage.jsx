import React from 'react'
import AppLayout from '../../Layout/AppLayout'
import { Box } from '@mui/material'
import { BusquedaClientesComponent } from '../Components/BusquedaClientesComponent'

export const OfertasPage = () => {
  return (
    <AppLayout>
        <Box>
            <Box>
                <BusquedaClientesComponent/>
            </Box>
        </Box>
    </AppLayout>
  )
}
