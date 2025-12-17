import React, { useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { loginSuccess } from '../../RTK/userSlice';
import { InputFilLabelled } from '../components/ReusableInputs/MainAppStyledElements';
import SimpleModal from '../components/SimpleModal';

const getUserData = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export default function ProfilePage() {
  const dispatch = useDispatch();
  const userData = getUserData();
  const [openConfirm, setOpenConfirm] = useState(false);
  console.log('userData', userData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    last_name: userData?.last_name || 'Христорождественская',
    first_name: userData?.first_name || 'Александра',
    middle_name: userData?.middle_name || 'Варфоломеевна',
    birth_date: userData?.birth_date || '11.04.1989',

    personal_number: userData?.personal_number || '4101234A567B890',
    document_number: userData?.document_number || 'BM1234567',
    issue_date: userData?.issue_date || '11.04.2020',
    expiry_date: userData?.expiry_date || '11.04.2030',
    issuing_authority: userData?.issuing_authority || 'Московский РОВД г.Бреста',

    phone: userData?.phone || '+ 375 (29) 232 -15 -15',
    email: userData?.email || 'khristorozhdestvenskay@gmail.com',
    registrationAddress: userData?.registrationAddress || 'ул. Октября 11/5, г.Брес',
    residentialAddress: userData?.residentialAddress || 'ул. Октября 11/5, г.Брес',
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
      last_name: userData?.last_name || 'Христорождественская',
      first_name: userData?.first_name || 'Александра',
      middle_name: userData?.middle_name || 'Варфоломеевна',
      birth_date: userData?.birth_date || '11.04.1989',

      personal_number: userData?.personal_number || '4101234A567B890',
      document_number: userData?.document_number || 'BM1234567',
      issue_date: userData?.issue_date || '11.04.2020',
      expiry_date: userData?.expiry_date || '11.04.2030',
      issuing_authority: userData?.issuing_authority || 'Московский РОВД г.Бреста',

      phone: userData?.phone || '+ 375 (29) 232 -15 -15',
      email: userData?.email || 'khristorozhdestvenskay@gmail.com',
      registrationAddress: userData?.registrationAddress || 'ул. Октября 11/5, г.Брес',
      residentialAddress: userData?.residentialAddress || 'ул. Октября 11/5, г.Брес',
    });
    setIsEditing(false);
  };

  return (
    <>
      <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', padding: '80px 60px' }}>
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
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleDataChange}
                />
                <InputFilLabelled
                  label="Имя"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleDataChange}
                />
                <InputFilLabelled
                  label="Отчество"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleDataChange}
                />
                <InputFilLabelled
                  label="Дата рождения"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleDataChange}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '30%' }}>
                <InputFilLabelled
                  label="Личный номер"
                  name="personal_number"
                  value={formData.personal_number}
                  onChange={handleDataChange}
                />
                <InputFilLabelled
                  label="Номер паспорта"
                  name="document_number"
                  value={formData.document_number}
                  onChange={handleDataChange}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <InputFilLabelled
                    label="Дата выдачи"
                    name="issue_date"
                    value={formData.issue_date}
                    onChange={handleDataChange}
                  />
                  <InputFilLabelled
                    label="Срок действия"
                    name="expiry_date"
                    value={formData.expiry_date}
                    onChange={handleDataChange}
                  />
                </Box>

                <InputFilLabelled
                  label="Орган выдавший документ"
                  name="issuing_authority"
                  value={formData.issuing_authority}
                  onChange={handleDataChange}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
              <Box className="block-title"> Контактная информация </Box>
              <Box sx={{ ml: '16px' }}>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    sx={{
                      fontSize: '15px',
                      fontWeight: '400',
                      textDecoration: 'none',
                      textTransform: 'none',
                    }}
                  >
                    <EditIcon color="primary" />
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex' }}>
                    <Button
                      onClick={handleSave}
                      sx={{
                        fontSize: '15px',
                        fontWeight: '400',
                        textDecoration: 'none',
                        textTransform: 'none',
                      }}
                    >
                      Сохранить
                    </Button>
                    <Button
                      onClick={handleCancel}
                      sx={{
                        fontSize: '15px',
                        fontWeight: '400',
                        textDecoration: 'none',
                        textTransform: 'none',
                      }}
                    >
                      Отмена
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 14, mb: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '30%' }}>
                <InputFilLabelled
                  label="Мобильный телефон"
                  name="phone"
                  value={formData.phone}
                  onChange={handleDataChange}
                  disabled={!isEditing}
                />
                <InputFilLabelled
                  label="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleDataChange}
                  disabled={!isEditing}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '30%' }}>
                <InputFilLabelled
                  label="Адрес регистрации"
                  name="registrationAddress"
                  value={formData.registrationAddress}
                  onChange={handleDataChange}
                  disabled={!isEditing}
                />
                <InputFilLabelled
                  label="Адрес проживания"
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleDataChange}
                  disabled={!isEditing}
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
