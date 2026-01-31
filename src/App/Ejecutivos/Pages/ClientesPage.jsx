import { Box, Divider, TextField, Typography, InputAdornment, IconButton, Grid2 } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
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
    const [showInput, setShowInput] = useState(false)
    const [criterio, setCriterio] = useState('')
    const [referencia, setReferencia] = useState('')
    const { startLoading, stopLoading } = useLoading()
    const [showClient, setShowClient] = useState(false)
    const [disabledInput, setDisabledInput] = useState(false)
    const [generalInfo, setGeneralInfo] = useState(null);
    const [datosContacto, setdatosContacto] = useState();
    const [personalData, setpersonalData] = useState();
    const [bpData, setbpData] = useState();
    const dispatch = useDispatch()
    const { showToast } = useToast()

    const handleCriterioChange = (value) => {
        setCriterio(value)
        setReferencia('')
        setShowInput(true)
    }

    const searchClient = async () => {
        try {
            startLoading();
            const respGeneral = await dispatch(startObtenerClienteInfo(criterio, referencia, 'GENERAL'))
            if (respGeneral?.status === 200 || respGeneral?.status === 'OK') {
                setShowClient(true);
                setDisabledInput(true);
                setGeneralInfo(respGeneral?.data);
                const respDP = await dispatch(startObtenerClienteInfo(criterio, referencia, 'PERSONAL_DATA'));
                if (respDP?.status == 200 || respDP?.status == 'OK') {
                    setpersonalData(respDP?.data);
                    const respContacto = await dispatch(startObtenerClienteInfo(criterio, referencia, 'CONTACTO'));
                    if (respContacto?.status == 'OK' || respContacto?.status == 200) {
                        setdatosContacto(respContacto?.data);
                        const respBp = await dispatch(startObtenerClienteInfo(criterio, referencia, 'BP')) 
                        if (respBp?.status) {
                            setbpData(respBp?.data);
                        } else {
                            showToast('Error al encontrar la informacion de banquero personal', 'warning', 'top-center');
                        }
                    } else {
                        showToast('Error al encontrar la informacion de contacto', 'warning', 'top-center');
                    }
                } else {
                    showToast('Error al encontrar la informacion personal del cliente', 'warning', 'top-center');
                }
            }
        } catch (err) {
            showToast('Error inesperado al buscar cliente', 'error', 'top-center')
        } finally {
            stopLoading();
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
            <Typography component="h1" sx={{ fontSize: 'xx-large' }}>
                Buscador de Clientes
            </Typography>

            <Divider />

            <Box>
                <RowRadioButtonsGroup handleCriterioChange={handleCriterioChange} />
            </Box>

            <Divider />

            {showInput && (
                <Box sx={{ width: '100%' }} mt={2}>
                    <TextField
                        label={labels[criterio] || 'Referencia'}
                        placeholder="Referencia"
                        fullWidth
                        disabled={disabledInput}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={searchClient} sx={{ marginRight: '-10px' }}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{
                            maxLength: criterio?.maxLength || 50,
                            style: { textTransform: 'uppercase' },
                        }}
                        sx={{ maxWidth: 400 }}
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value.toUpperCase())}
                        size="small"
                    />
                </Box>
            )}

            {showClient && generalInfo && (
                <Box mt={4}>
                    <Grid2 container spacing={2}>
                        <Grid2 xs={6} p={0} m={0}>
                            <CardGeneralComponent data={generalInfo} />
                        </Grid2>
                        <Grid2>
                            <CardContactoComponent data={datosContacto} />
                        </Grid2>
                    </Grid2>
                    <Grid2 container spacing={1} mt={2} sx={{ width: '100%' }}>
                        <Grid2 xs={12} p={0} m={0}>
                            <CardPersonalDataComponent data={personalData} />
                        </Grid2>
                    </Grid2>
                    <Grid2 container spacing={1} mt={2} sx={{ width: '100%' }}>
                        <Grid2 xs={12} p={0} m={0}>
                            <CardBanqueroPersonalComponente data={bpData} />
                        </Grid2>
                    </Grid2>
                </Box>
            )}
        </AppLayout>
    )
}

export default ClientesPage
