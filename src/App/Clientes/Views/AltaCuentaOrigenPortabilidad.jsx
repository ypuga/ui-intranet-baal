import { Box, Button, Grid2, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLoading } from '../../../Hooks/LoadingContext';
import useToast from '../../../Hooks/useToast';
import SingleSelect from '../../Global/Components/MultipleSelect';
import { bancosMexicanos, tiposCuenta } from '../../../Data/TipoCuentaData';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { startObtenerClienteInfo } from '../../../Store/Clientes/Thunks';

const AltaCuentaOrigenPortabilidad = ({ onNext }) => {
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { solicitud } = useSelector(state => state.prospectos);
    const { cuentasCliente } = useSelector(state => state.clientes);
    const [curpCliente, setcurpCliente] = useState('');

    const dispatch = useDispatch();
    const { showToast } = useToast();

    useEffect(() => {
        getCurpCliente();
    }, [])

    const getCurpCliente = async () => {
        startLoading();
        const resp = await dispatch(startObtenerClienteInfo(
            'ID_CLIENTE_UNICO',
            cuentasCliente?.cuenta?.clienteUnico,
            'PERSONAL_DATA'
        ));
        if (resp?.status == 'OK' || resp?.status == 200) {
            setcurpCliente(resp?.data?.curp || '');
        } else {
            showToast(resp?.message, 'error', 'top-center');
        }
        stopLoading();
    };

    const initialValues = {
        curp: curpCliente,
        cuenta: cuentasCliente?.cuenta?.idCuenta,
        referencia: '',
        bancoOrigen: '',
        cuentaDestino: '',
    };

    const validationSchema = Yup.object({
        cuentaDestino: Yup.string().required('Requerido'),
        bancoOrigen: Yup.string().required('Requerido'),
        referencia: Yup.string().required('Requerido'),
    });

    const handleSubmit = async () => {
        onNext();
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ values, handleChange, handleSubmit, isValid, dirty, setValues }) => (
                <>
                    <form onSubmit={handleSubmit}>
                        <Box
                            p={4}
                            height="100%"
                            display="flex"
                            flexDirection="column"
                            sx={{ '& .MuiTextField-root': { m: 1 } }}
                        >
                            <Typography variant="h5" gutterBottom>
                                CUENTA ORIGEN
                            </Typography>
                            <Typography fontSize={"10px"}>
                                ID De Evaluacion: {solicitud.idSolicitud}
                            </Typography>
                            <Box flex={1} my={4}>
                                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid2 size={6}>
                                        <TextField
                                            label="CURP"
                                            variant="outlined"
                                            value={values.curp}
                                            name="curp"
                                            onChange={handleChange}
                                            disabled={true}
                                            fullWidth
                                            inputProps={{
                                                maxLength: "18",
                                                onInput: (e) => {
                                                    e.target.value = e.target.value.toUpperCase();
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            label="Cuenta destino"
                                            variant="outlined"
                                            value={values.cuenta}
                                            name="curp"
                                            onChange={handleChange}
                                            disabled={true}
                                            fullWidth
                                            inputProps={{
                                                maxLength: "18",
                                                onInput: (e) => {
                                                    e.target.value = e.target.value.toUpperCase();
                                                },
                                            }}
                                        />
                                    </Grid2>
                                </Grid2>
                                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid2 size={6}>
                                        <SingleSelect
                                            placeholder='Tipo de Cuenta'
                                            values={tiposCuenta}
                                            value={values.referencia}
                                            onChange={handleChange('referencia')}
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <SingleSelect
                                            placeholder='Banco Origen'
                                            values={bancosMexicanos}
                                            value={values.bancoOrigen}
                                            onChange={handleChange('bancoOrigen')}
                                        />
                                    </Grid2>
                                </Grid2>
                                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid2 size={6}>
                                        <TextField
                                            label={values.referencia}
                                            variant="outlined"
                                            value={values.cuentaDestino}
                                            name="cuentaDestino"
                                            onChange={handleChange}
                                            fullWidth
                                            inputProps={{
                                                onInput: (e) => {
                                                    e.target.value = e.target.value.toUpperCase();
                                                },
                                            }}
                                        />
                                    </Grid2>
                                </Grid2>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button type="submit" disabled={!dirty || !isValid} variant="contained" size="large" onClick={handleSubmit}>
                                Siguiente
                            </Button>
                        </Box>
                    </form>
                </>)}
        </Formik>
    )
}

export default AltaCuentaOrigenPortabilidad
