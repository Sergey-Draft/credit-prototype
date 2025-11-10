import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
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

export default function RegisterPage() {
  const [form, setForm] = useState({
    personal_number: '',
    phone: '',
    email: '',
    fszn: false,
    dataProcessing: false,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!form.personal_number || !form.phone || !form.password || !form.passport) {
    //   setMessage('Пожалуйста, заполните обязательные поля');
    //   console.log(form);
    //   return;
    // }
    console.log(form);
    setLoading(true);
    try {
      await authApi.register(form);
      setTimeout(() => {
        setLoading(false);
        setOpen(true);
        setRequestMessage(
          <>
            Регистрация прошла успешно!{' '}
            <Link component="button" variant="body2" onClick={() => navigate('/login')}>
              Войти
            </Link>
          </>,
        );
      }, 1000);
    } catch (err) {
      setLoading(false);
      setRequestMessage(
        `❌ Ошибка при регистрации. Попробуйте еще раз. / ${err?.response?.data?.message}`,
      );
      setOpen(true);
      console.log('ERR', err);
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
          p: 4,
          bgcolor: 'white',
          boxShadow: 3,
          borderRadius: 3,
          width: '100%',
          position: 'relative',
        }}
      >
        <Loader loading={loading} text="" />
        <MessageModal open={open} message={requestMessage} handleClose={() => setOpen(false)} />
        {/* <LocalSnackbar open={true} severity={'error'} message={'hello i am snackbar'} /> */}
        <Typography variant="h5" gutterBottom>
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Личный номер"
            name="personal_number"
            margin="normal"
            type="number"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Телефон"
            name="phone"
            type="tel"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            type="email"
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

          <FormControlLabel
            control={<Checkbox name="fszn" checked={form.fszn} onChange={handleChange} />}
            label="Согласие на получение данных из ФСЗН"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="dataProcessing"
                checked={form.dataProcessing}
                onChange={handleChange}
              />
            }
            label="Согласие на обработку персональных данных"
          />

          <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
            Зарегистрироваться
          </Button>

          {message && (
            <Typography color={message.includes('успешна') ? 'green' : 'error'} sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Уже есть аккаунт?{' '}
              <Link component="button" variant="body2" onClick={() => navigate('/login')}>
                Войти
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
