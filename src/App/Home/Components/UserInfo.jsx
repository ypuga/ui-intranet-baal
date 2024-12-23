import { Avatar, Box, Typography, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserInfo = () => {
  const { titleName, profile } = useSelector(state => state.sistema);

  const dataLoaded = titleName && profile;

  if (dataLoaded == null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Box>
          <Avatar>{titleName?.charAt(0)}</Avatar>
        </Box>
        <Box
          sx={{
            display: 'inline-block',
            marginLeft: '10px',
          }}
        >
          <Typography variant="h7">{titleName}</Typography>
          <br />
          <Typography fontSize={'12px'}>{profile}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;
