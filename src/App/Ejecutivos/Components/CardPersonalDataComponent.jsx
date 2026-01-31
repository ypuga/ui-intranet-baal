import React from 'react'
import { Card, CardContent, Typography, Grid2, Box } from '@mui/material'

const CardPersonalDataComponent = ({ data }) => {
  if (!data) return null

  return (
    <Card sx={{ maxWidth: 600, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Datos Personales
        </Typography>

        <Grid2 container spacing={2}>
          <Grid2 item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              ID Cliente Único
            </Typography>
            <Typography>{data.idClienteUnico}</Typography>
          </Grid2>

          <Grid2 item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Nombre Completo
            </Typography>
            <Typography>
              {`${data.primerNombre} ${data.segundoNombre || ''} ${data.apellidoPaterno} ${data.apellidoMaterno}`}
            </Typography>
          </Grid2>

          <Grid2 item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Género
            </Typography>
            <Typography>{data.genero}</Typography>
          </Grid2>

          <Grid2 item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Fecha de Nacimiento
            </Typography>
            <Typography>{new Date(data.fechaNacimiento).toLocaleDateString()}</Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  )
}

export default CardPersonalDataComponent
