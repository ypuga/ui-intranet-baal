import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Box, DialogActions, Divider, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import useToast from '../../../Hooks/useToast';
import { InfoOutlined } from '@mui/icons-material';
import OTPInput from '../../Global/Components/OTPInput';
import { useState } from 'react';


export const CertificacionContactoModal = ({ handleClose, handleContinue, open }) => {

    const [otp, setotp] = useState('');
    const [sendOtp, setsendOtp] = useState(false);

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(3),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(2),
        },
    }));

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    const handleContinueCertificar = () => {
        handleContinue();
    }

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="informative-dialog-title"
            open={open}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ color: "#ff5722", p: 1, borderRadius: "4px 4px 0 0" }}
                >
                    <Typography variant="h6" component="span" >
                        <strong>
                            CERTIFICAR DE INFORMACION DE CONTACTO
                        </strong>
                    </Typography>

                </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 3 }}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                    mb={3}
                    sx={{ border: "1px solid", borderColor: "#ff5722", borderRadius: 2, p: 2, bgcolor: "background.default" }}
                >
                    <InfoOutlined color="warning" fontSize="large" />
                    <Typography ml={2} variant="body1" sx={{ fontWeight: 500 }}>
                        Es necesario certificar el numero de telefono del cliente.
                    </Typography>
                </Box>
                {(!sendOtp) ?
                <Box sx={{
                    display: 'flex',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                    <TextField
                        label="Numero de Telefono"
                        variant="outlined"
                        name="codigoPostal"
                        inputProps={{
                            maxLength: '10',
                        }}
                        fullWidth
                    />
                </Box>
                :
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    margin: 'auto'
                }}
                >
                    <Typography fontSize="large" color='primary'>
                        <strong>
                            SE HA ENVIADO UN CODIGO PARA VERIFICAR LA INFORMACION DEL CLIENTE
                        </strong>
                    </Typography>
                    <br/>
                    <OTPInput
                        placeholder="Ingresa el código de verificación"
                        value={otp}
                        onChange={setotp}
                    />
                </Box>
                }
            </DialogContent>
            <DialogActions>
                <Box>
                    {(!sendOtp) ?
                    <Button onClick={()=>setsendOtp(true)} variant='outlined'>Continuar</Button>
                    :
                    <Button onClick={handleContinue()} disabled={otp.length >= 5 ? false : true} variant='contained' color='success'>Certificar</Button>
                    }
                </Box>
            </DialogActions>
        </Dialog>
    )
}
