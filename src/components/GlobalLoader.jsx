import { Box, CircularProgress, Backdrop } from '@mui/material';
import React from 'react';

const GlobalLoader = ({ loading, text }) => (
  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }} open={loading}>
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

export default GlobalLoader;
