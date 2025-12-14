import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';

export const InputFilLabelled = ({ label, value, onChange, placeholder = '' }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
    <Typography
      sx={{
        fontSize: '15px',
        fontFamily: 'Roboto, Arial, sans-serif',
        fontWeight: 500,
        color: '#1A1A1A',
        mb: '4px',
      }}
    >
      {label}
    </Typography>

    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputLabelProps={{ shrink: false }}
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: '15px',
          fontFamily: 'Roboto, Arial, sans-serif',
          fontWeight: 400,
          padding: '0px',
          color: '#1A1A1A',
          borderRadius: '8px',
          '& .MuiInputBase-input': {
            // padding: '6px 10px',
            fontSize: '15px',
          },
        },
      }}
    />
  </Box>
);

export const SelectFieldLabelled = ({ label, value, onChange, options = [] }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
    <Typography
      sx={{
        fontSize: '15px',
        fontWeight: 500,
        color: '#000',
        mb: '4px',
      }}
    >
      {label}
    </Typography>

    <TextField
      select
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: '15px',
          fontFamily: 'Roboto, Arial, sans-serif',
          fontWeight: 400,
          padding: '0px',
          color: '#1A1A1A',
          width: '100%',
          borderRadius: '8px',
          backgroundColor: '#fff',
          '& .MuiInputBase-input': {
            // padding: '6px 10px',
            fontSize: '15px',
          },
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

export const ToggleField = ({ label, value, onChange }) => (
  <Box sx={{ display: 'flex', mb: 2, alignItems: 'center', gap: '20px' }}>
    <Typography
      sx={{
        fontSize: '16px',
        fontFamily: 'Roboto, Arial, sans-serif',
        fontWeight: 400,
        color: '#1A1A1A',
        mb: '4px',
      }}
    >
      {label}
    </Typography>

    <Box
      sx={{
        display: 'flex',
        width: 'fit-content',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #2260BC',
      }}
    >
      <Button
        onClick={() => onChange('yes')}
        sx={{
          fontSize: '15px',
          fontFamily: 'Roboto, Arial, sans-serif',
          fontWeight: 400,
          textTransform: 'none',
          backgroundColor: value === 'yes' ? '#2260BC' : '#fff',
          color: value === 'yes' ? '#fff' : '#1A1A1A',
          borderRadius: 0,
          px: 2,
          py: 0.5,
          '&:hover': {
            backgroundColor: value === 'yes' ? '#1565C0' : '#f0f0f0',
          },
        }}
      >
        Да
      </Button>
      <Button
        onClick={() => onChange('no')}
        sx={{
          fontSize: '15px',
          fontFamily: 'Roboto, Arial, sans-serif',
          fontWeight: 400,
          textTransform: 'none',
          backgroundColor: value === 'no' ? '#2260BC' : '#fff',
          color: value === 'no' ? '#fff' : '#1A1A1A',
          borderRadius: 0,
          px: 2,
          py: 0.5,
          '&:hover': {
            backgroundColor: value === 'no' ? '#1565C0' : '#f0f0f0',
          },
        }}
      >
        Нет
      </Button>
    </Box>
  </Box>
);

export const CheckboxField = ({ label, checked, onChange }) => (
  <Box>
    <FormControlLabel
      sx={{
        m: '0 !important',
        '& .MuiFormControlLabel-label': {
          m: '0 !important',
        },
      }}
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 26,
              margin: 0,
            },
          }}
        />
      }
      label={
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Roboto, Arial, sans-serif',
            fontWeight: 400,
            color: '#1A1A1A',
          }}
        >
          {label}
        </Typography>
      }
    />
  </Box>
);

export const StyledButton = ({ variant = 'contained', type = 'button', text, onClick }) => (
  <Button
    variant={variant}
    type={type}
    sx={{
      fontSize: '16px',
      fontWeight: '400',
      width: 'auto',
      textTransform: 'none',
      padding: '4px 30px',
      borderRadius: '8px',
    }}
    onClick={onClick}
  >
    {text}
  </Button>
);
