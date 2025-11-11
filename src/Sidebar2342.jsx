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

  const userData = useSelector((state) => state.user);

  const menuItems = [
    { label: 'Главная', path: '/dashboard' },
    { label: 'Поиск кредитов', path: '/search' },
    { label: 'Мои кредиты', path: '/loans' },
    { label: 'История обращений', path: '/history' },
    { label: 'Персональные данные', path: '/profile' },
  ];

  return (
    <Box className="sidebar">
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar
          sx={{
            width: 56,
            height: 56,
            mx: 'auto',
            bgcolor: '#FE8A7D',
            fontWeight: 600,
          }}
        >
          {userData?.user?.fullName?.[0] || userData?.user?.email?.[0] || 'А'}
        </Avatar>
        <Typography variant="subtitle1" sx={{ mt: 1, color: '#fff', fontWeight: 500 }}>
          {userData?.user?.fullName || userData?.user?.email || 'Пользователь'}
        </Typography>
      </Box>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.path}
                className={isActive ? 'active' : ''}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      </nav>

      <Divider sx={{ my: 2, bgcolor: '#3a3a3a' }} />
    </Box>
  );
}
