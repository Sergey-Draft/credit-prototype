import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, saveUser } from '../../RTK/userSlice';
import { authApi } from '../api/endpoints';
import { debugLog } from '../../utils/debug/debugLog';

// TODO: username change to personal_number

export default function LoginPage() {
  const [form, setForm] = useState({ username: 'test', password: 'test' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const tokenLS = useSelector((state) => state.user.accessToken);

  // Если пользователь уже авторизован, перенаправляем на dashboard
  // useEffect(() => {
  //   if (localStorage.getItem('accessToken')) {
  //     const from = location.state?.from?.pathname || '/dashboard';
  //     navigate(from, { replace: true });
  //   }
  // }, [tokenLS, navigate, location]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.auth(form);
      const { accessToken, refreshToken } = res.data;
      debugLog('res', res);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(loginSuccess(res.data));
      const user = await authApi.getMe();
      console.log('responseMe', user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user.data));
        dispatch(saveUser(user.data));
      }
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setMessage(err?.response?.data?.message || err.message || 'Ошибка входа');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 4, bgcolor: 'white', boxShadow: 3, borderRadius: 3, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Вход
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* <TextField
              fullWidth
              label="Личный номер"
              name="personal_number"
              margin="normal"
              onChange={handleChange}
            /> */}
          <TextField
            fullWidth
            label="Личный номер"
            name="username"
            margin="normal"
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Пароль"
            name="password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
            Войти
          </Button>
          {message && (
            <Typography color="error" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Нет аккаунта?{' '}
            <Link component="button" variant="body2" onClick={() => navigate('/register')}>
              Зарегистрироваться
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
