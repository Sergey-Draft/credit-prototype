import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, CreditCard, User } from 'feather-icons-react';
import CalculateIcon from '@mui/icons-material/Calculate';
import { logout } from '../../RTK/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { label: 'Главная', path: '/dashboard', icon: <Home size={16} /> },
    { label: 'Мои кредиты', path: '/loans', icon: <CreditCard size={16} /> },
    {
      label: 'Кредитный калькулятор',
      path: '/calculator',
      icon: <CalculateIcon fontSize="16px" />,
    },
    { label: 'Личный кабинет', path: '/profile', icon: <User size={16} /> },
  ];

  const extraMenu = [
    { label: 'API', path: '/api-buttons', icon: <User size={16} /> },
    { label: 'Техподдержка', path: '/support', icon: <User size={16} /> },
    { label: 'История обращений', path: '/history', icon: <CreditCard size={16} /> },
    // { label: 'Документы', path: '/docs', icon: <User size={16} /> },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleCloseMore();
    navigate(path);
  };

  return (
    <Box className="header" sx={{ width: '100%' }}>
      <Box
        sx={{
          maxWidth: '1440px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 auto',
          padding: '0 60px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', width: '10%' }}>
          <img
            src="/FinLogo/FinMarketPlace-blue.png"
            alt="Logo"
            style={{ fontSize: '26px', height: 'auto' }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Button
                variant="text"
                sx={{
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  letterSpacing: '0.02em',
                }}
                key={item.path}
                onClick={() => navigate(item.path)}
                // startIcon={item.icon}
                // className={isActive ? 'active' : ''}
              >
                {item.label}
              </Button>
            );
          })}

          <Button
            variant="text"
            onClick={handleOpenMore}
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '0.02em',
            }}
          >
            Ещё
          </Button>

          {/* Выпадающее Меню */}
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMore}>
            {extraMenu.map((item) => (
              <MenuItem key={item.path} onClick={() => handleNavigate(item.path)}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Button
          variant="text"
          color="error"
          onClick={handleLogout}
          sx={{
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            letterSpacing: '0.02em',
          }}
        >
          Выйти
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
