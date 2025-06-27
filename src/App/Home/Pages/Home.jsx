import React, { useEffect } from 'react';
import AppLayout from '../../Layout/AppLayout';
import { Box, Typography, Paper, Grid2 } from '@mui/material';
import SolicitudesComponent from '../Components/SolicitudesComponent';
import CarouselHome from '../Components/CarouselHome';
import FraseDelDia from '../Components/FraseDelDia';
import TramitesComponents from '../Components/TramitesComponents';

const Home = () => {

  return (
    <AppLayout>
      <Grid2 container spacing={2}>
        <Grid2 container size={16}>
          <FraseDelDia/>
        </Grid2>
        <Grid2 container size={16}>
          <CarouselHome />
        </Grid2>
        <Grid2 size={16}>
          <SolicitudesComponent />
        </Grid2>
        <Grid2 size={16}>
          <TramitesComponents/>
        </Grid2>
      </Grid2>
    </AppLayout>
  );
};

export default Home;
