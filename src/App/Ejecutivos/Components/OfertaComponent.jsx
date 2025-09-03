import { Card, CardContent, Typography, Chip, Stack, Box } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventIcon from '@mui/icons-material/Event';
import React from 'react';

const creditos = {
  values: {
    125: "TDC ALAMEDA MASTER CARD",
    127: "TDC ALAMEDA GOLD",
    130: "TDC ALAMEDA PLATINUM",
    187: "CRM CREDITO MOTO",
    154: "CRE CREDITO EFECTIVO INMEDIATO",
    190: "CRA CREDITO AUTO"
  }
};

// Colores por producto
const coloresFondo = {
  125: 'linear-gradient(145deg, #f5f5f5, #e0e0e0)', // gris
  127: 'linear-gradient(145deg, #fff8e1, #ffe082)', // dorado
  130: 'linear-gradient(145deg, #f0f0f0, #cfd8dc)', // plateado
  187: 'linear-gradient(145deg, #e3f2fd, #90caf9)', // azul
  154: 'linear-gradient(145deg, #e8f5e9, #a5d6a7)', // verde
  190: 'linear-gradient(145deg, #f1f8e9, #c5e1a5)'  // verde bajito
};

const OfertaComponent = ({ oferta }) => {
  const producto = creditos.values[oferta.idProduct] || oferta.nombreProducto;
  const categoria = producto.split(" ")[0];
  const nombreLimpio = producto.replace(categoria, "").trim().replaceAll("_", " ");

  const fondo = coloresFondo[oferta.idProduct] || 'linear-gradient(145deg, #ffffff, #f8f9fa)';

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        background: fondo,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Categoría y nombre */}
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#1e293b' }}>
          {categoria}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {nombreLimpio}
        </Typography>

        {/* Estado y aceptación */}
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
          <Chip
            size="small"
            label={oferta.statusOferta}
            color={oferta.statusOferta === 'PRE_AUTORIZADO' ? 'warning' : 'success'}
            variant="filled"
            sx={{ fontSize: '0.75rem', fontWeight: '500' }}
          />
          {oferta.isAccepted ? (
            <Chip size="small" label="Aceptada" color="success" sx={{ fontSize: '0.75rem' }} />
          ) : (
            <Chip size="small" label="Pendiente" color="default" sx={{ fontSize: '0.75rem' }} />
          )}
        </Stack>

        {/* Monto */}
        <Box display="flex" alignItems="center" mb={1}>
          <MonetizationOnIcon sx={{ fontSize: 20, color: 'black', mr: 1 }} />
          <Typography variant="body1" fontWeight="bold" color="black">
            ${oferta.montoOferta.toLocaleString()}
          </Typography>
        </Box>

        {/* Fechas */}
        <Box display="flex" alignItems="center">
          <EventIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
          <Typography variant="caption" color="text.secondary">
            {oferta.fechaInicio} → {oferta.fechaFin}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OfertaComponent;
