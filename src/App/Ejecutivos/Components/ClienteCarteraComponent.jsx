import { Email, Phone } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';

const ClienteCarteraComponent = ({ cliente }) => {
    const hasOfertas = cliente?.ofertasFlag;

    return (
        <Card
            sx={{
                width: 360,
                borderRadius: 3,
                p: 2,
                bgcolor: '#e0f7fa',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 280
            }}
        >
            <CardContent sx={{ pb: 0 }}>
                <Typography variant="caption" sx={{ color: '#999' }}>
                    ID Cliente: {cliente?.idClienteUnico}
                </Typography>

                <Typography variant="h6" fontWeight="600" sx={{ mt: 1, mb: 0.5, color: '#333' }}>
                    {cliente?.primerNombre} {cliente?.segundoNombre}
                </Typography>

                <Typography variant="subtitle2" sx={{ color: '#555', mb: 2 }}>
                    {cliente?.apellidoPaterno} {cliente?.apellidoMaterno}
                </Typography>

                <List dense disablePadding>
                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32, color: '#777' }}>
                            <Phone fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={cliente?.noTelefono || 'No disponible'} />
                    </ListItem>

                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32, color: '#777' }}>
                            <Email fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={cliente?.email || 'No disponible'} />
                    </ListItem>
                </List>
            </CardContent>

            <CardActions sx={{ pt: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    disabled={!hasOfertas}
                    sx={{
                        bgcolor: 'green',
                        color: 'white',
                        textTransform: 'none',
                        borderRadius: 2,
                        boxShadow: 'none',
                        fontWeight: 500,
                        fontSize: 14,
                    }}
                >
                    Ver ofertas
                </Button>
                                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        bgcolor:'#b2dfdb',
                        color: '#666',
                        textTransform: 'none',
                        borderRadius: 2,
                        boxShadow: 'none',
                        fontWeight: 500,
                        fontSize: 14,
                        '&:hover': {
                            bgcolor: hasOfertas ? '#1565c0' : '#b2dfdb'
                        }
                    }}
                >
                    Ver productos
                </Button>  
            </CardActions>
        </Card>
    );
};

export default ClienteCarteraComponent;
