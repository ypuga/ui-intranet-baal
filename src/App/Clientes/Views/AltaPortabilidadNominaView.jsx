import React from 'react'
import { Box, Typography, Button, Paper, Stack, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSelector } from "react-redux";

const AltaPortabilidadNominaView = ({ onNext }) => {

    const folio = useSelector(state => state?.clientes?.folioPortabilidad);

    const copiarFolio = () => {
        if (folio) {
            navigator.clipboard.writeText(folio);
        }
    };

    return (
        <Box
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                p: 4
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    p: 5,
                    maxWidth: 520,
                    width: '100%',
                    borderRadius: 4,
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255,255,255,0.95)'
                }}
            >

                {/* ICONO */}
                <Box
                    sx={{
                        width: 90,
                        height: 90,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        mb: 3,
                        boxShadow: '0 10px 25px rgba(34,197,94,0.4)'
                    }}
                >
                    <CheckCircleIcon sx={{ fontSize: 50, color: '#fff' }} />
                </Box>

                {/* TITULO */}
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    ¡Todo listo! 🎉
                </Typography>

                {/* MENSAJE */}
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Tu trámite de <b>portabilidad de nómina</b> fue enviado correctamente.
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Gracias por elegir <b>Banco Alameda</b>. Estamos felices de acompañarte.
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {/* FOLIO */}
                <Typography variant="caption" color="text.secondary">
                    FOLIO DE SEGUIMIENTO
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        mt: 1,
                        mb: 4,
                        p: 1.5,
                        borderRadius: 2,
                        background: '#f1f5f9'
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ letterSpacing: 1 }}
                    >
                        {folio || '—'}
                    </Typography>

                    <ContentCopyIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={copiarFolio}
                    />
                </Stack>

                {/* BOTON */}
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={()=>window.location.reload()}
                    sx={{
                        borderRadius: 3,
                        py: 1.5,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                        boxShadow: '0 10px 20px rgba(37,99,235,0.4)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #1d4ed8, #1e40af)'
                        }
                    }}
                >
                    Continuar
                </Button>

            </Paper>
        </Box>
    )
}

export default AltaPortabilidadNominaView;