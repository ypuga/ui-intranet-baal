import { Avatar, Box, Typography, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';

const UserInfo = ({titleName, profile}) => {

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
          <Typography color='primary' variant="h7">{titleName}</Typography>
          <br />
          <Typography fontSize={'12px'}>{profile}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;
