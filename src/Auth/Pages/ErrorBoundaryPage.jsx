import { Box, Typography } from '@mui/material';
import logo from '../../assets/NLBOW.png';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import React from 'react';

const ErrorBoundaryPage = () => {
  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={"5vh"}
      height="100vh"
    >
      <Box>
        <img style={{ width: '30vh' }} src={logo} alt="Logo" />
      </Box>
      <Box>
        <SentimentDissatisfiedIcon color='info' sx={{fontSize: '40vh'}} />
      </Box>
      <Typography variant="h4" mt={0} color='info'>
        <strong>LO SENTIMOS!!!</strong>
      </Typography>
      <Typography variant='h6'>El sistema no se encuentra disponible actualmente.</Typography>
    </Box>
  );
};

export default ErrorBoundaryPage;
