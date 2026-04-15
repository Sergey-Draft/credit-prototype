import React, { useState } from 'react';
import { Container, Box, Typography, Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, saveUser } from '../../RTK/userSlice';
import { authApi } from '../api/endpoints';
import { debugLog } from '../../utils/debug/debugLog';
import { InputFilLabelled, StyledButton } from '../components/ReusableInputs/MainAppStyledElements';
import { CREDIT_KEY } from '../constants/constants';

// TODO: username change to personal_number

export default function LoginPage() {
  const [form, setForm] = useState({ username: '30110900211442', password: '30110900211442' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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
      localStorage.removeItem(CREDIT_KEY);
      dispatch(loginSuccess(res.data));
      const user = await authApi.getMe();
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
      <Box
        sx={{
          p: '34px 50px',
          bgcolor: 'white',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '460px',
        }}
      >
        <Box sx={{ fontSize: '24px', fontWeight: 400 }}>Вход</Box>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              mt: '30px',
            }}
          >
            <InputFilLabelled
              fullWidth
              label="Личный номер"
              name="username"
              value={form.username}
              onChange={handleChange}
              labelSx={{ fontWeight: 400 }}
              fieldSx={{ mb: 3 }}
            />
            <InputFilLabelled
              fullWidth
              label="Пароль"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              labelSx={{ fontWeight: 400 }}
              showVisibilityToggle
            />
            <Box
              sx={{
                fontSize: '16px',
                fontWeight: 400,
                display: 'flex',
                justifyContent: 'flex-end',
                m: '25px 0',
              }}
            >
              Забыли пароль?
            </Box>
            <StyledButton variant="contained" text="Войти" type="submit" sx={{ width: '100%' }} />
            {message && (
              <Typography color="error" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
          </Box>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Box sx={{ fontSize: '16px', fontWeight: 400 }}>
            Нет аккаунта?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/register')}
              sx={{
                textDecoration: 'none',
                color: '#2260BC',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              Зарегистрироваться
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
