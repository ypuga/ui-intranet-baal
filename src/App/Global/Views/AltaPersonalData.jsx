import { Box, Button, Grid2, TextField, Typography } from '@mui/material'
import { generos } from '../../../Data/SucursalesData';
import { estadosMexico } from '../../../Data/SucursalesData';
import { productos } from '../../../Data/SucursalesData';
import React, { useState } from 'react'
import { useLoading } from '../../../Hooks/LoadingContext';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import CuentaModal from '../Components/CuentaModal';
import useToast from '../../../Hooks/useToast';
import { useDispatch } from 'react-redux';
import { startGetCurpInfo } from '../../../Store/Datos/Thunks';
import { startCreateNewSolicitud, startNextStep, startSaveProspectoPersonalData } from '../../../Store/Prospectos/Thunks';
import SingleSelect from '../Components/MultipleSelect';

const AltaPersonalData = ({ onNext }) => {
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [open, setOpen] = useState(false);
    const [isCurpValidate, setisCurpValidate] = useState(false);
    const [personalInfoCurp, setpersonalInfoCurp] = useState({});
    const [solicitudExistente, setsolicitudExistente] = useState();

    const { showToast } = useToast();
    const dispatch = useDispatch();

    const initialValues = {
        curp: '',
        primerNombre: '',
        segundoNombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        genero: '',
        estadoNacimiento: '',
        producto: '',
        rfc: '',
    };

    const handleSubmit = async (values) => {
        await dispatch(startCreateNewSolicitud(values.producto));
        const resp = await dispatch(startSaveProspectoPersonalData(values));
        if (resp.status == 200) {
            onNext();
        } else {
            showToast(resp.message, 'error', 'top-center')
            setsolicitudExistente(resp.data.response);
            handleCurp(resp)
        }
    };

    const validationSchema = Yup.object({
        curp: Yup.string().required('Requerido'),
        primerNombre: Yup.string().required('Requerido'),
        apellidoPaterno: Yup.string().required('Requerido'),
        fechaNacimiento: Yup.date().required('Requerido'),
        rfc: Yup.string().required('Requerido'),
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleCurp = (resp) => {
        //setOpen(true)
        setisCurpValidate(true);
        getCurpInfo();
    };

    const getCurpInfo = async (setValues) => {
        startLoading();
        try {
            const resp = await dispatch(startGetCurpInfo('PUJY990424HJCGMR00'));
            setpersonalInfoCurp(resp);
    
            if (resp?.isValid) {
                setValues((prev) => ({
                    ...prev,
                    primerNombre: resp.primerNombre || '',
                    segundoNombre: resp.segundoNombre || '',
                    apellidoPaterno: resp.apellidoPaterno || '',
                    apellidoMaterno: resp.apellidoMaterno || '',
                    estadoNacimiento: resp.estadoNacimiento || '',
                    fechaNacimiento: resp.fechaNacimiento || '',
                    genero: resp.genero || '',
                }));
            }
        } catch (error) {
            console.warn(error);
        } finally {
            stopLoading();
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
            <CuentaModal open={open} handleClose={handleClose} setisCurpValidate={setisCurpValidate} solicitudExistente={solicitudExistente} />
            <Typography variant="h5" gutterBottom>
                INFORMACION PERSONAL DEL CLIENTE
            </Typography>
            {isCurpValidate ?
                <Typography fontSize={"10px"}>
                    ID De Evaluacion: 
                </Typography>
                : null
            }
            <Box flex={1} my={4}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleSubmit, isValid, dirty, setValues }) => (
                        <>
                            <form onSubmit={handleSubmit}>
                                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid2 size={6}>
                                        <TextField
                                            label="CURP"
                                            variant="outlined"
                                            name="curp"
                                            value={values.curp}
                                            onChange={handleChange}
                                            inputProps={{
                                                maxLength: '18',
                                                onInput: (e) => {
                                                    e.target.value = e.target.value.toUpperCase();
                                                },
                                            }}
                                            disabled={isCurpValidate}
                                            fullWidth
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <SingleSelect
                                            placeholder="Producto"
                                            value={values.producto}
                                            name="producto"
                                            values={productos}
                                            disabled={isCurpValidate}
                                            onChange={handleChange('producto')}
                                        />
                                    </Grid2>
                                </Grid2>
                                <Box width="100%" display="flex" justifyContent="flex-end" alignItems="flex-end">
                                    {(values.curp.length > 6) ?
                                        <Button disabled={isCurpValidate} onClick={() => {
                                            setisCurpValidate(true);
                                            getCurpInfo(setValues);
                                        }}>Continuar</Button>
                                        :
                                        <Button onClick={() => window.open('https://www.sinube.mx/calcula-tu-rfc-y-curp', '_blank')} >Consultar CURP</Button>
                                    }
                                </Box>
                                {isCurpValidate && (
                                    <Box>
                                        <Grid2 container rowSpacing={1} mt={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid2 size={6}>
                                                <TextField
                                                    label="Primer Nombre"
                                                    variant="outlined"
                                                    name="primerNombre"
                                                    value={values.primerNombre}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        onInput: (e) => {
                                                            e.target.value = e.target.value.toUpperCase();
                                                        },
                                                    }}
                                                    fullWidth
                                                    disabled={personalInfoCurp.primerNombre != '' ? true : false}
                                                />
                                            </Grid2>
                                            <Grid2 size={6}>
                                                <TextField
                                                    label="Segundo Nombre"
                                                    variant="outlined"
                                                    name="segundoNombre"
                                                    value={values.segundoNombre}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        onInput: (e) => {
                                                            e.target.value = e.target.value.toUpperCase();
                                                        },
                                                    }}
                                                    fullWidth
                                                    disabled={personalInfoCurp.segundoNombre != '' ? true : false}
                                                />
                                            </Grid2>
                                        </Grid2>
                                        <Grid2 container rowSpacing={1} mt={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid2 size={6}>
                                                <TextField
                                                    label="Apellido Paterno"
                                                    variant="outlined"
                                                    name="apellidoPaterno"
                                                    value={values.apellidoPaterno}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        onInput: (e) => {
                                                            e.target.value = e.target.value.toUpperCase();
                                                        },
                                                    }}
                                                    fullWidth
                                                    disabled={personalInfoCurp.apellidoPaterno != '' ? true : false}
                                                />
                                            </Grid2>
                                            <Grid2 size={6}>
                                                <TextField
                                                    label="Apellido Materno"
                                                    variant="outlined"
                                                    name="apellidoMaterno"
                                                    value={values.apellidoMaterno}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        onInput: (e) => {
                                                            e.target.value = e.target.value.toUpperCase();
                                                        },
                                                    }}
                                                    fullWidth
                                                    disabled={personalInfoCurp.apellidoMaterno != '' ? true : false}
                                                />
                                            </Grid2>
                                        </Grid2>
                                        <Grid2 container rowSpacing={1} mt={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid2 size={6}>
                                                <TextField
                                                    label="Fecha de Nacimiento"
                                                    variant="outlined"
                                                    type="date"
                                                    name="fechaNacimiento"
                                                    value={values.fechaNacimiento}
                                                    onChange={handleChange}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    fullWidth
                                                    disabled={personalInfoCurp.fechaNacimiento != '' ? true : false}
                                                />
                                            </Grid2>
                                            <Grid2 size={6}>
                                                <SingleSelect disabled value={personalInfoCurp.isValid ? values.genero : ''} values={generos} placeholder="Genero" onChange={handleChange('genero')} />
                                            </Grid2>
                                        </Grid2>
                                        <Grid2 container rowSpacing={1} mt={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid2 size={6}>
                                                <SingleSelect disabled value={personalInfoCurp.isValid ? values.estadoNacimiento : ''} values={estadosMexico} placeholder="Estado de Nacimiento" />
                                            </Grid2>
                                            <Grid2 size={6}>
                                                <TextField
                                                    label="RFC"
                                                    variant="outlined"
                                                    name="rfc"
                                                    value={values.rfc}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        maxLength: "13",
                                                        onInput: (e) => {
                                                            e.target.value = e.target.value.toUpperCase();
                                                        },
                                                    }}
                                                    fullWidth
                                                    disabled={personalInfoCurp.rfc != '' ? true : false}
                                                />
                                                <Box display={"flex"} justifyContent={"flex-end"} alignContent={"end"}>
                                                    <Button onClick={() => window.open('https://www.sinube.mx/calcula-tu-rfc-y-curp', '_blank')} >Consultar RFC</Button>
                                                </Box>
                                            </Grid2>
                                        </Grid2>
                                    </Box>
                                )}
                                {isCurpValidate ?
                                    <Box display="flex" justifyContent="flex-end" gap={2}>
                                        <Button type="submit" disabled={!isValid} variant="contained" size="large" onClick={handleSubmit}>
                                            Siguiente
                                        </Button>
                                    </Box>
                                    : null}
                            </form>
                        </>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default AltaPersonalData
