import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authApi } from '../api/endpoints';
import { loginSuccess } from '../../RTK/userSlice';
import LocalSnackbar from '../components/Snackbar';
import Loader from '../components/Loader';
import MessageModal from '../components/MessageModal';
import { InputFilLabelled, StyledButton } from '../components/ReusableInputs/MainAppStyledElements';
import SimpleModal from '../components/SimpleModal';

export default function RegisterPage() {
  // const [form, setForm] = useState({
  //   personal_number: '',
  //   phone: '',
  //   email: '',
  //   password: '',
  //   fszn: false,
  //   dataProcessing: false,
  // });

  const [form, setForm] = useState({
    email: '',
    phone: '',
    username: '',
    password: '',
    fund: false,
    agreement: false,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validatePhone = (phone) => {
    phone = phone.replace(/[^\d+]/g, '');

    if (!phone.startsWith('+')) {
      phone = `+${phone.replace(/\+/g, '')}`;
    }

    return phone;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'tel') {
      const cleanedPhone = validatePhone(value);
      setForm((prev) => ({ ...prev, [name]: cleanedPhone }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validateUsername = (username) => {
    if (username.length !== 14) {
      return 'Личный номер (Имя) должен содержать 14 символов';
    }
    if (!/^\d{14}$/.test(username)) {
      return 'Личный номер (Имя) должен состоять только из цифр';
    }

    const birth = username.slice(1, 7);
    const dd = +birth.slice(0, 2);
    const mm = +birth.slice(2, 4);

    if (dd < 1 || dd > 31 || mm < 1 || mm > 12) {
      return 'Некорректная дата рождения в личном номере ( 2-8 цифры ddmmyy)';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Валидация
    if (!form.username || !form.phone || !form.password || !form.email) {
      setMessage('Пожалуйста, заполните обязательные поля');
      return;
    }

    const usernameError = validateUsername(form.username);
    if (usernameError) {
      setMessage(usernameError);
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await authApi.register(form);
      setLoading(false);
      setOpen(true);
      // setRequestMessage(response.data);
      setRequestMessage('Регистрация прошла успешно');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setLoading(false);
      setRequestMessage(
        `❌ Ошибка при регистрации. Попробуйте еще раз. / ${err?.response?.data?.message}`,
      );
      setOpen(true);
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
          p: '34px 60px',
          bgcolor: 'white',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '480px',
        }}
      >
        <Loader loading={loading} text="" />

        <SimpleModal open={open} onClose={() => setOpen(false)} title="Ответ сервера">
          <pre>{JSON.stringify(requestMessage, null, 2)}</pre>
        </SimpleModal>

        <Box sx={{ fontSize: '24px', fontWeight: 400 }}>Регистрация</Box>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              mt: '24px',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <InputFilLabelled
                label="Личный номер"
                name="username"
                value={form.username}
                onChange={handleChange}
                labelSx={{ fontWeight: 400 }}
              />

              <InputFilLabelled
                label="Телефон"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                pattern="^\\+?[0-9]*$"
                labelSx={{ fontWeight: 400 }}
              />

              <InputFilLabelled
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                labelSx={{ fontWeight: 400 }}
              />

              <InputFilLabelled
                label="Пароль"
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                labelSx={{ fontWeight: 400 }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                fontSize: '14px',
                mt: '20px',
              }}
            >
              <FormControlLabel
                control={<Checkbox name="fund" checked={form.fund} onChange={handleChange} />}
                label="Согласие на получение данных из ФСЗН"
                sx={{
                  margin: 0,
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                  },
                  '& .MuiCheckbox-root': {
                    padding: '4px 0',
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox name="agreement" checked={form.agreement} onChange={handleChange} />
                }
                label="Согласие на обработку персональных данных"
                sx={{
                  margin: 0,
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                  },
                  '& .MuiCheckbox-root': {
                    padding: '4px 0',
                  },
                }}
              />
            </Box>

            <StyledButton
              variant="contained"
              text="Зарегистрироваться"
              type="submit"
              sx={{ width: '100%', mt: '30px' }}
            />

            {message && (
              <Typography color={message.includes('успешна') ? 'green' : 'error'} sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Box sx={{ fontSize: '16px', fontWeight: 400 }}>
                Уже есть аккаунт?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/login')}
                  sx={{
                    textDecoration: 'none',
                    color: '#2260BC',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  Войти
                </Link>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
