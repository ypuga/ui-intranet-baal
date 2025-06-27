import { Box, Button, CircularProgress, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useToast from '../../../Hooks/useToast';
import { useDispatch, useSelector } from 'react-redux';
import { startAlataCuenta, startAsignarTarjetaDebito } from '../../../Store/Clientes/Thunks';


const AltaCuenta = () => {

    const [show, setShow] = useState(true);
    const [tdd, setTdd] = useState(false);
    const [asingTdd, setAsingTdd] = useState(false);
    const [showCircular, setshowCircular] = useState(false);
    const { showToast } = useToast();
    const { personalData } = useSelector(state => state.prospectos);
    const dispatch = useDispatch();
    const { cliente, cuenta } = useSelector(state => state.clientes); 
    const [noTdd, setnoTdd] = useState();

    useEffect(() => {
        const timer = setTimeout(async () => {
            setShow(false);
            await altaCuentaCliente(cliente?.idClienteUnico);
        }, 10000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

        const altaCuentaCliente = async (idClienteUnico) => {
            const resp = await dispatch(startAlataCuenta(idClienteUnico));
            if (resp.status == 'OK', resp.status == 200) {
                showToast('La cuenta ha sido activada exitosamente!!!', 'success', 'top-center');
            } else {
                showToast(resp.message, 'error', 'top-center');
            }
        }

    const handleTdd = () => {
        setAsingTdd(true);
        setshowCircular(true);
        const timer = setTimeout(async() => {
            setAsingTdd(true);
            setshowCircular(false);
            setTdd(true);
            await altaDeTarjeta();
        }, 10000);
        return () => {
            clearTimeout(timer);
        };
    }

        const altaDeTarjeta = async () => {
            const resp = await dispatch(startAsignarTarjetaDebito());
            if (resp.status == 'OK', resp.status == 200) {
                console.log(resp);
                showToast('La tarjeta se asigno a la cuenta correctamente', 'success', 'top-center');
                setAsingTdd(true);
                setTdd(true);
                setnoTdd(resp.data);
            } else if (resp.status == 500) {
                showToast('No es posible dar de alta una tarjeta de debito. Comuniquese a atencion a empleados', 'error', 'top-center');
                setAsingTdd(false);
                setTdd(false);        
            } else {
                showToast(resp.message, 'error', 'top-center');
                setAsingTdd(false);
                setTdd(false);
            }
        }
    

    const handleSubmit = (values) => {
        window.location.reload();
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
                ALTA CUENTA
            </Typography>
            <Box p={1} mt={5}>
                {show ?
                    <Box sx={{
                        display: 'flex',
                        alignContent: 'center',
                        verticalAlign: 'center'
                    }}>
                        <CircularProgress />
                        <Typography mt={1} ml={2} fontSize={"20px"}>ESPERA MIENTRAS ACTIVAMOS LA CUENTA DEL CLIENTE...</Typography>
                    </Box>
                    :
                    <Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography fontSize={"15px"}><strong>No. Cuenta:</strong></Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontSize={"15px"}>{cuenta?.idCuenta}</Typography>
                                            </TableCell>
                                        </TableRow>
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
                                                            <Button onClick={handleTdd}>Asignar</Button>
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
                                        <TableRow>
                                            <TableCell>
                                                <Typography fontSize={"15px"}><strong>Cuenta:</strong></Typography>
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
                                SIGUIENTE
                            </Button>
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default AltaCuenta