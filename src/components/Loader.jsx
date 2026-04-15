import React from 'react';
import { Box, CircularProgress, Backdrop } from '@mui/material';

const Loader = ({ loading, text }) => (
  <Backdrop
    sx={{
      color: '#fff',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 2,
      zIndex: (theme) => theme.zIndex.drawer + 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    }}
    open={loading}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <CircularProgress color="inherit" />
      <span>{text}</span>
    </Box>
  </Backdrop>
);

export default Loader;
