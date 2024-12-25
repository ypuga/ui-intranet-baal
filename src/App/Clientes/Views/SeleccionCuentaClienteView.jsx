import { Box, Card, CardActionArea, CardContent, CardMedia, Grid2, Typography } from '@mui/material'
import React from 'react'
import { accountData } from '../../../Data/SucursalesData'

export const SeleccionCuentaClienteView = ({onNext}) => {


    const handleSubmit = (value) => {
        onNext();
    }

    return (
        <Box
            p={4}
            height="100%"
            display="flex"
            flexDirection="column"
            sx={{ '& .MuiTextField-root': { m: 1 } }}
        >
            <Typography variant="h5" gutterBottom>
                SELECCION DE PRODUCTO
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <br />
                <Typography variant='h7'>Selecciona la cuenta a contratar</Typography>
                <Grid2 container spacing={2} justifyContent="center" mt={2}>
                    {accountData.map((account, index) => (
                        <Grid2 item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ width: 240, height: 420, margin: '0 auto' }}>
                                <CardActionArea disabled={account.disabled} onClick={() => handleSubmit(account.product)}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={account.image}
                                        alt={account.altText}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <strong>{account.title}</strong>
                                        </Typography>
                                        <ul style={{ marginLeft: '-25px' }}>
                                            {account.benefits.map((benefit, i) => (
                                                <li key={i}>
                                                    <Typography>{benefit}</Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Box>
    )
}
