import React from 'react';

import { Box } from '@mui/material';
import BankCard from './BankCard';

export default function BankList({ banks }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)',
        },
        gap: 3,
        alignItems: 'stretch',
      }}
    >
      {banks.map((bank) => (
        <BankCard key={bank.name} {...bank} />
      ))}
    </Box>
  );
}
