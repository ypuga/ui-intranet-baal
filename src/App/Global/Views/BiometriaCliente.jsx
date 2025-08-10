import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import ActualizarMediosDeContactoView from '../../Clientes/Views/ActualizarMediosDeContactoView';
import { CertificacionContactoModal } from '../../Clientes/Components/CertificacionContactoModal';
import { startObtenerClienteInfo } from '../../../Store/Clientes/Thunks';
import { useDispatch } from 'react-redux';
import useToast from '../../../Hooks/useToast';
import { useSelector } from 'react-redux';

const BiometriaCliente = ({ onNext }) => {
    const [certificarContacto, setcertificarContacto] = useState(false);
    const [idClienteUnico, setidClienteUnico] = useState('');
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const {cliente} = useSelector(state=>state.clientes);

    const handleSubmit = async (values) => {
        const check = await checkCertificacionTelefono(values)
        if (!check) {
            setcertificarContacto(true);
            return
        } else {
            onNext();
        }
    };

    const handleCloseCertificar = () => {
        setcertificarContacto(false);
    }

    const handleContinueVerify = async (verify) => {
        if (verify) {
            showToast('Se han acutilizado los medios de contacto del cliente.', 'sucess', 'top-center');
            onNext();
        }
    }

    const checkCertificacionTelefono = async (values) => {
        const resp = await dispatch(startObtenerClienteInfo('ID_CLIENTE_UNICO',cliente?.idClienteUnico, 'CONTACTO'))
        if (resp?.status == 'OK' || resp?.status == 200) {
            if (resp?.data?.noTelefono == null) {
                setidClienteUnico(resp?.data?.idClienteUnico);
                return false;
            } else {
                return true;
            }
        } else {
            showToast('Error al intentar certificar medios de contacto', 'error', 'top-center');
            return true;
        }
        return true;
    }

    return (
        <Box
            p={4}
            height="100%"
            display="flex"
            flexDirection="column"
            sx={{ '& .MuiTextField-root': { m: 1 } }}
        >
            <ActualizarMediosDeContactoView 
                open={certificarContacto} 
                handleClose={handleCloseCertificar} 
                handleContinueVerify={(verify) => handleContinueVerify(verify)} 
                idClienteUnico={idClienteUnico} 
            />
            <Typography variant="h5" gutterBottom>
                BIOMETRIA DEL CLIENTE
            </Typography>
            <Box flex={1} my={4}>
                <Box sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <PanToolAltIcon sx={{
                        color: 'teal',
                        fontSize: '300px'
                    }} />
                    <Typography fontSize={"30px"}>CAPTURAR HUELLA DE DEDO INDICE DERECHO</Typography>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Continuar
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default BiometriaCliente
