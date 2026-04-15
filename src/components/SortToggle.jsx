import React from 'react';
import { Box, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SortToggle = ({ active, label, direction, onClick, sx = {} }) => (
  <Box
    onClick={onClick}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      cursor: 'pointer',
      fontSize: 15,
      color: '#2260BC',
      userSelect: 'none',
      ...sx,
    }}
  >
    {label}
    <Box
      component="span"
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
        lineHeight: 1,
      }}
    >
      {active && (direction === 'desc' ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />)}
    </Box>
  </Box>
);

export default SortToggle;
