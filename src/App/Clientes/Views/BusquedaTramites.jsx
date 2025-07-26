import { Alert, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startObtenerSolicitud, startPutSolicitud } from '../../../Store/Prospectos/Thunks';
import useToast from '../../../Hooks/useToast';
import { startPutCliente } from '../../../Store/Clientes/Thunks';
import { useLoading } from '../../../Hooks/LoadingContext';

const BusquedaTramites = ({ onNext, product }) => {
    const [idSolicitud, setIdSolicitud] = useState('');
    const [evaluacion, setEvaluacion] = useState({});
    const [canContinuar, setcanContinuar] = useState(false);
    const { showToast } = useToast();
    const { isLoading, startLoading, stopLoading } = useLoading();

    const dispatch = useDispatch();

    const obtenerSolicitud = async () => {
        startLoading()
        const resp = await dispatch(startObtenerSolicitud(idSolicitud));
        if (resp.status === 'OK' || resp.status === 200) {
            console.log(resp);
            setEvaluacion(resp.data);
            stopLoading();
            if (product.includes(resp?.data?.idProduct)) {
                setcanContinuar(true);
            }
        } else {
            showToast(resp.message, 'error', 'top-center');
            setIdSolicitud('');
            stopLoading();
        }
    };

    const handleFinish = () => {
        dispatch(startPutSolicitud(evaluacion));
        dispatch(startPutCliente(evaluacion?.idClienteUnico))
        onNext();
    }

    return (
        <Box p={4} sx={{ width: '100%' }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
                Búsqueda de Trámites
            </Typography>

            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                gap={2}
                mb={3}
            >
                <TextField
                    label="ID Trámite"
                    placeholder="Ingresa el ID del trámite"
                    fullWidth
                    sx={{ maxWidth: 400 }}
                    value={idSolicitud}
                    onChange={(e) => setIdSolicitud(e.target.value)}
                    size="small"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={obtenerSolicitud}
                    disabled={idSolicitud.length <= 5}
                    sx={{ height: 40 }}
                >
                    Consultar Trámite
                </Button>
            </Box>

            {Object.keys(evaluacion).length > 0 && (
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Resultado de la Solicitud
                    </Typography>
                    {!canContinuar ?
                    <Box>
                        <Alert severity="warning">No es posible dar de alta el producto desde este modulo</Alert>
                        <br/>
                    </Box>
                    : null}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Fecha evaluación:
                            </Typography>
                            <Typography>{evaluacion?.fechaSolicitud || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                ID Cliente Único:
                            </Typography>
                            <Typography>{evaluacion?.idClienteUnico || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Producto:
                            </Typography>
                            <Typography>{evaluacion?.nombreProducto || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Status de Solicitud:
                            </Typography>
                            <Typography>{evaluacion?.status || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {canContinuar ?
                                <Button
                                    disabled={(evaluacion?.isActive || evaluacion?.status != 'AUTORIZADO')}
                                    onClick={handleFinish}
                                >Finalizar Tramite</Button>
                                : null}
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Box>
    );
};

export default BusquedaTramites;
