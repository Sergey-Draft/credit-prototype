import React from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';

export default function RoundedSelect({ label, labelId, name, ...props }) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        name={name}
        {...props}
        sx={{
          borderRadius: '20px',
          backgroundColor: '#fff',
          '& .MuiSelect-select': {
            padding: '8px 14px',
          },
          '& .MuiInputLabel-root': {
            left: 14,
            top: 12,
          },
          '& .MuiInputLabel-shrink': {
            transform: 'translate(0, -18px) scale(0.75)',
          },
          minWidth: '200px',
        }}
      />
    </FormControl>
  );
}
