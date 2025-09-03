import { Alert, AlertTitle, Box, Button, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { startCancelarCuentaClientes } from '../../../Store/Clientes/Thunks';

const CancelacionDeCuentaView = () => {
  const [loading, setLoading] = useState(true);
  const [cancelada, setCancelada] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const cuenta = searchParams.get("cuenta");

  useEffect(() => {
    const timer = setTimeout(() => {
      cancelacionCuenta();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const cancelacionCuenta = async () => {
    try {
      setError(false);
      setLoading(true);
      const resp = await dispatch(startCancelarCuentaClientes(cuenta));

      console.log(resp);

      if (resp.status == 200 || resp.status == 'OK') {
        setLoading(false);
        setCancelada(true);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  const handleSubmit = () => {
    navigate('/home');
  };

  return (
    <Box
      p={4}
      height="100%"
      display="flex"
      flexDirection="column"
      sx={{ '& .MuiTextField-root': { m: 1 } }}
    >
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Confirmación de cancelación de cuenta
      </Typography>

      <Box mt={5}>
        {loading ? (
          <Box display="flex" alignItems="center">
            <CircularProgress />
            <Typography ml={2} fontSize="18px">
              Procesando cancelación de la cuenta...
            </Typography>
          </Box>
        ) : cancelada ? (
          <Box>
            <Alert severity="info">
              <AlertTitle>Confirmación de cancelación de la cuenta</AlertTitle>
              <Typography>La cuenta ha sido cancelada correctamente!!!</Typography>
            </Alert>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
              >
                FINALIZAR
              </Button>
            </Box>
          </Box>
        ) : error ? (
          <Box>
            <Alert severity="error">
              <AlertTitle>Error en la cancelación</AlertTitle>
              <Typography>
                No fue posible cancelar la cuenta. Intente nuevamente.
              </Typography>
            </Alert>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={cancelacionCuenta}
              >
                Reintentar
              </Button>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default CancelacionDeCuentaView;
