import { Box, Card, CardActionArea, CardContent, CardMedia, Grid2, Typography } from '@mui/material'
import React from 'react'
import { cardsData } from '../../../Data/SucursalesData';
import { useDispatch } from 'react-redux';
import { startCreateNewSolicitudCliente } from '../../../Store/Prospectos/Thunks';
import useToast from '../../../Hooks/useToast';

const SeleccionTDC = ({onNext}) => {

    const dispatch = useDispatch();
    const {showToast} = useToast();

    const handleSubmit = async (value) => {
        const resp = await dispatch(startCreateNewSolicitudCliente(value));
        if (resp.status == 200 || resp.status == 'OK') {
            onNext();
        } else {
            showToast(resp.message, 'error', 'top-center');
        }
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
                SELECCION DE TARJETA DE CREDITO
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <br />
                <Typography variant='h7'>Seleccione la tarjeta de credito a contratar</Typography>
                <Grid2 container spacing={2} justifyContent="center">
                    {cardsData.map((card, index) => (
                        <Grid2 item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ maxWidth: 230, height: 500, margin: '0 auto' }}>
                                <CardActionArea disabled={card.disabled} onClick={()=>handleSubmit(card.idProducto)}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={card.image}
                                        alt={card.altText}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <strong>{card.title}</strong>
                                        </Typography>
                                        <Typography gutterBottom fontSize="12px" component="div">
                                            {card.minIncome}
                                        </Typography>
                                        <ul style={{marginLeft:'-25px'}}>
                                            {card.benefits.map((benefit, i) => (
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
    );
}

export default SeleccionTDC
