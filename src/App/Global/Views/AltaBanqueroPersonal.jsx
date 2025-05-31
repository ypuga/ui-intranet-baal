import React, { useState } from 'react';
import { Box, Button, Grid2, TextField, Typography } from '@mui/material';
import { ejecutivos } from '../../../Data/ExecutivesData';
import { sucursales } from '../../../Data/SucursalesData';
import { useLoading } from '../../../Hooks/LoadingContext';
import SingleSelect from '../Components/MultipleSelect';
import { useDispatch, useSelector } from 'react-redux';
import { startSavePersonalBanking } from '../../../Store/Prospectos/Thunks';
import useToast from '../../../Hooks/useToast';

const AltaBanqueroPersonal = ({ onNext }) => {

  const {isLoading, startLoading, stopLoading} = useLoading();
  const [noEmpleado, setnoEmpleado] = useState();
  const [sucursalSeleccionada, setsucursalSeleccionada] = useState();

  const {user, sucursal} = useSelector(state=>state.sistema);
  const {solicitud} = useSelector(state=>state.prospectos);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleNext = async () => {
    const data = {
      bp: noEmpleado,
      sucursal: sucursalSeleccionada
    }
      const resp = await dispatch(startSavePersonalBanking(data));
      if (resp.status == 'OK') {
        showToast(resp.message, 'success', 'top-center');
        onNext();
    } else {
        showToast(resp.message, 'error', 'top-center');
    }
  }

  const nombresBanqueros = ejecutivos.map(e => e.nombre);

  return (
    <Box 
      p={4} 
      height="100%" 
      display="flex" 
      flexDirection="column"
      sx={{ '& .MuiTextField-root': { m: 1 } }}
    >
      <Typography variant="h5" gutterBottom>
        BANQUERO PERSONAL
      </Typography>
      <Typography fontSize={"10px"}>
        ID De Evaluacion: {solicitud.idSolicitud}
      </Typography> 
      <Box flex={1} my={4}>
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid2 size={6}>
            <TextField
              label="Numero de empleado"
              disabled
              defaultValue={user}
              variant="outlined"
              inputProps={{ maxLength: 8 }}
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Numero de sucursal"
              disabled
              variant="outlined"
              defaultValue={sucursal}
              inputProps={{ maxLength: 4 }}
              fullWidth
            />
          </Grid2>
        </Grid2>
        <Grid2 size={6}>
        <SingleSelect
            values={nombresBanqueros}
            placeholder="Banquero personal"
            onChange={(nombreSeleccionado) => {
              const banquero = ejecutivos.find(e => e.nombre === nombreSeleccionado);
              if (banquero) {
                setnoEmpleado(banquero);
              }
            }}
          />
        </Grid2>
        <Grid2 size={6}>
        <SingleSelect
          values={sucursales}
          placeholder="Sucursal"
          onChange={(sucursalSeleccionada) => {
            const numeroSucursal = sucursalSeleccionada.split(' - ')[0].trim();
            setsucursalSeleccionada(numeroSucursal);
          }}
        />
        </Grid2>
        <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button 
          variant="contained" 
          onClick={handleNext}
          size="large"
        >
          Siguiente
        </Button>
      </Box>
      </Box>
    </Box>
  );
};

export default AltaBanqueroPersonal;
