import React, { useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { loginSuccess } from '../../RTK/userSlice';
import { InputFilLabelled } from '../components/ReusableInputs/MainAppStyledElements';
import SimpleModal from '../components/SimpleModal';
import RouterBreadcrumbs from '../components/RouterBreadCrumbs';
import getUserData from '../../utils/getUserData';
import { SimpleformatDate } from '../../utils/format';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const userData = getUserData();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    lastName: userData?.lastName || 'Христорождественская',
    firstName: userData?.firstName || 'Александра',
    middleName: userData?.middleName || 'Варфоломеевна',
    birthDate: userData?.birthDate || '11.04.1989',

    pinfl: userData?.pinfl || '4101234A567B890',
    docNumber: userData?.docNumber || 'BM1234567',
    docIssueDate: userData?.docIssueDate || '11.04.2020',
    docExpireDate: userData?.docExpireDate || '11.04.2030',
    docIssuer: userData?.docIssuer || 'Московский РОВД г.Бреста',

    phone: userData?.phone || '+ 375 (29) 232 -15 -15',
    email: userData?.email || 'khristorozhdestvenskay@gmail.com',
    registerAddress: userData?.registerAddress || 'ул. Октября 11/5, г.Брес',
    residenceAddress: userData?.residenceAddress || 'ул. Октября 11/5, г.Брес',
  });

  const handleDataChange = (e) => {
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
    setIsEditing(false);
    setOpenConfirm(true);
    setTimeout(() => {
      setOpenConfirm(false);
    }, 2000);
  };

  const handleCancel = () => {
    setFormData({
      lastName: userData?.lastName || 'Христорождественская',
      firstName: userData?.firstName || 'Александра',
      middleName: userData?.middleName || 'Варфоломеевна',
      birthDate: userData?.birthDate || '11.04.1989',

      pinfl: userData?.pinfl || '4101234A567B890',
      docNumber: userData?.docNumber || 'BM1234567',
      docIssueDate: userData?.docIssueDate || '11.04.2020',
      docExpireDate: userData?.docExpireDate || '11.04.2030',
      docIssuer: userData?.docIssuer || 'Московский РОВД г.Бреста',

      phone: userData?.phone || '+ 375 (29) 232 -15 -15',
      email: userData?.email || 'khristorozhdestvenskay@gmail.com',
      registerAddress: userData?.registerAddress || 'ул. Октября 11/5, г.Брес',
      residenceAddress: userData?.residenceAddress || 'ул. Октября 11/5, г.Брес',
    });
    setIsEditing(false);
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{ width: '100%', overflow: 'hidden', padding: '80px 60px', position: 'relative' }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '30px',
            left: '60px',
            zIndex: 1,
          }}
        >
          <RouterBreadcrumbs />
        </Box>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Box className="main-title">Личный кабинет</Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box className="block-title"> Личные данные</Box>
            <Box sx={{ display: 'flex', gap: 14, mb: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '30%' }}>
                <InputFilLabelled
                  label="Фамилия"
                  name="lastName"
                  readOnly
                  value={formData.lastName}
                  onChange={handleDataChange}
                  disabled={isEditing}
                />
                <InputFilLabelled
                  label="Имя"
                  name="firstName"
                  readOnly
                  value={formData.firstName}
                  onChange={handleDataChange}
                  disabled={isEditing}
                />
                <InputFilLabelled
                  label="Отчество"
                  name="middleName"
                  readOnly
                  value={formData.middleName}
                  onChange={handleDataChange}
                  disabled={isEditing}
                />
                <InputFilLabelled
                  label="Дата рождения"
                  name="birthDate"
                  readOnly
                  value={SimpleformatDate(formData.birthDate)}
                  onChange={handleDataChange}
                  disabled={isEditing}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '30%' }}>
                <InputFilLabelled
                  label="Личный номер"
                  name="pinfl"
                  readOnly
                  disabled={isEditing}
                  value={formData.pinfl}
                  onChange={handleDataChange}
                />
                <InputFilLabelled
                  label="Номер паспорта"
                  name="docNumber"
                  readOnly
                  disabled={isEditing}
                  value={formData.docNumber}
                  onChange={handleDataChange}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <InputFilLabelled
                    label="Дата выдачи"
                    name="docIssueDate"
                    readOnly
                    disabled={isEditing}
                    value={SimpleformatDate(formData.docIssueDate)}
                    onChange={handleDataChange}
                  />
                  <InputFilLabelled
                    label="Срок действия"
                    name="docExpireDate"
                    readOnly
                    disabled={isEditing}
                    value={SimpleformatDate(formData.docExpireDate)}
                    onChange={handleDataChange}
                  />
                </Box>

                <InputFilLabelled
                  label="Орган выдавший документ"
                  name="docIssuer"
                  readOnly
                  disabled={isEditing}
                  value={formData.docIssuer}
                  onChange={handleDataChange}
                  multiline
                />
              </Box>
            </Box>

            <Box
              sx={{ display: 'flex', justifyContent: 'flex-start', gap: 0, alignItems: 'center' }}
            >
              <Box className="block-title"> Контактная информация </Box>
              <Box sx={{ display: 'flex' }}>
                <Button
                  onClick={handleSave}
                  sx={{
                    fontSize: '15px',
                    fontWeight: '400',
                    textTransform: 'none',
                    ml: 3,
                    display: isEditing ? 'inline-flex' : 'none',
                  }}
                >
                  Сохранить
                </Button>
                <Button
                  onClick={handleCancel}
                  sx={{
                    fontSize: '15px',
                    fontWeight: '400',
                    textTransform: 'none',
                    display: isEditing ? 'inline-flex' : 'none',
                  }}
                >
                  Отмена
                </Button>
                <Button
                  onClick={() => setIsEditing(true)}
                  sx={{
                    fontSize: '15px',
                    fontWeight: '400',
                    textTransform: 'none',
                    pl: 0,
                    display: !isEditing ? 'inline-flex' : 'none',
                  }}
                >
                  <BorderColorIcon color="primary" sx={{ ml: 0 }} />
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 14, mb: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '30%' }}>
                <InputFilLabelled
                  label="Мобильный телефон"
                  name="phone"
                  value={formData.phone}
                  onChange={handleDataChange}
                  readOnly={!isEditing}
                />
                <InputFilLabelled
                  label="Адрес регистрации"
                  name="registerAddress"
                  value={formData.registerAddress}
                  onChange={handleDataChange}
                  readOnly={!isEditing}
                  multiline
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '30%' }}>
                <InputFilLabelled
                  label="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleDataChange}
                  readOnly={!isEditing}
                />
                <InputFilLabelled
                  label="Адрес проживания"
                  name="residenceAddress"
                  value={formData.residenceAddress}
                  onChange={handleDataChange}
                  readOnly={!isEditing}
                  multiline
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
      <SimpleModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Окно подтверждения"
      >
        <div>Данные успешно сохранены</div>
      </SimpleModal>
    </>
  );
}
