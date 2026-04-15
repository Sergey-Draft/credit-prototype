import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { CreditCard, User } from 'feather-icons-react';
import CalculateIcon from '@mui/icons-material/Calculate';
import { logout } from '../../RTK/userSlice';
import UserMenu from './UserMenu';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const [lang, setLang] = React.useState('ru');

  const menuItems = [
    { label: 'Мои кредиты', path: '/loans', icon: <CreditCard size={16} /> },
    {
      label: 'Кредитный калькулятор',
      path: '/calculator',
      icon: <CalculateIcon fontSize="16px" />,
    },
    { label: 'Вопрос-ответ', path: '/support', icon: <User size={16} /> },
    { label: 'История запросов', path: '/history', icon: <User size={16} /> },
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
        <Box
          component={RouterLink}
          to="/dashboard"
          sx={{ display: 'flex', alignItems: 'center', gap: '10px', width: '10%' }}
        >
          <img
            src="/FinLogo/FinMarketPlace.svg"
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

          {/* <Button
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
          </Button> */}

          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMore}>
            {extraMenu.map((item) => (
              <MenuItem key={item.path} onClick={() => handleNavigate(item.path)}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 4,
          }}
        >
          <UserMenu
            userName="Мирафзал"
            onProfile={() => navigate('/profile')}
            onLogout={() => handleLogout()}
          />
          <LanguageSwitcher value={lang} onChange={setLang} />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
