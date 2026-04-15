import React from 'react';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const LANGUAGES = [
  { code: 'ru', label: 'Рус' },
  { code: 'kaz', label: 'Kaz' },
  { code: 'en', label: 'Eng' },
];

export default function LanguageSwitcher({ value = 'ru', onChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const current = LANGUAGES.find((l) => l.code === value) || LANGUAGES[0];

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (lang) => {
    handleClose();
    onChange && onChange(lang.code);
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          px: 2,
          py: 1,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 400,
          }}
        >
          {current.label}
        </Typography>

        <KeyboardArrowDownIcon fontSize="small" />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 120,
          },

          '&:hover': {
            backgroundColor: '#FFF',
          },
        }}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={lang.code === value}
            onClick={() => handleSelect(lang)}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
