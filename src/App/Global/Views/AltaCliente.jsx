import { Box, Button, CircularProgress, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useToast from '../../../Hooks/useToast';
import { useDispatch, useSelector } from 'react-redux';
import { startAlataCuenta, startAltaCliente, startAsignarTarjetaDebito } from '../../../Store/Clientes/Thunks';


const AltaCliente = ({ onNext }) => {
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const { personalData, solicitud } = useSelector(state => state.prospectos);
    const { cliente, cuenta } = useSelector(state => state.clientes);

    const [show, setShow] = useState(true);
    const [tdd, setTdd] = useState(false);
    const [asingTdd, setAsingTdd] = useState(false);
    const [showCircular, setShowCircular] = useState(false);
    const [altaCuenta, setAltaCuenta] = useState(true);
    const [noTdd, setNoTdd] = useState();

    useEffect(() => {
        if (personalData.producto === 'CLIENTE UNICO') {
            setAltaCuenta(false);
        }

        const timer = setTimeout(async () => {
            setShow(false);

            const clienteResp = await altaCliente();
            if (clienteResp?.status === 200 || clienteResp?.status === 'OK') {
                if (personalData.producto !== 'CLIENTE UNICO') {
                    await altaCuentaCliente(clienteResp?.data?.idClienteUnico);
                }
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const altaCliente = async () => {
        const resp = await dispatch(startAltaCliente());

        if (resp?.status === 200 || resp?.status === 'OK') {
            showToast('El cliente ha sido dado de alta correctamente.', 'success', 'top-center');
            return resp;
        }

        if (resp?.status === 500) {
            showToast('Error general', 'error', 'top-center');
        } else {
            showToast(resp?.message || 'Error desconocido', 'error', 'top-center');
        }

        return resp;
    };

    const altaCuentaCliente = async (idClienteUnico) => {
        await dispatch(startAlataCuenta(idClienteUnico));
    };

    const altaDeTarjeta = async () => {
        const resp = await dispatch(startAsignarTarjetaDebito());

        if (resp?.status === 200 || resp?.status === 'OK') {
            showToast('La tarjeta se asignó a la cuenta correctamente.', 'success', 'top-center');
            setAsingTdd(true);
            setTdd(true);
            setNoTdd(resp.data);
        } else if (resp?.status === 500) {
            showToast('No es posible dar de alta una tarjeta de débito. Comuníquese a atención a empleados.', 'error', 'top-center');
            setAsingTdd(false);
            setTdd(false);
        } else {
            showToast(resp?.message || 'Error desconocido', 'error', 'top-center');
            setAsingTdd(false);
            setTdd(false);
        }
    };

    const handleTdd = () => {
        setAsingTdd(true);
        setShowCircular(true);

        const timer = setTimeout(async () => {
            await altaDeTarjeta();
            setShowCircular(false);
        }, 10000);

        return () => clearTimeout(timer);
    };

    const handleSubmit = () => {
        if (altaCuenta) {
            onNext();
        } else {
            window.location.reload();
        }
    };
    return (
        <Box
            p={4}
            height="100%"
            display="flex"
            flexDirection="column"
            sx={{ '& .MuiTextField-root': { m: 1 } }}
        >
            <Typography variant="h5" gutterBottom>
                ALTA CLIENTE
            </Typography>
            <Typography fontSize={"10px"}>
                ID De Evaluacion: {solicitud.idSolicitud}
            </Typography>
            <Box p={1} mt={5}>
                {show ?
                    <Box sx={{
                        display: 'flex',
                        alignContent: 'center',
                        verticalAlign: 'center'
                    }}>
                        <CircularProgress />
                        <Typography mt={1} ml={2} fontSize={"20px"}>ESPERA MIENTAS DAMOS DE ALTA A SU CLIENTE...</Typography>
                    </Box>
                    :
                    <Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontSize={"15px"}><strong>ID Cliente Unico:</strong></Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontSize={"15px"}>{cliente?.idClienteUnico}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    {(altaCuenta) ?
                                        <TableRow>
                                            <TableCell>
                                                <Typography fontSize={"15px"}><strong>No. Cuenta:</strong></Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontSize={"15px"}>{cuenta?.idCuenta}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        : null}
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontSize={"15px"}><strong>Sucursal:</strong></Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontSize={"15px"}>{cliente?.sucLogin}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontSize={"15px"}><strong>Banquero Personal:</strong></Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontSize={"15px"}>{cliente?.bpLogin}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    {(altaCuenta) ?
                                        <TableRow>
                                            <TableCell>
                                                <Typography fontSize={"15px"}><strong>Tarjeta Debito Asignada a la cuenta:</strong></Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box display={"flex"} width={"100%"}>
                                                    {!tdd ?
                                                        <Box width={"50%"}>
                                                            <Typography>Sin Asignar</Typography>
                                                        </Box>
                                                        :
                                                        <Box width={"100%"}>
                                                            <Typography>{noTdd?.noTarjeta}</Typography>
                                                        </Box>
                                                    }
                                                    {!asingTdd ?
                                                        <Box width={"50%"} display={"flex"} alignContent={"flex-end"} justifyContent={"flex-end"}>
                                                            <Button onClick={() => handleTdd()}>Asignar</Button>
                                                        </Box>
                                                        : null
                                                    }
                                                    {(showCircular) ?
                                                        <Box width={"50%"} display={"flex"} alignContent={"flex-end"} justifyContent={"flex-end"}>
                                                            <CircularProgress />
                                                        </Box>
                                                        : null
                                                    }
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                        : null}
                                    {(altaCuenta) ?
                                        <TableRow>
                                            <TableCell>
                                                <Typography fontSize={"15px"}><strong>Cuenta:</strong></Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontSize={"15px"}>{cuenta?.producto}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        : null}
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <Box display="flex" justifyContent="flex-end" mt={3}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleSubmit}
                            >
                                SIGUIENTE
                            </Button>
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default AltaCliente
