import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Card,
  CardContent,
  Grid2
} from '@mui/material';
import React from 'react';
import OfertaComponent from './OfertaComponent';

const ClienteOfertasModal = ({ open, handleClose, ofertasData, informacionContacto }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalOfferIcon sx={{ fontSize: 30 }} />
          <Typography variant="h5" sx={{ ml: 2 }}>
            Ofertas del Cliente
          </Typography>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent>
        {informacionContacto && (
          <Card
            variant="outlined"
            sx={{
              mb: 3,
              borderRadius: 2,
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              bgcolor: '#fafafa'
            }}
          >
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {informacionContacto.noTelefono && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      {informacionContacto.noTelefono}
                    </Typography>
                  </Box>
                )}
                {informacionContacto.email && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      {informacionContacto.email}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        )}

        <Grid2 container spacing={2} columns={20}>
          {ofertasData.map((oferta, index) => (
            <Grid2 item xs={20} sm={10} md={4} key={index}>
              <OfertaComponent oferta={oferta} />
            </Grid2>
          ))}
        </Grid2>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClienteOfertasModal;
