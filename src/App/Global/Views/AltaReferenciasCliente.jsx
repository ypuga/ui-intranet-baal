import React from 'react';
import { Box, TextField, Typography, Button, Grid2 } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { parentezco } from '../../../Data/SucursalesData';
import SingleSelect from '../Components/MultipleSelect';

const AltaReferenciasCliente = ({ onNext, onBack }) => {

    const initialValues = {
        referencias: [
            {
                referenciaNombres: '',
                referenciaPaterno: '',
                referenciaMaterno: '',
                referenciaParentezco: '',
                referenciaContacto: '',
            },
            {
                referenciaNombres: '',
                referenciaPaterno: '',
                referenciaMaterno: '',
                referenciaParentezco: '',
                referenciaContacto: '',
            },
        ],
    };

    const validationSchema = Yup.object({
        referencias: Yup.array().of(
            Yup.object().shape({
                referenciaNombres: Yup.string().required("Nombre es requerido"),
                referenciaPaterno: Yup.string().required("Apellido paterno es requerido"),
                referenciaMaterno: Yup.string().required("Apellido materno es requerido"),
                referenciaParentezco: Yup.string().required("Parentesco es requerido"),
                referenciaContacto: Yup.string()
                    .matches(/^\d+$/, "Solo se permiten números")
                    .required("Contacto es requerido"),
            })
        ),
    });

    const handleSubmit = (values) => {
        console.log(values);
        onNext();
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
                REFERENCIAS DEL CLIENTE
            </Typography>
            <Typography fontSize="10px">
                ID De Evaluacion: 29921
            </Typography>

            <Box flex={1} my={4}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, errors, touched, setFieldValue, isValid, dirty }) => (
                        <form onSubmit={handleSubmit}>
                            {values.referencias.map((_, index) => (
                                <Box key={index} mb={4}>
                                    <Typography variant="h6">Referencia {index + 1}</Typography>
                                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Nombres"
                                                name={`referencias[${index}].referenciaNombres`}
                                                value={values.referencias[index].referenciaNombres}
                                                onChange={handleChange}
                                                inputProps={{
                                                    maxLength: '30',
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                error={Boolean(touched.referencias?.[index]?.referenciaNombres && errors.referencias?.[index]?.referenciaNombres)}
                                                helperText={touched.referencias?.[index]?.referenciaNombres && errors.referencias?.[index]?.referenciaNombres}
                                                fullWidth
                                            />
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Apellido Paterno"
                                                name={`referencias[${index}].referenciaPaterno`}
                                                value={values.referencias[index].referenciaPaterno}
                                                onChange={handleChange}
                                                inputProps={{
                                                    maxLength: '30',
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                error={Boolean(touched.referencias?.[index]?.referenciaPaterno && errors.referencias?.[index]?.referenciaPaterno)}
                                                helperText={touched.referencias?.[index]?.referenciaPaterno && errors.referencias?.[index]?.referenciaPaterno}
                                                fullWidth
                                            />
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Apellido Materno"
                                                name={`referencias[${index}].referenciaMaterno`}
                                                value={values.referencias[index].referenciaMaterno}
                                                onChange={handleChange}
                                                inputProps={{
                                                    maxLength: '30',
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                error={Boolean(touched.referencias?.[index]?.referenciaMaterno && errors.referencias?.[index]?.referenciaMaterno)}
                                                helperText={touched.referencias?.[index]?.referenciaMaterno && errors.referencias?.[index]?.referenciaMaterno}
                                                fullWidth
                                            />
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <TextField
                                                label="Contacto"
                                                name={`referencias[${index}].referenciaContacto`}
                                                value={values.referencias[index].referenciaContacto}
                                                onChange={handleChange}
                                                inputProps={{
                                                    maxLength: '10',
                                                    onInput: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                }}
                                                error={Boolean(touched.referencias?.[index]?.referenciaContacto && errors.referencias?.[index]?.referenciaContacto)}
                                                helperText={touched.referencias?.[index]?.referenciaContacto && errors.referencias?.[index]?.referenciaContacto}
                                                fullWidth
                                            />
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid2 size={6}>
                                            <SingleSelect
                                                values={parentezco}
                                                placeholder="Parentezco"
                                                onChange={(value) => setFieldValue(`referencias[${index}].referenciaParentezco`, value)}
                                            />
                                            {touched.referencias?.[index]?.referenciaParentezco && errors.referencias?.[index]?.referenciaParentezco && (
                                                <Typography color="error" variant="caption">
                                                    {errors.referencias[index].referenciaParentezco}
                                                </Typography>
                                            )}
                                        </Grid2>
                                    </Grid2>
                                </Box>
                            ))}
                            <Box display="flex" justifyContent='space-between' mt={3}>
                                <Button onClick={onBack} size='large'>Regresar</Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="large"
                                    disabled={!dirty || !isValid}
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
    );
};

export default AltaReferenciasCliente;
