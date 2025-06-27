import React, { useState } from 'react';
import {
  Box, TextField, MenuItem, InputLabel,
  FormControl, Select, Grid2, Typography, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { FilterList, ExpandMore } from '@mui/icons-material';

const FilterCarteraComponents = ({ onFilterChange }) => {
  const [filtro, setFiltro] = useState('nombre');
  const [valor, setValor] = useState('');

  const handleFiltroChange = (event) => {
    const nuevoFiltro = event.target.value;
    setFiltro(nuevoFiltro);
    setValor('');
    onFilterChange({ tipo: nuevoFiltro, valor: '' });
  };

  const handleValorChange = (event) => {
    const nuevoValor = event.target.value;
    setValor(nuevoValor);
    onFilterChange({ tipo: filtro, valor: nuevoValor });
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6" fontWeight="500" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList fontSize="medium" />
          Filtrar clientes
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 3 }}>
          <Grid2 container spacing={2}>
            <Grid2 item size={4}>
              <FormControl fullWidth>
                <InputLabel id="tipo-filtro-label">Filtrar por</InputLabel>
                <Select
                  labelId="tipo-filtro-label"
                  value={filtro}
                  label="Filtrar por"
                  onChange={handleFiltroChange}
                >
                  <MenuItem value="nombre">Nombre</MenuItem>
                  <MenuItem value="id">ID Cliente Único</MenuItem>
                  <MenuItem value="ofertas">Ofertas</MenuItem>
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 item size={8}>
              {filtro === 'ofertas' ? (
                <FormControl fullWidth>
                  <InputLabel>Estado de oferta</InputLabel>
                  <Select
                    value={valor}
                    label="Estado de oferta"
                    onChange={handleValorChange}
                  >
                    <MenuItem value="true">Con ofertas</MenuItem>
                    <MenuItem value="false">Sin ofertas</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label={`Buscar por ${filtro}`}
                  variant="outlined"
                  value={valor}
                  onChange={handleValorChange}
                />
              )}
            </Grid2>
          </Grid2>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterCarteraComponents;
