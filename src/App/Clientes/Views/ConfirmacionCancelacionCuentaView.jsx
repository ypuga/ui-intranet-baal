import React from "react";
import { Box, Typography, Alert, AlertTitle, Button, Stack } from "@mui/material";
import { WarningAmber } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startObtenerClienteInfo } from "../../../Store/Clientes/Thunks";
import useToast from "../../../Hooks/useToast";

const ConfirmacionCancelacionCuentaView = ({ onNext }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cliente = searchParams.get("cliente");
  const dispatch = useDispatch();
  const {showToast} = useToast();

  const handleCancel = async () => {
    navigate('/home');
  }   

  const handleContinue = async () => {
    const resp = await dispatch(startObtenerClienteInfo('ID_CLIENTE_UNICO', cliente, 'PERSONAL_DATA'));
    if (resp?.status == 200 || resp?.status == 'OK') {
      onNext();
    } else {
      showToast(resp?.message, 'error', 'top-center');
    }
  }

  return (
    <Box
      p={4}
      sx={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Cancelación de Cuenta Bancaria
      </Typography>

      <Alert
        severity="warning"
        icon={<WarningAmber fontSize="inherit" />}
        sx={{ mt: 2, textAlign: "left" }}
      >
        <AlertTitle>¿Desea cancelar su cuenta?</AlertTitle>
        Esta acción es <strong>irreversible</strong>.  
        <br />
        ✅ El cierre puede tardar hasta <strong>12 horas</strong> en verse reflejado en su aplicación.  
        <br />
        ⚠️ En caso de tener <strong>saldo pendiente</strong>, deberá enviar un formulario al área de{" "}
        <strong>cuentas-globales</strong> a la extensión <strong>3299</strong>.  
      </Alert>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        mt={4}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleCancel}
          sx={{ borderRadius: 2 }}
        >
          No, salir
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleContinue}
          sx={{ borderRadius: 2 }}
        >
          Sí, cancelar
        </Button>
      </Stack>
    </Box>
  );
};

export default ConfirmacionCancelacionCuentaView;
