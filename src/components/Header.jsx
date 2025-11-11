import { Box, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../RTK/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box className="header">
      <Button
        variant="text"
        color="error"
        onClick={handleLogout}
        sx={{ mt: 'auto', color: '#fe8a7d', fontWeight: 500, float: 'right' }}
      >
        Выйти
      </Button>
    </Box>
  );
};

export default Header;
