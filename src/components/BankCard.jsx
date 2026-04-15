import React from 'react';
import { Box, Typography } from '@mui/material';

export default function BankCard({ logo, logoSmall, name, description }) {
  return (
    <Box
      sx={{
        width: 240,
        height: 230, // фиксируем высоту карточки
        perspective: 1200,
        '&:hover .flip-card-inner': {
          transform: 'rotateY(180deg)',
        },
      }}
    >
      <Box
        className="flip-card-inner"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.7s cubic-bezier(.4,.2,.2,1)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* FRONT */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: '#fff',
            borderRadius: 2,
            border: '1px solid #CACACA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backfaceVisibility: 'hidden',
            p: 2,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt={name}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              flexShrink: 0,
            }}
          />
        </Box>

        {/* BACK */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: '#fff',
            borderRadius: 2,
            border: '1px solid #CACACA',
            display: 'flex',
            flexDirection: 'column',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            padding: '0px 20px 15px 20px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={logoSmall || logo}
            alt={name}
            sx={{
              height: '30px',
              m: '10px 0 7px 0',
              width: 'auto',
              objectFit: 'contain',
              alignSelf: 'flex-start',
            }}
          />

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              display: '-webkit-box',
              // WebkitLineClamp: 6,
              // WebkitBoxOrient: 'vertical',
              lineHeight: 1.1,
              minHeight: 0,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
