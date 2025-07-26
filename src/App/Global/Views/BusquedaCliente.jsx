import { Box, Button, Divider, Grid2, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import SingleSelect from '../Components/MultipleSelect';
import { criteriosBusqueda } from '../../../Data/SucursalesData';
import { Formik } from 'formik';
import { useLoading } from '../../../Hooks/LoadingContext';
import ResultadosBusquedaModal from '../../Clientes/Components/ResultadosBusquedaModal';
import { RetomarSolicitudModal } from '../Components/RetomarSolicitudModal';
import { CertificacionContactoModal } from '../../Clientes/Components/CertificacionContactoModal';
import { useDispatch } from 'react-redux';
import { startObtenerBpCliente, startObtenerClienteInfo } from '../../../Store/Clientes/Thunks';
import useToast from '../../../Hooks/useToast';
import ActualizarMediosDeContactoView from '../../Clientes/Views/ActualizarMediosDeContactoView';

const BusquedaCliente = ({ onNext, handleStep }) => {

    const { isLoading, startLoading, stopLoading } = useLoading();
    const [open, setOpen] = useState(false);
    const [retomarSolicitud, setretomarSolicitud] = useState(false)
    const [certificarContacto, setcertificarContacto] = useState(false);
    const [nombreCliente, setnombreCliente] = useState('');
    const [idClienteUnico, setidClienteUnico] = useState('');
    const [globalValues, setglobalValues] = useState();
    const dispatch = useDispatch();
    const { showToast } = useToast();

    const initialValues = {
        criterioBusqueda: '',
        busqueda: ''
    };

    const validationSchema = Yup.object({
        criterioBusqueda: Yup.string().required('Requerido'),
        busqueda: Yup.string().required('Requerido'),
    });

    const handleSubmit = async (values) => {
        const check = await checkCertificacionTelefono(values)
        if (!check) {
            setcertificarContacto(true);
            setglobalValues(values);
            return
        } else {
            await busquedaCliente(values);
        }
    };

    const busquedaCliente = async (values) => {
        startLoading();
        const resp = await dispatch(startObtenerClienteInfo(
            values.criterioBusqueda == 'ID Cliente Unico' ? 'ID_CLIENTE_UNICO' : 'CURP',
            values.busqueda,
            'PERSONAL_DATA'
        ));
        if (resp.status == 200 || resp.status == 'OK') {
            await dispatch(startObtenerBpCliente(
                values.criterioBusqueda == 'ID Cliente Unico' ? 'ID_CLIENTE_UNICO' : 'CURP',
                values.busqueda,
                'BP'
            ));
            setOpen(true);
        } else {
            showToast(resp.message, 'error', 'top-center');
        }
        stopLoading();
    }

    const handleClose = () => {
        setOpen(false);
        onNext();
    };

    const handleCloseRetomar = () => {
        setretomarSolicitud(false);
    }

    const handleCloseCertificar = () => {
        setcertificarContacto(false);
    }

    const handleContinue = () => {
        onNext();
    }

    const checkCertificacionTelefono = async (values) => {
        const resp = await dispatch(startObtenerClienteInfo(
            values.criterioBusqueda == 'ID Cliente Unico' ? 'ID_CLIENTE_UNICO' : 'CURP',
            values.busqueda,
            'CONTACTO'
        ));
        if (resp?.status == 'OK' || resp?.status == 200) {
            if (resp?.data?.noTelefono == null) {
                setidClienteUnico(resp?.data?.idClienteUnico);
                return false;
            }
        } else {
            showToast('No se encontro un cliente con la referencia ingresada', 'error', 'top-center');
            return true;
        }
        return true;
    }

    const handleContinueVerify = async (verify) => {
        if (verify) { 
            showToast('Se han acutilizado los medios de contacto del cliente.', 'sucess', 'top-center');
            await busquedaCliente(globalValues)
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
            <ActualizarMediosDeContactoView open={certificarContacto} handleClose={handleCloseCertificar} handleContinueVerify={(verify) => handleContinueVerify(verify)} idClienteUnico={idClienteUnico} />
            <RetomarSolicitudModal open={retomarSolicitud} handleClose={handleCloseRetomar} handleStepOne={handleStep} />
            <ResultadosBusquedaModal open={open} handleClose={handleClose} handleContinue={() => handleContinue} />
            <Typography variant="h5" gutterBottom>
                BUSQUEDA DE CLIENTE
            </Typography>
            <Box flex={1} my={4}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        touched,
                        errors,
                        isValid,
                        dirty,
                        setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid2 size={6}>
                                    <SingleSelect
                                        value={values.criterioBusqueda}
                                        onChange={(value) => setFieldValue('criterioBusqueda', value)}
                                        values={criteriosBusqueda}
                                        placeholder={'Criterio de Búsqueda'}
                                    />
                                    {touched.criterioBusqueda && errors.criterioBusqueda && (
                                        <Typography color="error">{errors.criterioBusqueda}</Typography>
                                    )}
                                    {values.criterioBusqueda == 'CURP' ?
                                        <Box display={'flex'} justifyContent={'flex-end'}>
                                            <Button onClick={() => window.open('https://www.sinube.mx/calcula-tu-rfc-y-curp', '_blank')} >Consultar CURP</Button>
                                        </Box>
                                        : null
                                    }
                                </Grid2>
                            </Grid2>
                            {values.criterioBusqueda != '' ?
                                <Grid2 size={6} mt={2}>
                                    <TextField
                                        label={values.criterioBusqueda}
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={values.busqueda}
                                        name="busqueda"
                                        inputProps={{
                                            maxLength: values.criterioBusqueda == 'CURP' ? 18 : 9,
                                            onInput: (e) => {
                                                e.target.value = e.target.value.toUpperCase();
                                            },
                                        }}
                                        fullWidth
                                    />
                                    {touched.busqueda && errors.busqueda && (
                                        <Typography color="error">{errors.busqueda}</Typography>
                                    )}
                                </Grid2>
                                : null
                            }
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    disabled={!isValid || !dirty}
                                    variant="contained"
                                    type="submit"
                                >
                                    Consultar
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default BusquedaCliente;
