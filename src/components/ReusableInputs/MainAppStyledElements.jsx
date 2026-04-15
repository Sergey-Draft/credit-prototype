import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ru } from 'date-fns/locale';

export const InputFilLabelled = ({
  type = '',
  pattern = '',
  label,
  value,
  onChange,
  placeholder = '',
  multiline = false,
  rows = '',
  disabled = false,
  name = 'defaultInput',
  labelSx = {},
  fieldSx = {},
  rootSx = {},
  readOnly = false,
  InputProps,
  error = false,
  showVisibilityToggle = false, // show / hide password for type = password
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const inputType =
    showVisibilityToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', ...rootSx }}>
      <Typography
        sx={{
          fontSize: '15px',
          fontFamily: 'Roboto, Arial, sans-serif',
          fontWeight: 500,
          color: '#1A1A1A',
          mb: '4px',
          ...labelSx,
        }}
      >
        {label}
      </Typography>

      <TextField
        fullWidth
        multiline={multiline}
        rows={rows}
        type={inputType}
        variant="outlined"
        placeholder={placeholder}
        value={value}
        pattern={pattern}
        name={name}
        onChange={onChange}
        disabled={disabled}
        error={error}
        InputLabelProps={{ shrink: false }}
        slotProps={{
          input: {
            readOnly,
            ...(showVisibilityToggle &&
              type === 'password' && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="small"
                      sx={{ mr: 0.5 }}
                      disabled={disabled}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }),
            ...InputProps,
          },
        }}
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
            '& .MuiInputBase-inputMultiline': {
              padding: '10px 12px',
              lineHeight: '1.4',
            },
          },
          ...fieldSx,
        }}
      />
    </Box>
  );
};

export const SelectFieldLabelled = ({
  label,
  value,
  onChange,
  name = 'default',
  options = [],
  readOnly = false,
  error = false,
  fieldSx = {},
  rootSx = {},
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2, ...rootSx }}>
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
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      size="small"
      slotProps={{
        input: {
          readOnly,
        },
      }}
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
        ...fieldSx,
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
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
        onClick={() => onChange(true)}
        sx={{
          fontSize: '15px',
          fontFamily: 'Roboto, Arial, sans-serif',
          fontWeight: 400,
          textTransform: 'none',
          backgroundColor: value === true ? '#2260BC' : '#fff',
          color: value === true ? '#fff' : '#1A1A1A',
          borderRadius: 0,
          px: 2,
          py: 0.5,
          '&:hover': {
            backgroundColor: value === true ? '#1565C0' : '#f0f0f0',
          },
        }}
      >
        Да
      </Button>
      <Button
        onClick={() => onChange(false)}
        sx={{
          fontSize: '15px',
          fontFamily: 'Roboto, Arial, sans-serif',
          fontWeight: 400,
          textTransform: 'none',
          backgroundColor: value === false ? '#2260BC' : '#fff',
          color: value === false ? '#fff' : '#1A1A1A',
          borderRadius: 0,
          px: 2,
          py: 0.5,
          '&:hover': {
            backgroundColor: value === false ? '#1565C0' : '#f0f0f0',
          },
        }}
      >
        Нет
      </Button>
    </Box>
  </Box>
);

export const CheckboxField = ({ label, checked, onChange, chekboxSX, labelSx }) => (
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
            color: '#CACACA',
            ...chekboxSX,
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
            ...labelSx,
          }}
        >
          {label}
        </Typography>
      }
    />
  </Box>
);

export const StyledButton = ({
  variant = 'contained',
  type = 'button',
  text,
  onClick,
  sx = {},
  disabled = false,
  loading = false,
}) => (
  <Button
    variant={variant}
    type={type}
    disabled={disabled}
    loading={loading}
    sx={{
      fontSize: '16px',
      fontWeight: '400',
      width: 'auto',
      textTransform: 'none',
      padding: '4px 30px',
      borderRadius: '8px',
      ...sx,
    }}
    onClick={onClick}
  >
    {text}
  </Button>
);

export const SimpleDateRangePicker = ({
  label,
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  placeholderStart = 'дд.мм.гггг',
  placeholderEnd = 'дд.мм.гггг',
  disabled = false,
}) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
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

      <Stack direction="row" spacing={2} alignItems="center">
        {/* Дата начала */}
        <Box sx={{ flex: 1 }}>
          <DatePicker
            value={startValue}
            onChange={onStartChange}
            disabled={disabled}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                placeholder: placeholderStart,
                size: 'small',
              },
              openPickerButton: {
                sx: {
                  color: '#123B79',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#2260BC',
                  },
                },
              },
              popper: {
                sx: {
                  '& .MuiPaper-root': {
                    borderRadius: '8px !important',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                  },
                  '& .MuiPickersDay-root': {
                    '&.Mui-selected': {
                      backgroundColor: '#2260BC',
                      '&:hover': {
                        backgroundColor: '#1a4d9a',
                      },
                    },
                  },
                },
              },
            }}
            format="dd.MM.yyyy"
            localeText={{
              fieldDayPlaceholder: () => 'дд',
              fieldMonthPlaceholder: () => 'мм',
              fieldYearPlaceholder: () => 'гггг',
            }}
          />
        </Box>

        <Typography
          sx={{
            color: '#666',
            fontSize: '15px',
            fontWeight: 400,
            flexShrink: 0,
          }}
        >
          –
        </Typography>

        {/* Дата окончания */}
        <Box sx={{ flex: 1 }}>
          <DatePicker
            value={endValue}
            onChange={onEndChange}
            disabled={disabled}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                placeholder: placeholderEnd,
                size: 'small',
                sx: {
                  '& .MuiOutlinedInput-root': {
                    fontSize: '15px',
                    fontFamily: 'Roboto, Arial, sans-serif',
                    fontWeight: 400,
                    padding: '0px',
                    color: '#1A1A1A',
                    borderRadius: '8px !important',
                    '& .MuiInputBase-input': {
                      fontSize: '15px',
                      padding: '8.5px 14px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4',
                      borderRadius: '8px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#000',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2260BC',
                      borderWidth: '1px',
                    },
                  },
                },
              },
              openPickerButton: {
                sx: {
                  color: '#123B79',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#2260BC',
                  },
                },
              },
            }}
            format="dd.MM.yyyy"
            localeText={{
              fieldDayPlaceholder: () => 'дд',
              fieldMonthPlaceholder: () => 'мм',
              fieldYearPlaceholder: () => 'гггг',
            }}
          />
        </Box>
      </Stack>
    </Box>
  </LocalizationProvider>
);
