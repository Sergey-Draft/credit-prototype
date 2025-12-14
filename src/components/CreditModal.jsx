import React from 'react';
import { Dialog, DialogContent, Box } from '@mui/material';
import {
  CheckboxField,
  InputFilLabelled,
  SelectFieldLabelled,
  StyledButton,
  ToggleField,
} from './ReusableInputs/MainAppStyledElements';
import GlobalLoader from './GlobalLoader';

export default function CreditModal({ open, onClose }) {
  const [realty, setRealty] = React.useState('yes');
  const [car, setCar] = React.useState('yes');
  const [loading, setLoading] = React.useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 3000);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xl"
        fullWidth
        scroll="paper"
        sx={{
          padding: '70px 60px',
          '& .MuiDialog-paper': {
            height: '90vh',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogContent sx={{ padding: '70px 60px' }}>
          <span
            onClick={onClose}
            style={{ cursor: 'pointer', position: 'absolute', right: '57px', top: '30px' }}
          >
            <img src="/images/Сlose.svg" alt="close_img" />
          </span>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box className="block-title"> Личные данные</Box>
            <Box sx={{ display: 'flex', gap: 14, mb: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '30%' }}>
                <InputFilLabelled label="Фамилия" />
                <InputFilLabelled label="Имя" />
                <InputFilLabelled label="Отчество" />
                <InputFilLabelled label="Дата рождения" />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '30%' }}>
                <InputFilLabelled label="Личный номер" />
                <InputFilLabelled label="Номер паспорта" />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <InputFilLabelled label="Дата выдачи" />
                  <InputFilLabelled label="Срок действия" />
                </Box>

                <InputFilLabelled label="Орган выдавший документ" />
              </Box>
            </Box>

            <Box className="block-title"> Контактная информация </Box>
            <Box sx={{ display: 'flex', gap: 14, mb: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '30%' }}>
                <InputFilLabelled label="Мобильный телефон" />
                <InputFilLabelled label="E-mail" />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '30%' }}>
                <InputFilLabelled label="Адрес регистрации" />
                <InputFilLabelled label="Адрес проживания" />
              </Box>
            </Box>

            <Box className="block-title">Данные по кредиту</Box>
            <Box sx={{ display: 'flex', gap: 14, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, width: '100%' }}>
                <Box sx={{ flex: 1 }}>
                  <SelectFieldLabelled
                    label="Вид кредита"
                    options={['Потребительский кредит', 'Ипотека', 'Автокредит']}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <InputFilLabelled label="Сумма кредита (BYN)" />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <InputFilLabelled label="Срок кредита" />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <SelectFieldLabelled
                    label="Тип обеспечения"
                    options={['Без обеспечения', 'Поручитель', 'Залог']}
                  />
                </Box>
              </Box>
            </Box>

            <Box className="block-title">Обязательная информация</Box>
            <Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 0.2 }}>
                  <SelectFieldLabelled
                    label="Образование"
                    options={['Высшее', 'Среднее', 'Среднеспециальное']}
                  />
                </Box>
                <Box sx={{ flex: 0.2 }}>
                  <SelectFieldLabelled
                    label="Семейное положение"
                    options={['Холост/Не замужем', 'Женат/Замужем']}
                  />
                </Box>
                <Box sx={{ flex: 0.2 }}>
                  <SelectFieldLabelled
                    label="Количество иждивенцев"
                    options={['Нет', '1', '2', '3']}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
              <ToggleField label="Наличие недвижимости:" value={realty} onChange={setRealty} />
              <ToggleField label="Наличие автомобиля:" value={car} onChange={setCar} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <CheckboxField label="Согласие на предоставление кредитного отчета" />
              <CheckboxField label="Подтверждаю актуальность личных данных" />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
            <StyledButton text="Подобрать кредит" onClick={handleLoading} />
          </Box>
        </DialogContent>
      </Dialog>
      <GlobalLoader loading={loading} text="Подбираем варианты..." />
    </>
  );
}
