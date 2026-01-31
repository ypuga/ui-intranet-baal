import React from 'react'
import { Card, CardContent, Typography, Grid2 } from '@mui/material'

const CardContactoComponent = ({ data }) => {
  if (!data) return null

  return (
    <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Contacto
        </Typography>

        <Grid2 container spacing={2}>

          <Grid2 item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Teléfono
            </Typography>
            <Typography>{data.noTelefono || 'No disponible'}</Typography>
          </Grid2>

          <Grid2 item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography>{data.email || 'No disponible'}</Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  )
}

export default CardContactoComponent
