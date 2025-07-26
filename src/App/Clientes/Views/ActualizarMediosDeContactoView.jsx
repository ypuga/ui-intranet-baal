import * as React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Dialog,
    Slide,
    TextField,
    Button,
    Box,
    Snackbar,
    Alert,
    AlertTitle
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OTPInput from '../../Global/Components/OTPInput';
import { useDispatch } from 'react-redux';
import { startCertificarTelefonoCliente } from '../../../Store/Clientes/Thunks';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ActualizarMediosDeContactoView({ open, handleClose, handleContinueVerify, idClienteUnico }) {
    const [phone, setPhone] = React.useState('');
    const [confirmPhone, setConfirmPhone] = React.useState('');
    const [codeSent, setCodeSent] = React.useState(false);
    const [verificationCode, setVerificationCode] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [showError, setshowError] = React.useState(false);
    const [otp, setOtp] = React.useState('');
    const dispatch = useDispatch();

    const phoneValid = phone.match(/^\d{10}$/);
    const confirmPhoneValid = confirmPhone.match(/^\d{10}$/);
    const phonesMatch = phone === confirmPhone;

    const canSendCode = phoneValid && confirmPhoneValid && phonesMatch && !codeSent;

    const handleSendCode = () => {
        setCodeSent(true);
        setSnackbarOpen(true);
    };

    const handleVerify = async () => {
        const resp = await dispatch(startCertificarTelefonoCliente(idClienteUnico, confirmPhone));
        if (resp?.status == 200 || resp?.status == 'OK') {
            handleClose();
            handleContinueVerify(true);
        } else {
            setshowError(true)
        }
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        ACTUALIZAR MEDIOS DE CONTACTO DEL CLIENTE
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box p={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>ID Cliente Unico: {idClienteUnico}</Typography>
            </Box>
            <Box
                sx={{
                    maxWidth: 400,
                    margin: 'auto',
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    padding: 3,
                }}
            >
                {showError ?
                    <Box>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            Ocurrio un error inesperado. Favor de contactar a atención a empleados.
                        </Alert>
                    </Box>
                    : null}
                <Typography variant='h5' align='center'>
                    <strong>
                        Es necesario certificar los medios de contacto del cliente para continuar.
                    </strong>
                </Typography>

                <TextField
                    label="Número de teléfono"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={(e) => {
                        if (e.target.value.length <= 10) setPhone(e.target.value);
                    }}
                    disabled={codeSent}
                    error={!!phone && !phoneValid}
                    helperText={
                        phone && !phoneValid ? 'Debe tener exactamente 10 dígitos' : ''
                    }
                />

                <TextField
                    label="Confirmar número de teléfono"
                    variant="outlined"
                    fullWidth
                    value={confirmPhone}
                    onChange={(e) => {
                        if (e.target.value.length <= 10) setConfirmPhone(e.target.value);
                    }}
                    disabled={codeSent}
                    error={!!confirmPhone && (!confirmPhoneValid || !phonesMatch)}
                    helperText={
                        confirmPhone && (!confirmPhoneValid
                            ? 'Debe tener exactamente 10 dígitos'
                            : !phonesMatch
                                ? 'Los números no coinciden'
                                : '')
                    }
                />

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSendCode}
                    disabled={!canSendCode}
                >
                    Enviar código SMS
                </Button>

                {codeSent && (
                    <>
                        <Typography variant="body2" align="center">
                            Se envió un código al número {phone}
                        </Typography>

                        <OTPInput
                            placeholder="Ingresa el código de verificación"
                            value={otp}
                            onChange={setOtp}
                        />

                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            onClick={handleVerify}
                        >
                            Verificar
                        </Button>
                    </>
                )}
            </Box>
            {(!phonesMatch || !phoneValid || !confirmPhoneValid) && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" color="error">
                        {(!phoneValid || !confirmPhoneValid)
                            ? 'Ambos números deben tener exactamente 10 dígitos.'
                            : !phonesMatch
                                ? 'Los números ingresados no coinciden.'
                                : ''}
                    </Typography>
                </Box>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Código enviado por SMS
                </Alert>
            </Snackbar>
        </Dialog>
    );
}
