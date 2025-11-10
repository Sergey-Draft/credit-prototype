import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import { logout } from '../RTK/userSlice';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { label: 'Главная', path: '/dashboard' },
    { label: 'Поиск кредитов', path: '/search' },
    { label: 'Мои кредиты', path: '/loans' },
    { label: 'История обращений', path: '/history' },
    { label: 'Персональные данные', path: '/profile' },
  ];

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        bgcolor: '#f9fafb',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        p: 2,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Avatar sx={{ width: 56, height: 56, mx: 'auto', bgcolor: '#1976d2' }}>
          {userData?.user?.fullName?.[0] || userData?.user?.email?.[0] || 'А'}
        </Avatar>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {userData?.user?.fullName || userData?.user?.email || 'Пользователь'}
        </Typography>
      </Box>

      {/* Меню */}
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&.Mui-selected': {
                bgcolor: '#1976d2',
                color: 'white',
                '&:hover': { bgcolor: '#1565c0' },
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Выход */}
      <Button variant="text" color="error" onClick={handleLogout}>
        Выйти
      </Button>
    </Box>
  );
}
