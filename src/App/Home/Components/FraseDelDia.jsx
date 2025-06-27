import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { startGetFraseDia } from '../../../Store/Front/Thunks';
import { Box, Typography } from '@mui/material';

const FraseDelDia = () => {
  const [frase, setFrase] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fraseDia();
  }, [])

  const fraseDia = async () => {
    const resp = await dispatch(startGetFraseDia());
    if (resp?.status === 'OK' || resp?.status === 200) {
      setFrase(resp?.data);
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        margin: '2rem auto',
        padding: 4,
        backgroundColor: '#fdf6e3',
        borderRadius: 3,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.33)',
        fontFamily: "'Georgia', serif",
        position: 'relative',
        '&::before': {
          content: '"“"',
          fontSize: '5rem',
          color: '#b58840',
          position: 'absolute',
          top: 16,
          left: 20,
          fontWeight: 'bold',
          opacity: 0.2,
          userSelect: 'none',
        },
        '&::after': {
          content: '"”"',
          fontSize: '5rem',
          color: '#b58840',
          position: 'absolute',
          bottom: 16,
          right: 20,
          fontWeight: 'bold',
          opacity: 0.2,
          userSelect: 'none',
        }
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontStyle: 'italic',
          color: '#5d4a1a',
          lineHeight: 1.6,
          textAlign: 'center',
        }}
      >
        {frase}
      </Typography>
    </Box>
  )
}

export default FraseDelDia;
