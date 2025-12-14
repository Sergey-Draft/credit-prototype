import React from 'react';
import { Box, Button, Typography, Divider } from '@mui/material';

const statusMap = {
  processing: {
    label: 'В обработке',
    color: '#007bff',
  },
  awaiting_signature: {
    label: 'Ожидает подписания договора',
    color: '#fe8a7d',
  },
  approved: {
    label: 'Обработан',
    color: '#28a745',
  },
  rejected: {
    label: 'Отказано',
    color: '#ff4f79',
  },
};

export default function LoanRequestCard({ request, onSign }) {
  const status = statusMap[request?.status];

  return (
    <Box
      component="div"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        width: '100%',
        background: '#fff',
        borderRadius: '4px',
        px: 3,
        py: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        boxShadow: '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 220 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}
        >
          <img
            src={
              request.status !== 'awaiting_signature'
                ? '/bank-logos/credit_progress.png'
                : request.bankLogo
            }
            alt="bank-logo"
            style={{
              width: '70%',
              height: '70%',
              objectFit: 'contain',
            }}
          />
        </Box>

        <Box>
          <Typography fontSize={15} fontWeight={500}>
            {request.type || 'Потребительский кредит'}
          </Typography>
          <Typography fontSize={12} color="gray">
            {request.date}
          </Typography>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {request.rate && <Metric label="Ставка" value={`${request.rate}%`} />}

        {request.payment && <Metric label="Платёж" value={`${request.payment} BYN`} />}

        <Metric label="Сумма" value={`${request.amount.toLocaleString()} BYN`} />
        <Metric label="Срок" value={`${request.term} месяцев`} />
      </Box>

      <Box sx={{ textAlign: 'right', minWidth: 180 }}>
        <Typography
          sx={{
            color: status.color,
            // fontWeight: 600,
            fontSize: 16,
            lineHeight: 1.2,
          }}
        >
          {status.label}
        </Typography>

        {request.status === 'awaiting_signature' && (
          <Button
            variant="contained"
            sx={{
              mt: 1,
              borderRadius: '20px',
              textTransform: 'none',
            }}
            onClick={() => onSign?.(request)}
          >
            Подписать договор
          </Button>
        )}
      </Box>
    </Box>
  );
}

const Metric = ({ label, value }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Typography fontWeight={600}>{value}</Typography>
    <Typography fontSize={12} color="gray">
      {label}
    </Typography>
  </Box>
);
