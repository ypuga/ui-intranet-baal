import {
    Box,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Paper,
    Grid
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import BackspaceIcon from '@mui/icons-material/Backspace'
import AppLayout from '../../Layout/AppLayout'
import RowRadioButtonsGroup from '../Components/RowRadioButtonsGroup'
import { useLoading } from '../../../Hooks/LoadingContext'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startObtenerClienteInfo } from '../../../Store/Clientes/Thunks'
import useToast from '../../../Hooks/useToast'
import CardGeneralComponent from '../Components/CardGeneralComponent'
import CardPersonalDataComponent from '../Components/CardPersonalDataComponent'
import CardContactoComponent from '../Components/CardContactoComponent'
import CardBanqueroPersonalComponente from '../Components/CardBanqueroPersonalComponente'

const ClientesPage = () => {
    const [criterio, setCriterio] = useState('')
    const [referencia, setReferencia] = useState('')
    const [showInput, setShowInput] = useState(false)
    const [showClient, setShowClient] = useState(false)
    const [disabledInput, setDisabledInput] = useState(false)

    const [generalInfo, setGeneralInfo] = useState(null)
    const [datosContacto, setdatosContacto] = useState(null)
    const [personalData, setpersonalData] = useState(null)
    const [bpData, setbpData] = useState(null)

    const dispatch = useDispatch()
    const { startLoading, stopLoading } = useLoading()
    const { showToast } = useToast()

    const handleCriterioChange = (value) => {
        setCriterio(value)
        setReferencia('')
        setShowInput(true)
        setShowClient(false)
    }

    const resetSearch = () => {
        setDisabledInput(false)
        setShowClient(false)
        setReferencia('')
    }

    const searchClient = async () => {
        try {
            startLoading()

            const respGeneral = await dispatch(
                startObtenerClienteInfo(criterio, referencia, 'GENERAL')
            )

            if (respGeneral?.status !== 200 && respGeneral?.status !== 'OK') {
                showToast('Cliente no encontrado', 'warning', 'top-center')
                return
            }

            setGeneralInfo(respGeneral?.data)
            setShowClient(true)
            setDisabledInput(true)

            const [respDP, respContacto, respBp] = await Promise.all([
                dispatch(startObtenerClienteInfo(criterio, referencia, 'PERSONAL_DATA')),
                dispatch(startObtenerClienteInfo(criterio, referencia, 'CONTACTO')),
                dispatch(startObtenerClienteInfo(criterio, referencia, 'BP'))
            ])

            if (respDP?.status === 200 || respDP?.status === 'OK') {
                setpersonalData(respDP?.data)
            }

            if (respContacto?.status === 200 || respContacto?.status === 'OK') {
                setdatosContacto(respContacto?.data)
            }

            if (respBp?.status === 200 || respBp?.status === 'OK') {
                setbpData(respBp?.data)
            }

        } catch (err) {
            showToast('Error inesperado al buscar cliente', 'error', 'top-center')
        } finally {
            stopLoading()
        }
    }

    const labels = {
        NOMBRE: 'Nombre del Cliente',
        CURP: 'CURP',
        RFC: 'RFC',
        TELEFONO: 'Teléfono',
        ID_CLIENTE_UNICO: 'ID Cliente Único',
    }

    return (
        <AppLayout>
            <Box
                sx={{
                    maxWidth: 1200,
                    mx: 'auto',
                    px: 3,
                    py: 4,
                    backgroundColor: '#f7f9fc',
                    minHeight: '100vh'
                }}
            >
                {/* HEADER */}
                <Typography variant="h4" fontWeight={700} mb={4}>
                    Buscador de Clientes
                </Typography>

                {/* BUSCADOR CARD */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        mb: 5,
                        backgroundColor: '#fff'
                    }}
                >
                    <Typography variant="h6" mb={2} fontWeight={600}>
                        Criterio de búsqueda
                    </Typography>

                    <RowRadioButtonsGroup handleCriterioChange={handleCriterioChange} />

                    {showInput && (
                        <Box mt={3} maxWidth={400}>
                            <TextField
                                label={labels[criterio] || 'Referencia'}
                                fullWidth
                                disabled={disabledInput}
                                value={referencia}
                                onChange={(e) =>
                                    setReferencia(e.target.value.toUpperCase())
                                }
                                size="medium"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {!disabledInput ? (
                                                <IconButton onClick={searchClient}>
                                                    <SearchIcon />
                                                </IconButton>
                                            ) : (
                                                <IconButton onClick={resetSearch}>
                                                    <BackspaceIcon />
                                                </IconButton>
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    )}
                </Paper>

                {/* RESULTADOS */}
                {showClient && (
                    <Grid container spacing={4}>
                        {/* GENERAL + CONTACTO */}
                        <Grid item xs={12} md={6}>
                            <CardGeneralComponent data={generalInfo} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <CardContactoComponent data={datosContacto} />
                        </Grid>

                        {/* DATOS PERSONALES */}
                        <Grid item xs={12}>
                            <CardPersonalDataComponent data={personalData} />
                        </Grid>

                        {/* BANQUERO */}
                        <Grid item xs={12}>
                            <CardBanqueroPersonalComponente data={bpData} />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </AppLayout>
    )
}

export default ClientesPage