import React, { useEffect, useState } from 'react'
import useToast from '../../../Hooks/useToast';
import { Box, Button, CircularProgress, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startAltaCredito, startAsignarTarjetaCredito } from '../../../Store/Clientes/Thunks';

const AltaTdc = () => {

    const { showToast } = useToast();
    const [show, setShow] = useState(true);
    const [tdc, settdc] = useState();
    const { solicitud } = useSelector(state => state.prospectos);
    const { cliente, cuenta } = useSelector(state=>state.clientes);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(async () => {
            setShow(false);
            await altaCredito();
            await altaTarjeta();
        }, 10000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleSubmit = () => {
        window.location.reload();
    }

    const altaCredito = async () => {
        const resp = await dispatch(startAltaCredito());
        if (resp?.status == 200 || resp?.status == 'OK') {
        } else {
            showToast(resp.message, 'error', 'top-center');
        }
    }

    const altaTarjeta = async () => {
        const resp = await dispatch(startAsignarTarjetaCredito());
        if (resp?.status == 200 || resp?.status == 'OK') {
            settdc(resp?.data?.noTarjeta);
        } else {
            showToast(resp.message, 'error', 'top-center');
        }
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
                ASIGNACION DE TDC
            </Typography>
            <Typography fontSize={"10px"}>
                ID De Evaluacion: {solicitud?.idSolicitud}
            </Typography>
            <Box p={1} mt={5}>
                {show ?
                    <Box sx={{
                        display: 'flex',
                        alignContent: 'center',
                        verticalAlign: 'center'
                    }}>
                        <CircularProgress />
                        <Typography mt={1} ml={2} fontSize={"20px"}>ASIGNANDO TARJETA DE CREDITO...</Typography>
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
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontSize={"15px"}><strong>No. Credito:</strong></Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontSize={"15px"}>{cuenta?.idCredito}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontSize={"15px"}><strong>Sucursal:</strong></Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontSize={"15px"}>{cuenta?.sucSolicitud}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontSize={"15px"}><strong>Banquero Personal:</strong></Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontSize={"15px"}>{cuenta?.bpSolicitud}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontSize={"15px"}><strong>Linea de Credito Autorizada:</strong></Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontSize={"15px"}>{cuenta?.lineaCredito}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontSize={"15px"}><strong>Tarjeta Credito Asignada a la cuenta:</strong></Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{tdc}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontSize={"15px"}><strong>Producto:</strong></Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontSize={"15px"}>{cuenta?.producto}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <Box display="flex" justifyContent="flex-end" mt={3}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleSubmit}
                            >
                                FINALIZAR
                            </Button>
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default AltaTdc
