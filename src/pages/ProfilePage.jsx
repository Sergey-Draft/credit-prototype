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
  FormControl,
  FormLabel,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { loginSuccess } from '../../RTK/userSlice';
import AvatarUploader from '../components/AavatarUploader';

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
    birdthDate: userData?.birdthDate || '',
    city: userData?.city || '',
    country: userData?.country || '',
    pinfl: userData?.country || '1234567890',
    passport: userData?.passport || 'MP1234567890',
    issueDate: userData?.issueDate || '12 12 2020',
    expiredDate: userData?.expiredDate || '12 12 2025',
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
      birdthDate: userData?.birdthDate || '',
      city: userData?.city || '',
      country: userData?.country || '',
      pinfl: userData?.country || '1234567890',
      passport: userData?.passport || 'MP1234567890',
      issueDate: userData?.issueDate || '12 12 2020',
      expiredDate: userData?.expiredDate || '12 12 2025',
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
    <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Личный кабинет
          </Typography>
          {/* <Typography variant="body1" color="text.secondary">
            Управление вашими личными данными
          </Typography> */}
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

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <Grid container spacing={3} sx={{ flexDirection: 'column', width: '40%' }}>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>ФИО</FormLabel>
                <TextField
                  fullWidth
                  name="fullName"
                  size="small"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>Дата рождения</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="birdthDate"
                  type="date"
                  value={formData.birdthDate}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>Мобильный телефон</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>Email</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>Адрес регистрации</FormLabel>
                <TextField
                  fullWidth
                  name="address"
                  size="small"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>Город</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="city"
                  type="tel"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>Страна</FormLabel>
                <TextField
                  fullWidth
                  name="country"
                  size="small"
                  type="tel"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            sx={{ flexDirection: 'column', width: '35%', alignItems: 'center' }}
          >
            <div>
              <AvatarUploader />
            </div>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>ПИНФЛ</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="personal_number"
                  value={formData.pinfl}
                  onChange={handleChange}
                  disabled
                  sx={{
                    '& .MuiInputBase-input': {
                      bgcolor: isEditing ? 'background.paper' : 'action.disabledBackground',
                    },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>Паспорт</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="personal_number"
                  value={formData.passport}
                  onChange={handleChange}
                  disabled
                  sx={{
                    '& .MuiInputBase-input': {
                      bgcolor: isEditing ? 'background.paper' : 'action.disabledBackground',
                    },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>Дата выдачи</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="personal_number"
                  value={formData.issueDate}
                  onChange={handleChange}
                  disabled
                  sx={{
                    '& .MuiInputBase-input': {
                      bgcolor: isEditing ? 'background.paper' : 'action.disabledBackground',
                    },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>Срок действия</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="personal_number"
                  value={formData.expiredDate}
                  onChange={handleChange}
                  disabled
                  sx={{
                    '& .MuiInputBase-input': {
                      bgcolor: isEditing ? 'background.paper' : 'action.disabledBackground',
                    },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <FormLabel sx={{ width: 180 }}>Дата регистрации</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="personal_number"
                  value={formData.registerDate}
                  onChange={handleChange}
                  disabled
                  sx={{
                    '& .MuiInputBase-input': {
                      bgcolor: isEditing ? 'background.paper' : 'action.disabledBackground',
                    },
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Безопасность
            </Typography>
            <Button variant="outlined" onClick={handleChangePassword} sx={{ mt: 2 }}>
              Изменить пароль
            </Button>
          </Box>
          <Box>
            {/* <Typography variant="h6" fontWeight="bold">
            Основная информация
          </Typography> */}
            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
              >
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
        </Box>
      </Box>
    </Paper>
  );
}
