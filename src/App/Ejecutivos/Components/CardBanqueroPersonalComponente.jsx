import React from 'react'
import { Card, CardContent, Typography, Grid2 } from '@mui/material'

const CardBanqueroPersonalComponente = ({ data }) => {
  return (
    <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Baquero Personal
        </Typography>

        <Grid2 container spacing={2}>

          <Grid2 item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Banquero Personal Origen:
            </Typography>
            <Typography>{data?.bpOrigen || 'No disponible'}</Typography>
          </Grid2>

          <Grid2 item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Sucursal Origen:
            </Typography>
            <Typography>{data?.sucOrigen || 'No disponible'}</Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  )
}

export default CardBanqueroPersonalComponente
