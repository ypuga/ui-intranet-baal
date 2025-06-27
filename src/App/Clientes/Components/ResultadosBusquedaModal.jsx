import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, Divider, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import IneAnverso from '../../../assets/INE_ANVERSO.png'
import IneReverso from '../../../assets/INE_REVERSO.jpeg'
import useToast from '../../../Hooks/useToast';
import { startSetSameIne } from '../../../Store/Prospectos/Thunks';


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

const ResultadosBusquedaModal = ({ open, handleClose }) => {

    const {showToast} = useToast();
    const {cliente, banqueroPersonal} = useSelector(state=>state.clientes);
    const dispatch = useDispatch();

    const handleClick =(sameIne)=>{
        dispatch(startSetSameIne(sameIne))
        if (sameIne == false) {
            showToast('Se le solicitara la identificacion oficial junto con la documentacion.', 'info', 'top-center');
        }
        handleClose(true);
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="lg"
            disableBackdropClick={false}
            fullWidth
        >
            <DialogTitle>CONSULTA DE CLIENTES</DialogTitle>
            <DialogContent dividers>
                <Box p={1}>
                    <Item>
                        <Typography textAlign='start'>Resultados de busqueda</Typography>
                        <br />
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>ID CLIENTE UNICO</strong></TableCell>
                                    <TableCell><strong>NOMBRE DEL CLIENTE</strong></TableCell>
                                    <TableCell><strong>CURP</strong></TableCell>
                                    <TableCell><strong>BANQUERO PERSONAL</strong></TableCell>
                                    <TableCell><strong>SUCURSAL DE ORIGEN</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{cliente.idClienteUnico}</TableCell>
                                    <TableCell>{cliente?.primerNombre+' '+cliente?.segundoNombre+' '+cliente?.apellidoPaterno+' '+cliente?.apellidoMaterno}</TableCell>
                                    <TableCell>{cliente?.curp}</TableCell>
                                    <TableCell>{banqueroPersonal?.bpOrigen}</TableCell>
                                    <TableCell>{banqueroPersonal?.sucOrigen}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Item>
                    <br />
                    <Box width="100%" display="flex" flexDirection="column" justifyContent='space-between'>
                        <Grid2 container spacing={2} style={{ width: '100%' }}>
                            <Grid2 item xs={8}>
                                <Item>
                                    <Box>
                                        <Typography fontSize={"20px"}><strong>IDENTIFICACION OFICIAL DEL CLIENTE</strong></Typography>
                                        <Typography>ANVERSO</Typography>
                                        <Divider />
                                        <Box width={"100%"} padding={"10px"}>
                                            <img style={{ width: '300px' }} src={IneAnverso} />
                                        </Box>
                                    </Box>
                                </Item>
                            </Grid2>
                            <Grid2 item xs={8}>
                                <Item>
                                    <Box>
                                        <Typography fontSize={"20px"}><strong>IDENTIFICACION OFICIAL DEL CLIENTE</strong></Typography>
                                        <Typography>REVERSO</Typography>
                                        <Divider />
                                        <Box width={"100%"} padding={"10px"}>
                                            <img style={{ width: '300px' }} src={IneReverso} />
                                        </Box>
                                    </Box>
                                </Item>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Box>
            </DialogContent>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                padding: '10px',
                height: '100%',
            }}>
                <Typography textAlign='end'>¿Favor de confirmar si la identificación oficial sigue vigente y es la misma?</Typography>
                <Box sx={{ marginTop: 'auto', display: 'flex', marginTop: '10px', justifyContent: 'flex-end' }}>
                    <Button onClick={()=>handleClick(false)} variant="outlined" color="error" sx={{ marginLeft: '10px' }}>No es la misma o no esta vigente</Button>
                    <Button onClick={()=>handleClick(true)} variant="outlined" sx={{ marginLeft: '10px' }} color="primary">Si es la misma y esta vigente</Button>
                </Box>
            </Box>

        </BootstrapDialog>
    )
}

export default ResultadosBusquedaModal
