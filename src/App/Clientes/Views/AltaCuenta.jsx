import { Box, Button, CircularProgress, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useToast from '../../../Hooks/useToast';
import { useSelector } from 'react-redux';


const AltaCuenta = () => {

    const [show, setShow] = useState(true);
    const [tdd, setTdd] = useState(false);
    const [asingTdd, setAsingTdd] = useState(false);
    const [showCircular, setshowCircular] = useState(false);
    const { showToast } = useToast();
    const { personalData } = useSelector(state => state.prospectos)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            showToast('La cuenta ha sido activada exitosamente!!!', 'success', 'top-center');
        }, 10000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleTdd = () => {
        setAsingTdd(true);
        setshowCircular(true);
        const timer = setTimeout(() => {
            setAsingTdd(true);
            setshowCircular(false);
            setTdd(true);
            showToast('La tarjeta de debito terminacion 3128 se asigno a la cuenta correctamente.', 'success', 'top-center');
        }, 10000);
        return () => {
            clearTimeout(timer);
        };
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
            <Typography fontSize={"10px"}>
                ID De Evaluacion: 29921
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
                                                <Typography fontSize={"15px"}>834484940</Typography>
                                            </TableCell>
                                        </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontSize={"15px"}><strong>Sucursal:</strong></Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontSize={"15px"}>CENTRO SAN MIGUEL EL ALTO</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontSize={"15px"}><strong>Banquero Personal:</strong></Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontSize={"15px"}>MARITZA GALLARDO VELEZ</Typography>
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
                                                            <Typography>*** - **** - ***1 - 3128</Typography>
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
                                                <Typography fontSize={"15px"}>N4 - CUENTA ALAMEDA</Typography>
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