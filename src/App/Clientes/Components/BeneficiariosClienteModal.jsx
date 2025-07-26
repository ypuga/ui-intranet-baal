import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Checkbox
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const BeneficiariosClienteModal = ({ handleOpen, handleContinue, open, handleClose }) => {
    const { beneficiariosCliente } = useSelector(state => state.clientes);
    const [beneficiariosSelected, setbeneficiariosSelected] = useState([]);
    const [disabled, setdisabled] = useState(true);

    useEffect(() => {
        setdisabled(beneficiariosSelected.length === 0);
    }, [beneficiariosSelected]);

    const selectBeneficiario = (beneficiario) => {
        setbeneficiariosSelected(prev => {
            const yaSeleccionado = prev.some(b => b.id === beneficiario.id);
            if (yaSeleccionado) {
                return prev.filter(b => b.id !== beneficiario.id);
            } else {
                return [...prev, beneficiario];
            }
        });
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Dialog
            onClose={handleOpen}
            aria-labelledby="informative-dialog-title"
            open={open}
            maxWidth="lg"
            fullWidth
        >
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" fontWeight="bold">
                        Beneficiarios del Cliente
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 3 }}>
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><Typography fontWeight="bold">NOMBRE(S)</Typography></TableCell>
                                <TableCell><Typography fontWeight="bold">APELLIDO PATERNO</Typography></TableCell>
                                <TableCell><Typography fontWeight="bold">APELLIDO MATERNO</Typography></TableCell>
                                <TableCell><Typography fontWeight="bold">PARENTEZCO</Typography></TableCell>
                                <TableCell><Typography fontWeight="bold"></Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {beneficiariosCliente && beneficiariosCliente.length > 0 ? (
                                [...new Map(
                                    beneficiariosCliente.map(b => [
                                        `${b.beneficiarioNombres} ${b.beneficiarioPaterno} ${b.beneficiarioMaterno}`,
                                        b
                                    ])
                                ).values()].map((beneficiario, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell>{beneficiario.beneficiarioNombres}</TableCell>
                                        <TableCell>{beneficiario.beneficiarioPaterno}</TableCell>
                                        <TableCell>{beneficiario.beneficiarioMaterno}</TableCell>
                                        <TableCell>{beneficiario.beneficiarioParentezo}</TableCell>
                                        <TableCell>
                                            <Checkbox
                                                {...label}
                                                checked={beneficiariosSelected.some(b => b.id === beneficiario.id)}
                                                onClick={() => selectBeneficiario(beneficiario)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography sx={{ py: 2, color: 'text.secondary' }}>
                                            No se encontraron registros.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'flex-end', px: 3, py: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => handleContinue(beneficiariosSelected)}
                    disabled={disabled}
                >
                    Continuar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BeneficiariosClienteModal;
