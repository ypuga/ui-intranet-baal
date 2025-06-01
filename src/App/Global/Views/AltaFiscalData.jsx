import { Alert, Box, Button, Divider, Grid2, TextField, Typography } from '@mui/material'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup';
import MultipleSelect from '../Components/MultipleSelect';
import React from 'react'
import { mismoDomicilioFiscal, regimenFiscal, ocupaciones, sectores } from '../../../Data/FiscalData';
import { estadosMexico } from '../../../Data/SucursalesData';
import DynamicRadioButtons from '../Components/RowRadioButtonsGroup';
import { useDispatch, useSelector } from 'react-redux';
import useToast from '../../../Hooks/useToast';
import { startSaveFiscalData } from '../../../Store/Prospectos/Thunks';
import { useLoading } from '../../../Hooks/LoadingContext';

const AltaFiscalData = ({ onNext, onBack }) => {
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const { solicitud } = useSelector(state => state.prospectos);
    const { isLoading, startLoading, stopLoading } = useLoading();

    const initialValues = {
        regimenFiscal: '',
        sectorEconomico: '',
        ocupacion: '',
        fiel: '',
        mismoDomicilioFiscal: 'Si',
        domicilioFiscalEstado: '',
        domicilioFiscalCp: '',
        domicilioFiscalCalle: '',
        domicilioFiscalNumeroExterior: '',
        numeroInterior: '',
        domicilioFiscalColonia: ''
    };

    const validationSchema = Yup.object({
        regimenFiscal: Yup.string().required('Requerido'),
        mismoDomicilioFiscal: Yup.string().required('Requerido'),
        sectorEconomico: Yup.string().required('Requerido'),
        ocupacion: Yup.string().required('Requerido'),
    });

    const handleSubmit = async (values) => {
        startLoading();
        const fiscalData = {
            ...values,
            mismoDomicilioFiscal: values.mismoDomicilioFiscal === 'Si'
        };

        const resp = await dispatch(startSaveFiscalData(fiscalData));
        if (resp?.status == 'OK' || resp?.status == 200) {
            onNext();
        } else {
            showToast(resp.message, 'error', 'top-center');
            stopLoading();
        }
        stopLoading();
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
                DATOS FISCALES
            </Typography>
            <Typography fontSize={"10px"}>
                ID De Evaluacion: {solicitud.idSolicitud}
            </Typography>
            <Box flex={1} my={4}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleSubmit, touched, errors, isValid, dirty }) => (
                        <form onSubmit={handleSubmit}>
                            {(values.mismoDomicilioFiscal == 'No') ?
                                <Alert variant="filled" sx={{ marginBottom: '20px' }} severity='info'>Se le solicitara al cliente su constancia de situacion fiscal.</Alert>
                                : null
                            }
                            <Grid2>
                                <MultipleSelect
                                    values={regimenFiscal}
                                    placeholder='Regimen Fiscal'
                                    onChange={handleChange('regimenFiscal')}
                                />
                                <ErrorMessage name="regimenFiscal" component="div" style={{ color: 'red', fontSize: '12px' }} />
                            </Grid2>
                            <Grid2>
                                <MultipleSelect
                                    values={ocupaciones}
                                    placeholder='¿A que te dedicas?'
                                    onChange={handleChange('ocupacion')}
                                />
                            </Grid2>
                            <Grid2>
                                <MultipleSelect
                                    values={sectores}
                                    placeholder='¿Sector economico?'
                                    onChange={handleChange('sectorEconomico')}
                                />
                            </Grid2>
                            <Grid2>
                                <TextField
                                    label="Si cuenta con una FIEL puede ingresarla aquí"
                                    variant="outlined"
                                    name="fiel"
                                    value={values.fiel}
                                    onChange={handleChange}
                                    inputProps={{
                                        onInput: (e) => {
                                            e.target.value = e.target.value.toUpperCase();
                                        },
                                    }}
                                    fullWidth
                                />
                            </Grid2>
                            <Grid2 marginLeft={"10px"}>
                                <DynamicRadioButtons
                                    options={mismoDomicilioFiscal}
                                    name="mismoDomicilioFiscal"
                                    onChange={handleChange('mismoDomicilioFiscal')}
                                    label='¿Su domicilio fiscal es el mismo que su domicilio actual?'
                                />
                                <ErrorMessage name="mismoDomicilioFiscal" component="div" style={{ color: 'red', fontSize: '12px' }} />
                            </Grid2>
                            {(values.mismoDomicilioFiscal == 'No') ?
                                <Box>
                                    <Divider sx={{ marginTop: '10px', marginBottom: '10px' }}>
                                        <Typography fontSize={"20px"}>Captura de domicilio fiscal</Typography>
                                    </Divider>
                                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid2 size={6}>
                                            <MultipleSelect
                                                values={estadosMexico}
                                                placeholder='Estado'
                                                onChange={handleChange('domicilioFiscalEstado')}
                                            />
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Codigo Postal"
                                                variant="outlined"
                                                name="domicilioFiscalCp"
                                                value={values.domicilioFiscalCp}
                                                onChange={handleChange}
                                                inputProps={{
                                                    maxLength: '5',
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />
                                            <ErrorMessage name="domicilioFiscalCp" component="div" style={{ color: 'red', fontSize: '12px' }} />
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Ciudad"
                                                variant="outlined"
                                                name="ciudad"
                                                value={values.ciudad}
                                                onChange={handleChange}
                                                inputProps={{
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />
                                            <ErrorMessage name="calle" component="div" style={{ color: 'red', fontSize: '12px' }} />
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Calle"
                                                variant="outlined"
                                                name="domicilioFiscalCalle"
                                                value={values.domicilioFiscalCalle}
                                                onChange={handleChange}
                                                inputProps={{
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />
                                            <ErrorMessage name="calle" component="div" style={{ color: 'red', fontSize: '12px' }} />
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 container spacing={2}>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Colonia"
                                                variant="outlined"
                                                name="domicilioFiscalColonia"
                                                value={values.domicilioFiscalColonia}
                                                onChange={handleChange}
                                                inputProps={{
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />
                                            <ErrorMessage
                                                name="colonia"
                                                component="div"
                                                style={{ color: 'red', fontSize: '12px' }}
                                            />
                                        </Grid2>
                                        <Grid2 size={3}>
                                            <TextField
                                                label="Número Exterior"
                                                variant="outlined"
                                                name="domicilioFiscalNumeroExterior"
                                                value={values.domicilioFiscalNumeroExterior}
                                                onChange={handleChange}
                                                inputProps={{
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />
                                            <ErrorMessage
                                                name="numeroExterior"
                                                component="div"
                                                style={{ color: 'red', fontSize: '12px' }}
                                            />
                                        </Grid2>
                                        <Grid2 size={3}>
                                            <TextField
                                                label="Número Interior"
                                                variant="outlined"
                                                name="numeroInterior"
                                                value={values.numeroInterior}
                                                onChange={handleChange}
                                                inputProps={{
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />
                                            <ErrorMessage
                                                name="numeroInterior"
                                                component="div"
                                                style={{ color: 'red', fontSize: '12px' }}
                                            />
                                        </Grid2>
                                    </Grid2>
                                </Box>
                                : null
                            }
                            <Box display="flex" justifyContent='space-between' mt={3}>
                                <Button onClick={onBack} size='large'>Regresar</Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="large"
                                    onClick={handleSubmit}
                                >
                                    SIGUIENTE
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default AltaFiscalData
