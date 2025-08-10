import { Alert, Box, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startPutCuentaCliente, strartObtenerCuentasCliente } from '../../../Store/Clientes/Thunks'
import useToast from '../../../Hooks/useToast'
import { useLoading } from '../../../Hooks/LoadingContext'
import AccountCard from '../Components/AccountCard'

const SeleccionCuentasClienteView = ({onNext}) => {
    const { cliente } = useSelector(state => state.clientes)
    const [cuentasCliente, setCuentasCliente] = useState([])
    const [showAccount, setShowAccount] = useState(false)
    const { isLoading, startLoading, stopLoading } = useLoading()
    const showToast = useToast()

    const dispatch = useDispatch()

    useEffect(() => {
        obtenerCuentasCliente()
    }, [])

    const obtenerCuentasCliente = async () => {
        if (!cliente?.idClienteUnico) {
            showToast('No se encontró el ID del cliente', 'error')
            return
        }

        startLoading()
        const resp = await dispatch(strartObtenerCuentasCliente(cliente.idClienteUnico))
        if (resp?.status === 200 || resp?.status === 'OK') {
            setCuentasCliente(resp?.data)
            setShowAccount(true)
        } else {
            showToast('Error al obtener cuentas del cliente', 'error', 'top-center')
        }

        stopLoading()
    }

    const seleccion = (account) => {
        dispatch(startPutCuentaCliente(account));
        onNext();
    }

    return (
        <Box
            p={4}
            height="100%"
            display="flex"
            flexDirection="column"
            sx={{ '& .MuiTextField-root': { m: 1 } }}
        >
            <Typography variant="h5" gutterBottom>
                SELECCIÓN DE CUENTA DEL CLIENTE
            </Typography>

            <Typography variant="body1" gutterBottom>
                Favor de seleccionar la cuenta del cliente en la que desea recibir su nómina.
            </Typography>
            <Box sx={{ flexGrow: 1, mt: 2 }}>
                {isLoading ? (
                    <Typography>Cargando cuentas...</Typography>
                ) : (
                    showAccount && (
                        <Grid2 container spacing={2}>
                            {cuentasCliente.map((cuenta, index) => (
                                <Grid2 item xs={12} sm={6} md={4} key={index}>
                                    {cuenta?.producto == 'PERFIS N4 INVERSION' ?
                                        null
                                        : <AccountCard data={cuenta} seleccion={(data)=>seleccion(data)}/>
                                    }
                                </Grid2>
                            ))}
                        </Grid2>
                    )
                )}
                {cuentasCliente?.length == 0 && !isLoading ?
                <Alert severity='warning' color="warning">El cliente no cuenta con cuentas disponibles para realizar portabilidad de nomina.</Alert>
                :null
                }
            </Box>
        </Box>
    )
}

export default SeleccionCuentasClienteView
