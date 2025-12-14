import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const CreditCard = ({ credit }) => (
  <Card variant="elevation" sx={{ mb: 2 }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} gap={10}>
        <Typography variant="h8" color="#2196f3" fontStyle="italic">
          {' '}
          PriorBank{' '}
        </Typography>
        <Typography fontSize={20}>1234567890</Typography>
      </Box>

      <Box display="flex" justifyContent="center" mb={0.5}>
        <Typography fontSize={36}>
          {credit.amount} {credit.currency}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={0.5}>
        <Typography variant="body2" color="text.secondary">
          BYN в месяц
        </Typography>
        <Typography variant="body2">
          {credit.monthlyPayment} {credit.currency}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={0.5}>
        <Typography variant="body2" color="text.secondary">
          Остаток долга:
        </Typography>
        <Typography variant="body2">
          {credit.remainingBalance} {credit.currency}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={0.5}>
        <Typography variant="body2" color="text.secondary">
          дата погашения:
        </Typography>
        <Typography variant="body2">{credit.endDate}</Typography>
      </Box>
    </CardContent>
  </Card>
);

export default CreditCard;
