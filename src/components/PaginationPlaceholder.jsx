import React from 'react';
import { Box, Typography } from '@mui/material';

export const PaginationPlaceholder = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 2,
      fontSize: '15px',
      color: '#000',
      padding: '15px 0',
    }}
  >
    <Box>Строк на странице:</Box>

    <Box
      sx={{
        minWidth: '50px',
        color: '#1A1A1A',
        backgroundColor: '#fff',
        cursor: 'default',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 1,
      }}
    >
      <Box sx={{ pr: '5px' }}>10</Box>
      <img src="/muiIcons/Down.png" alt="down" />
    </Box>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <Box>1-4 из 4</Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <img src="/muiIcons/Left.png" alt="left" />
        <img src="/muiIcons/Right.png" alt="right" />
      </Box>
    </Box>
  </Box>
);
