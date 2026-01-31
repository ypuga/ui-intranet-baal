import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup({ handleCriterioChange }) {
  const [criterio, setCriterio] = React.useState("");

  const handleCriterio = (value) => {
    setCriterio(value);
    handleCriterioChange(value);
  };

  return (
    <FormControl>
      <FormLabel color="primary">Criterio de Búsqueda</FormLabel>
      <RadioGroup
        row
        aria-labelledby="criterio-busqueda-label"
        name="criterio-busqueda"
        value={criterio}
        onChange={(event) => handleCriterio(event.target.value)}
      >
        <FormControlLabel value="CURP" control={<Radio />} label="CURP" />
        <FormControlLabel value="NOMBRE" control={<Radio />} label="NOMBRE DEL CLIENTE" />
        <FormControlLabel value="RFC" control={<Radio />} label="RFC" />
        <FormControlLabel value="TELEFONO" control={<Radio />} label="TELEFONO" />
        <FormControlLabel value="ID_CLIENTE_UNICO" control={<Radio />} label="ID CLIENTE UNICO" />
      </RadioGroup>
    </FormControl>
  );
}
