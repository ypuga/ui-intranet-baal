import { Box, Card, CardContent, Typography, Chip, Stack } from '@mui/material'
import React from 'react'

const CardGeneralComponent = ({data}) => {

  const getChipColor = (value) => (value ? 'success' : 'default')
  const getChipLabel = (label, value) => `${label}: ${value ? 'Sí' : 'No'}`

  return (
    <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Cliente: {data?.idClienteUnico}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Fecha de Alta: {new Date(data?.fechaAlta).toLocaleDateString()}
        </Typography>

        <Box mt={2}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              label={getChipLabel('Activo', data?.clienteActivo)}
              color={data?.clienteActivo ? 'success' : 'error'}
              variant="outlined"
            />
            <Chip
              label={getChipLabel('Lista Negra', data?.listaNegra)}
              color={data?.listaNegra ? 'error' : 'default'}
              variant="outlined"
            />
            <Chip
              label={getChipLabel('Cartera Vencida', data?.carteraVencida)}
              color={data?.carteraVencida ? 'warning' : 'default'}
              variant="outlined"
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardGeneralComponent
