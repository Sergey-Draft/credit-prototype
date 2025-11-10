import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  Alert,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { loginSuccess } from '../../RTK/userSlice';

const getUserData = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export default function ProfilePage() {
  const dispatch = useDispatch();
  const userData = getUserData();
  console.log('userData', userData);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    personal_number: userData?.personal_number || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    address: userData?.address || 'г. Минск, ул. Победителей, 10',
    fullName: userData?.fullName || 'Александр Иванов',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...userData.user,
      ...formData,
    };

    dispatch(
      loginSuccess({
        user: updatedUser,
        token: userData.token,
      }),
      localStorage.setItem('user', JSON.stringify(updatedUser)),
    );

    setMessage({ type: 'success', text: 'Данные успешно сохранены!' });
    setIsEditing(false);

    // Очистить сообщение через 3 секунды
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  const handleCancel = () => {
    setFormData({
      personal_number: userData?.personal_number || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      address: userData?.address || 'г. Минск, ул. Победителей, 10',
      fullName: userData?.fullName || 'Александр Иванов',
    });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const handleChangePassword = () => {
    setMessage({ type: 'info', text: 'Функция смены пароля будет добавлена позже' });
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Персональные данные
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Управление вашими личными данными
        </Typography>
      </Box>

      {message.text && (
        <Alert
          severity={
            message.type === 'success' ? 'success' : message.type === 'error' ? 'error' : 'info'
          }
          sx={{ mb: 3 }}
          onClose={() => setMessage({ type: '', text: '' })}
        >
          {message.text}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Основная информация
          </Typography>
          {!isEditing ? (
            <Button variant="contained" startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>
              Редактировать
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Сохранить
              </Button>
              <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleCancel}>
                Отмена
              </Button>
            </Box>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Личный номер"
              name="personal_number"
              value={formData.personal_number}
              onChange={handleChange}
              disabled
              helperText="Личный номер нельзя изменить"
              sx={{
                '& .MuiInputBase-input': {
                  bgcolor: isEditing ? 'background.paper' : 'action.disabledBackground',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ФИО"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Телефон"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Адрес регистрации"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Безопасность
          </Typography>
          <Button variant="outlined" onClick={handleChangePassword} sx={{ mt: 2 }}>
            Изменить пароль
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
