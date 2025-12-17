import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PercentIcon from '@mui/icons-material/Percent';

export default function BankCardResults({ bank }) {
  const [compare, setCompare] = useState(false);

  return (
    <Card
      elevation={3}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="120"
        image={bank.logo}
        alt={bank.name}
        sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
          {bank.name}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoneyIcon fontSize="small" color="primary" />
            <Typography variant="body2">
              <strong>Сумма:</strong> {bank.amount} BYN
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon fontSize="small" color="primary" />
            <Typography variant="body2">
              <strong>Срок:</strong> {bank.term} мес
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PercentIcon fontSize="small" color="primary" />
            <Typography variant="body2">
              <strong>Ставка:</strong> {bank.rate}
            </Typography>
          </Box>
          <Typography variant="body2">
            <strong>Ежемесячный платёж:</strong> {bank.payment} BYN
          </Typography>
          <Typography variant="body2">
            <strong>Досрочное погашение:</strong>{' '}
            <Chip
              label={bank.earlyRepayment}
              size="small"
              color={bank.earlyRepayment === 'Да' ? 'success' : 'default'}
              sx={{ height: 20 }}
            />
          </Typography>
          <Typography variant="body2">
            <strong>Эффективная % ставка:</strong> {bank.effectiveRate}
          </Typography>
          <Typography variant="body2">
            <strong>График погашения:</strong> {bank.schedule}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={compare}
              onChange={(e) => setCompare(e.target.checked)}
              size="small"
            />
          }
          label="Сравнить"
        />
        <Button variant="contained" color="primary" size="small">
          Выбрать
        </Button>
      </CardActions>
    </Card>
  );
}
