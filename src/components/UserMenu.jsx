import React from 'react';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import getUserData from '../../utils/getUserData';

export default function UserMenu({ onProfile, onLogout }) {
  const user = getUserData();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          px: 3,
          py: 1,
          borderRadius: '20px',
          border: '1px solid #E4E4E4',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'background-color 0.2s',
          fontWeight: 500,
          fontSize: '15px',

          '&:hover': {
            backgroundColor: '#F1F0FF',
            border: '1px solid #B5AFFF',
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '15px',
            whiteSpace: 'nowrap',
          }}
        >
          Добрый день, {user.username || user.firstName || 'Пользователь'}
        </Typography>
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
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onProfile && onProfile();
          }}
        >
          Личный кабинет
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            onLogout && onLogout();
          }}
        >
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
}
