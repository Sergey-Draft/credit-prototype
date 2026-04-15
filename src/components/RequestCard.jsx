import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { loanTypeMap, RequestStatusMap, securedOptionsMap } from '../../utils/SelectEnumes';
import { formatDuration } from '../../utils/format';

export default function RequestCard({ request, onSign }) {
  const status = RequestStatusMap[request?.status] || {
    label: 'Неизвестен',
    color: '#7F7F7F',
  };

  return (
    <Box
      component="div"
      onClick={() => onSign?.(request)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="animate__animated animate__fadeIn"
      sx={{
        width: '100%',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #CACACA',
        px: 3,
        py: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          minWidth: '260px',
          width: 'auto',
          maxWidth: '100%',
        }}
      >
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
            src="/bank-logos/credit_progress.png"
            alt="bank-logo"
            style={{
              width: '70%',
              height: '70%',
              objectFit: 'contain',
            }}
          />
        </Box>

        <Box>
          <Typography fontSize={15} fontWeight={400}>
            {loanTypeMap[request.loanType] || 'Потребительский кредит'}
          </Typography>
          <Typography fontSize={14} color="#7F7F7F">
            {request.requestDate}
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

        {request.amount ? (
          <Metric label="Сумма" value={`${request.amount.toLocaleString()} BYN`} />
        ) : (
          <Metric label="Сумма" value="неизвестно" />
        )}
        {request.term && <Metric label="Срок" value={formatDuration(request.term)} />}
        {request.secured && (
          <Metric label="Тип обеспечения" value={securedOptionsMap[request.secured]} />
        )}
      </Box>

      <Box sx={{ textAlign: 'right', minWidth: 180 }}>
        <Typography
          sx={{
            color: status?.color,
            fontWeight: 500,
            fontSize: 18,
            lineHeight: 1.2,
            pr: '10px',
          }}
        >
          {status?.label}
        </Typography>
      </Box>
    </Box>
  );
}

const Metric = ({ label, value }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Typography fontWeight={600}>{value}</Typography>
    <Typography fontSize={14} fontWeight={400} color="#7F7F7F">
      {label}
    </Typography>
  </Box>
);
