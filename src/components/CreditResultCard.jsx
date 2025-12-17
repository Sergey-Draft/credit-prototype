import React from 'react';
import { Box, Button, Typography, Divider, Checkbox } from '@mui/material';
import { StyledButton } from './ReusableInputs/MainAppStyledElements';

export default function CreditResultCard({ item, selected, onSelect, onSign }) {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        background: '#fff',
        borderRadius: '4px',
        padding: '24px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        border: selected ? '1px solid #2260BC' : '1px solid #E0E0E0',
        boxShadow: selected ? '0px 2px 6px rgba(34,96,188,0.25)' : '0px 1px 3px rgba(0,0,0,0.12)',
      }}
    >
      {/* CHECKBOX + LOGO + TITLE */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Checkbox
          checked={selected}
          onChange={onSelect}
          onClick={(e) => e.stopPropagation()}
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
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
              src={item.logo}
              alt={item.bank}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Box>
            <Typography fontSize={16} fontWeight={400}>
              {item.type || 'Потребительский кредит'}
            </Typography>
            <Typography fontSize={14} fontWeight={400} color="#7F7F7F">
              {item.bank}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* METRICS */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0px 20px',
          }}
        >
          <Metric label="Ставка" value={`${item.rate}%`} />
          <Metric label="Платеж" value={`${item.payment} BYN`} />
          <Metric label="Сумма" value={`${item.amount.toLocaleString()}`} />
          <Metric label="Срок" value={item.term} sx={{ fontWeight: '500', fontSize: '20px' }} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {item.tags?.map((tag) => (
            <Box
              key={tag}
              sx={{
                backgroundColor: '#F1F0FF',
                px: '20px',
                py: '12px',
                borderRadius: '30px',
                fontSize: 14,
                fontWeight: '400',
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      </Box>

      {/* ACTIONS */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          gap: 1,
        }}
      >
        <StyledButton onClick={() => onSign?.(item)} text="Подписать договор" type="button" />

        <Typography
          sx={{
            fontSize: 15,
            color: '#2260BC',
            cursor: 'pointer',
          }}
        >
          Условия
        </Typography>
      </Box>
    </Box>
  );
}

const Metric = ({ label, value }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Typography fontWeight={500} fontSize={20} lineHeight={1.3}>
      {value}
    </Typography>
    <Typography fontSize={14} color="#7F7F7F">
      {label}
    </Typography>
  </Box>
);
