import { AccountBalance } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useToast from '../../../Hooks/useToast'
import { startAsignarTarjetaDebitoUnico } from '../../../Store/Clientes/Thunks'

const ProductosClienteModal = ({ open, handleClose }) => {
  const { cuentasCliente, creditosCliente } = useSelector(state => state.clientes);
  const [isLoading, setisLoading] = useState('asignar');
  const [card, setcard] = useState('');
  const { showToast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    setcard('');
    setisLoading('asignar')
  }, [])
  

  const renderTablaCuentas = (cuentas) => {
    if (!Array.isArray(cuentas)) {
      return (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No hay cuentas disponibles.
        </Typography>
      );
    }

    const asignarTarjetaCredito = async (idCuenta) => {
      setisLoading('loading');
      const resp = await dispatch(startAsignarTarjetaDebitoUnico(idCuenta));
      if (resp?.status == 'OK' || resp?.status == 200) {
        setcard(resp?.data?.noTarjeta),
        setisLoading('showCard');
      } else {
        showToast(resp.message, 'error', 'top-center');
        setisLoading('asignar');
      }
    }

    return (
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: '12px', mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>ID Cuenta</strong></TableCell>
              <TableCell><strong>Producto</strong></TableCell>
              <TableCell><strong>Fecha de Alta</strong></TableCell>
              <TableCell><strong>Estatus</strong></TableCell>
              <TableCell><strong>Tarjeta</strong></TableCell>
              <TableCell><strong>Cancelar</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuentas.map((cuenta, index) => (
              <TableRow key={index} hover>
                <TableCell>{cuenta?.idCuenta}</TableCell>
                <TableCell>{cuenta?.producto}</TableCell>
                <TableCell>{cuenta?.fechaAlta}</TableCell>
                <TableCell>{cuenta?.status}</TableCell>
                <TableCell>
                  {cuenta?.noTarjeta == null ? (
                    isLoading === "asignar" ? (
                      <Button
                        size="small"
                        onClick={() => asignarTarjetaCredito(cuenta?.idCuenta)}
                      >
                        Asignar
                      </Button>
                    ) : isLoading === "loading" ? (
                      <CircularProgress />
                    ) : isLoading === "showCard" ? (
                      <Typography variant="body2" color="text.secondary">
                        {card}
                      </Typography>
                    ) : null
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {cuenta?.noTarjeta}
                    </Typography>
                  )}

                </TableCell>
                <TableCell>
                  {cuenta?.isCancelable
                    ? <Button color="error" size="small">Cancelar</Button>
                    : <Typography variant="body2" color="text.secondary"></Typography>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };


  const renderTablaCreditos = (creditos) => {
    if (!Array.isArray(creditos)) {
      return (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No hay cuentas disponibles.
        </Typography>
      );
    }
    return (
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: '12px', mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>ID Cuenta</strong></TableCell>
              <TableCell><strong>Producto</strong></TableCell>
              <TableCell><strong>Fecha de Alta</strong></TableCell>
              <TableCell><strong>Linea de Credito</strong></TableCell>
              <TableCell><strong>Tarjeta</strong></TableCell>
              <TableCell><strong>Cancelar</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {creditos.map((credito, index) => (
              <TableRow key={index} hover>
                <TableCell>{credito?.idCredito}</TableCell>
                <TableCell>{credito?.producto}</TableCell>
                <TableCell>{credito?.fechaApertura}</TableCell>
                <TableCell>$ {credito?.lineaCredito}</TableCell>
                <TableCell>
                  {credito?.noTarjeta == null
                    ? <Button size="small" onClick={() => asignarTarjetaCredito(credito?.idCredito)}>Asignar</Button>
                    : <Typography variant="body2" color="text.secondary">{credito?.noTarjeta}</Typography>}
                </TableCell>
                <TableCell>
                  {credito?.isCancelable
                    ? <Button color="error" size="small">Cancelar</Button>
                    : <Typography variant="body2" color="text.secondary"></Typography>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  };


  return (
    <Dialog
      fullWidth
      maxWidth='xl'
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalance sx={{ fontSize: 30 }} />
          <Typography variant='h5' sx={{ ml: 2 }}>Cuentas del Cliente</Typography>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant='h6' sx={{ mt: 1, mb: 1 }}><strong>Cuentas del cliente</strong></Typography>
        {renderTablaCuentas(cuentasCliente)}

        <Typography variant='h6' sx={{ mt: 4, mb: 1 }}><strong>Créditos del cliente</strong></Typography>
        {renderTablaCreditos(creditosCliente)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductosClienteModal
