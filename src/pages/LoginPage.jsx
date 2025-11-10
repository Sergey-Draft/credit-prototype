import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../RTK/userSlice';
import { users } from '../mocks/handlers';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  // Если пользователь уже авторизован, перенаправляем на dashboard
  useEffect(() => {
    if (token || localStorage.getItem('token')) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [token, navigate, location]);
  console.log('redux user', users);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      console.log('redux', data);
      dispatch(loginSuccess(data));
      // Редирект на страницу, с которой пришли, или на dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <div style={{ position: 'fixed' }}>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>

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
            <TextField
              fullWidth
              label="Личный номер"
              name="personal_number"
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Пароль"
              name="password"
              type="password"
              margin="normal"
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
    </>
  );
}
