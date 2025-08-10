import { Button, Card, CardActions, CardContent, Typography, Divider } from '@mui/material'
import React from 'react'

const AccountCard = ({ data, seleccion }) => {
    
    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': { boxShadow: 6 },
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    ID Cuenta: {data?.idCuenta}
                </Typography>

                <Typography variant="h6" fontWeight={600} gutterBottom>
                    {data?.producto}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Estado: {data?.status}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Tarjeta: {data?.noTarjeta}
                </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    fullWidth
                    size="medium"
                    variant="contained"
                    disabled={!data?.isActive}
                    sx={{ textTransform: 'none', borderRadius: 2 }}
                    onClick={()=>seleccion(data)}
                >
                    Seleccionar
                </Button>
            </CardActions>
        </Card>
    )
}

export default AccountCard
