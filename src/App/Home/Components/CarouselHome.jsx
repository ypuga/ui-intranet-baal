import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const images = [
  'https://www.bancoazteca.com.mx/content/dam/azteca/empresas/home/230626/fortalecer.jpg',
  'https://www.bancoazteca.com.mx/content/dam/azteca/home/250513/HOME-promociones-prestamo.webp',
  'https://www.banamex.com/assets/home/img/desktop/hero-image-SeguroViaje-pareja-mujeres-alberca.jpg',
  'https://www.banamex.com/assets/home/img/desktop/hero-image-lacomer-mama-hija-super.jpg'
];

const CarouselHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const max = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % max);
    }, 4000);
    return () => clearInterval(interval);
  }, [max]);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % max);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + max) % max);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      <Box
        component="img"
        src={images[activeIndex]}
        alt={`slide-${activeIndex}`}
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      <IconButton
        onClick={prev}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.3)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
        }}
      >
        <ArrowBackIos fontSize="small" />
      </IconButton>

      <IconButton
        onClick={next}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.3)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default CarouselHome;
