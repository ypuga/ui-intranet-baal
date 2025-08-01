import { Box, Button, Divider, Grid2, TextField, Typography } from '@mui/material'
import { ErrorMessage, Formik } from 'formik';
import MultipleSelect from '../Components/MultipleSelect';
import * as Yup from 'yup';
import React, { useState } from 'react'
import { parentezco } from '../../../Data/SucursalesData';
import mapBeneficiaries from '../../../Utils/BeneficiariesUtil';
import { useDispatch, useSelector } from 'react-redux';
import useToast from '../../../Hooks/useToast';
import { startAltaBeneficiarios } from '../../../Store/Prospectos/Thunks';
import { Person } from '@mui/icons-material';
import BeneficiariosClienteModal from '../../Clientes/Components/BeneficiariosClienteModal';
import { startObtenerBeneficiariosCliente } from '../../../Store/Clientes/Thunks';

const AltaBeneficiarios = ({ onNext, onBack }) => {

    const [segundo, setsegundo] = useState(false);
    const [tercero, settercero] = useState(false);
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const { solicitud } = useSelector(state => state.prospectos);
    const { cliente } = useSelector(state => state.clientes);
    const [open, setOpen] = useState(false);

    const initialValues = {
        beneficiarioNombresUno: '',
        beneficiarioApellidoPaternoUno: '',
        beneficiarioApellidoMaternoUno: '',
        beneficiarioParentezcoUno: '',
        beneficiarioApellidoPaternoDos: '',
        beneficiarioApellidoMaternoDos: '',
        beneficiarioParentezcoDos: '',
        beneficiarioNombresTres: '',
        beneficiarioApellidoPaternoTres: '',
        beneficiarioApellidoMaternoTres: '',
        beneficiarioParentezcoTres: '',
    };

    const validationSchema = Yup.object({
        beneficiarioNombresUno: Yup.string().required('Requerido'),
        beneficiarioApellidoPaternoUno: Yup.string().required('Requerido'),
        beneficiarioApellidoMaternoUno: Yup.string().required('Requerido'),
        beneficiarioParentezcoUno: Yup.string().required('Requerido'),
    });

    const handleSubmit = async (values) => {
        const resp = await dispatch(startAltaBeneficiarios(mapBeneficiaries(values)));
        if (resp.status == 'OK' || resp.status == 200) {
            onNext();
        } else {
            showToast(resp.message, 'error', 'top-center');
        }
    };

    const handleSubmitPrecondition = async (values) => {
        const resp = await dispatch(startAltaBeneficiarios(values));
        if (resp.status == 'OK' || resp.status == 200) {
            onNext();
        } else {
            showToast(resp.message, 'error', 'top-center');
        }
    };

    const handleContinue = async (beneficiarios) => {
        setOpen(false);
        await handleSubmitPrecondition(beneficiarios);
    }

    const handleOpen = async () => {
        const resp = await dispatch(startObtenerBeneficiariosCliente(cliente?.idClienteUnico));
        if (resp?.status == 200 || resp?.status == 'OK') {
            setOpen(true);
        } else {
            showToast(resp?.message, 'error', 'top-center');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Box
            p={4}
            height="100%"
            display="flex"
            flexDirection="column"
            sx={{ '& .MuiTextField-root': { m: 1 } }}
        >
            <BeneficiariosClienteModal
                open={open}
                handleOpen={handleOpen}
                handleContinue={(beneficiarios) => handleContinue(beneficiarios)}
                handleClose={handleClose}
            />
            <Typography variant="h5" gutterBottom>
                BENEFICIARIOS
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
                            <Box>
                                {cliente?.idClienteUnico ?
                                    <Box>
                                        <Button
                                            color='inherit'
                                            startIcon={<Person />}
                                            variant='outlined'
                                            onClick={handleOpen}
                                        >
                                            Beneficiarios del Cliente
                                        </Button>
                                    </Box>
                                    : null}
                                <Divider>PRIMER BENEFICIARIO</Divider>
                                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid2 size={6}>
                                        <TextField
                                            label="Nombres"
                                            variant="outlined"
                                            name="beneficiarioNombresUno"
                                            value={values.beneficiarioNombresUno}
                                            onChange={handleChange}
                                            inputProps={{
                                                onInput: (e) => {
                                                    e.target.value = e.target.value.toUpperCase();
                                                },
                                            }}
                                            fullWidth
                                        />
                                        <ErrorMessage name="beneficiarioNombresUno" component="div" style={{ color: 'red', fontSize: '12px' }} />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            label="Apellido Paterno"
                                            variant="outlined"
                                            name="beneficiarioApellidoPaternoUno"
                                            value={values.beneficiarioApellidoPaternoUno}
                                            onChange={handleChange}
                                            inputProps={{
                                                onInput: (e) => {
                                                    e.target.value = e.target.value.toUpperCase();
                                                },
                                            }}
                                            fullWidth
                                        />
                                        <ErrorMessage name="beneficiarioApellidoPaternoUno" component="div" style={{ color: 'red', fontSize: '12px' }} />
                                    </Grid2>
                                </Grid2>
                                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid2 size={6}>
                                        <TextField
                                            label="Apellido Materno"
                                            variant="outlined"
                                            name="beneficiarioApellidoMaternoUno"
                                            value={values.beneficiarioApellidoMaternoUno}
                                            onChange={handleChange}
                                            inputProps={{
                                                onInput: (e) => {
                                                    e.target.value = e.target.value.toUpperCase();
                                                },
                                            }}
                                            fullWidth
                                        />
                                        <ErrorMessage name="beneficiarioApellidoMaternoUno" component="div" style={{ color: 'red', fontSize: '12px' }} />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <MultipleSelect
                                            values={parentezco}
                                            placeholder='Parentezco'
                                            onChange={handleChange('beneficiarioParentezcoUno')}
                                        />
                                        <ErrorMessage name="beneficiarioFechaNacimientoUno" component="div" style={{ color: 'red', fontSize: '12px' }} />
                                    </Grid2>
                                </Grid2>
                                <Box display={"flex"} alignContent={"flex-end"} justifyContent={"end"}>
                                    {(!segundo) ?
                                        <Button onClick={() => setsegundo(true)}>Agregar segundo beneficiario</Button>
                                        :
                                        <Button color='error' onClick={() => setsegundo(false)}>Eliminar segundo beneficiario</Button>
                                    }
                                </Box>
                            </Box>
                            {(segundo) ?
                                <Box>
                                    <Divider>SEGUNDO BENEFICIARIO</Divider>
                                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Nombres"
                                                variant="outlined"
                                                name="beneficiarioNombresDos"
                                                value={values.beneficiarioNombresDos}
                                                onChange={handleChange}
                                                inputProps={{
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />

                                        </Grid2>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Apellido Paterno"
                                                variant="outlined"
                                                name="beneficiarioApellidoPaternoDos"
                                                value={values.beneficiarioApellidoPaternoDos}
                                                onChange={handleChange}
                                                inputProps={{
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />

                                        </Grid2>
                                    </Grid2>
                                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Apellido Materno"
                                                variant="outlined"
                                                name="beneficiarioApellidoMaternoDos"
                                                value={values.beneficiarioApellidoMaternoDos}
                                                onChange={handleChange}
                                                inputProps={{
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />

                                        </Grid2>
                                        <Grid2 size={6}>
                                            <MultipleSelect
                                                values={parentezco}
                                                placeholder='Parentezco'
                                                onChange={handleChange('beneficiarioParentezcoDos')}
                                            />

                                        </Grid2>
                                    </Grid2>
                                    <Box display={"flex"} alignContent={"flex-end"} justifyContent={"end"}>
                                        {(!tercero) ?
                                            <Button onClick={() => settercero(true)}>Agregar tercer beneficiario</Button>
                                            :
                                            <Button color='error' onClick={() => settercero(false)}>Eliminar tercer beneficiario</Button>
                                        }
                                    </Box>
                                </Box>
                                : null}
                            {(tercero) ?
                                <Box>
                                    <Divider>TERCER BENEFICIARIO</Divider>
                                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Nombres"
                                                variant="outlined"
                                                name="beneficiarioNombresTres"
                                                value={values.beneficiarioNombresTres}
                                                onChange={handleChange}
                                                inputProps={{
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />

                                        </Grid2>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Apellido Paterno"
                                                variant="outlined"
                                                name="beneficiarioApellidoPaternoTres"
                                                value={values.beneficiarioApellidoPaternoTres}
                                                onChange={handleChange}
                                                inputProps={{
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />

                                        </Grid2>
                                    </Grid2>
                                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Apellido Materno"
                                                variant="outlined"
                                                name="beneficiarioApellidoMaternoTres"
                                                value={values.beneficiarioApellidoMaternoTres}
                                                onChange={handleChange}
                                                inputProps={{
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                fullWidth
                                            />
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <MultipleSelect
                                                values={parentezco}
                                                placeholder='Parentezco'
                                                onChange={handleChange('beneficiarioParentezcoTres')}
                                            />
                                        </Grid2>
                                    </Grid2>
                                </Box>
                                : null}
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

export default AltaBeneficiarios
