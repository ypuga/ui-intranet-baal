import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, Typography } from '@mui/material';
import OTPInput from './OTPInput';
import { useDispatch } from 'react-redux';
import { startCertificaMedioContacto } from '../../../Store/Prospectos/Thunks';
import useToast from '../../../Hooks/useToast';

export default function AlertDialog({ otpDialog, setotpDialog, onNext }) {
  const [otp, setOtp] = React.useState('');
  const [reSent, setResend] = React.useState(true);
  const dispatch = useDispatch();
  const {showToast} = useToast();

  const handleClose = async () => {
    const resp = await dispatch(startCertificaMedioContacto());
      if (resp.status == 'OK') {
        setotpDialog(false);
        showToast(resp.message, 'info', 'top-center');
        onNext();
    } else {
        showToast(resp.message, 'error', 'top-center');
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setResend(false)
    }, 30000);
    return () => {
        clearTimeout(timer);
    };
}, []);

  return (
    <React.Fragment>
      <Dialog
        open={otpDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box p={1}>
          <DialogTitle id="alert-dialog-title" align="center">
            VALIDACION DE INFORMACION DE CONTACTO
            <Divider>
              <Typography fontSize={"12px"}>SMS</Typography>
            </Divider>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se envió un SMS al número de teléfono con terminación 3484 con el código para validar la información de contacto del cliente.
            </DialogContentText>
            <Box
              width={"100%"}
              display={"flex"}
              alignContent={"center"}
              justifyContent={"center"}
              mt={5}
              
            >
              <OTPInput
                placeholder="Ingresa el código de verificación"
                value={otp}
                onChange={setOtp}
              />
            </Box>
            <Box width={"100%"} display={"flex"} alignContent={"center"} alignItems={"center"} justifyContent={"center"}>
              <Button disabled={reSent}>Reenviar Codigo</Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={otp.length !== 5}
              variant="outlined"
              color="success"
              onClick={handleClose}
              autoFocus
            >
              VALIDAR
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

