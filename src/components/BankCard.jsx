import React from 'react';
import { Box, Typography } from '@mui/material';

export default function BankCard({ logo, logoSmall, name, description }) {
  return (
    <Box
      sx={{
        width: '240px',
        height: '220px',
        perspective: '1000px',
      }}
    >
      <Box
        className="flip-inner"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s',
          '&:hover': {
            transform: 'rotateY(180deg)',
          },
        }}
      >
        {/* FRONT */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            bgcolor: '#fff',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backfaceVisibility: 'hidden',
            p: 2,
          }}
        >
          <img src={logo} alt={name} style={{ width: '100%' }} />
        </Box>

        {/* BACK */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            bgcolor: '#fff',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            padding: '15px 20px',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={logoSmall || logo}
            alt={name}
            style={{ width: '100px', height: 'auto', marginBottom: '5px' }}
          />
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: 'normal',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
