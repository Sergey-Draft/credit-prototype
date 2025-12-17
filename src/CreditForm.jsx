/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { ArrowRight } from 'feather-icons-react';
import CreditModal from './components/CreditModal';
import {
  InputFilLabelled,
  SelectFieldLabelled,
  StyledButton,
  ToggleField,
} from './components/ReusableInputs/MainAppStyledElements';

export default function CreditForm({ onSearch }) {
  const [realty, setRealty] = React.useState('yes');
  const [car, setCar] = React.useState('yes');

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const initialState = {
    creditType: '',
    amount: '',
    term: '',
    warranty: '',
    education: '',
    martialStatus: '',
    dependents: '',
    realty: '',
    car: '',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ goal: 'weqewq', amount: '123456', term: '12' });
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
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

          <Box
            sx={{
              mb: 4,
              backgroundColor: '#F1F0FF',
              padding: '40px 60px',
              margin: '0px -60px',
              opacity: '100%',
            }}
          >
            <Box className="block-title" sx={{ mb: '30px' }}>
              Обязательная информация
            </Box>

            <Box className="main-subtitle" sx={{ mb: '24px' }}>
              Укажите дополнительные данные для корректного поиска кредита
            </Box>

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

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '70px' }}>
              <StyledButton
                text={
                  <>
                    Продолжить&nbsp;
                    <ArrowRight />
                  </>
                }
                onClick={() => setOpenConfirmationModal(true)}
              />
            </Box>
          </Box>
        </form>
      </Box>
      <CreditModal open={openConfirmationModal} onClose={() => setOpenConfirmationModal(false)} />
    </>
  );
}
