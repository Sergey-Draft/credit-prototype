import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Home, Search, CreditCard, User } from 'feather-icons-react';
import { Box, Avatar, Typography, Divider, Button } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import { logout } from '../RTK/userSlice';
import LoanCalculator from './pages/CalculatorPage';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((state) => state.user);

  const menuItems = [
    { label: 'Главная', path: '/dashboard', icon: <Home size={16} /> },
    { label: 'Поиск кредитов', path: '/search', icon: <Search size={16} /> },
    { label: 'Мои кредиты', path: '/loans', icon: <CreditCard size={16} /> },
    { label: 'История обращений', path: '/history', icon: <CreditCard size={16} /> },
    { label: 'Персональные данные', path: '/profile', icon: <User size={16} /> },
    {
      label: 'Кредитный калькулятор',
      path: '/calculator',
      icon: <CalculateIcon fontSize="16px" />,
    },
    { label: 'апи', path: '/api-buttons', icon: <User size={16} /> },
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
                {item.icon} {item.label}
              </li>
            );
          })}
        </ul>
      </nav>

      <Divider sx={{ my: 2, bgcolor: '#3a3a3a' }} />
    </Box>
  );
}
