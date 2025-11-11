import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, Alert, Paper } from '@mui/material';
import BankCard from '../BankCredit';
import CreditForm from '../CreditForm';

const getUserData = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const userData = getUserData();
  const selectedBank = location.state?.selectedBank;

  console.log('userData', userData);

  useEffect(() => {
    if (selectedBank) {
      // Можно показать уведомление о выбранном банке
    }
  }, [selectedBank]);

  const handleSearch = (formData) => {
    let allBanks = [
      {
        id: 1,
        name: 'Сбербанк',
        logo: '/logo/sber.jpg',
        amount: formData.amount,
        term: formData.term,
        rate: '12%',
        payment: '10 500',
        earlyRepayment: 'Да',
        effectiveRate: '17%',
        schedule: 'aннуитет',
      },
      {
        id: 2,
        name: 'Альфа-Банк',
        logo: '/logo/alfa.jpg',
        amount: formData.amount,
        term: formData.term,
        rate: '13%',
        payment: '10 800',
        earlyRepayment: 'Нет',
        effectiveRate: '16%',
        schedule: 'aннуитет',
      },
      {
        id: 3,
        name: 'Тинькофф',
        logo: '/logo/tinkof.jpg',
        amount: formData.amount,
        term: formData.term,
        rate: '11.5%',
        payment: '10 300',
        earlyRepayment: 'Да',
        effectiveRate: '17%',
        schedule: 'aннуитет',
      },
      {
        id: 4,
        name: 'НоваБанк',
        logo: '/logo/novos.jpg',
        amount: formData.amount,
        term: formData.term,
        rate: '10.9%',
        payment: '10 150',
        earlyRepayment: 'Да',
        effectiveRate: '16.5%',
        schedule: 'аннуитет',
      },
      {
        id: 5,
        name: 'КредитКвартал',
        logo: '/logo/credit.jpg',
        amount: formData.amount,
        term: formData.term,
        rate: '14%',
        payment: '11 050',
        earlyRepayment: 'Нет',
        effectiveRate: '18.2%',
        schedule: 'аннуитет',
      },
      {
        id: 6,
        name: 'ФинТек Про',
        logo: '/logo/fintech.jpg',
        amount: formData.amount,
        term: formData.term,
        rate: '12.5%',
        payment: '10 600',
        earlyRepayment: 'Да',
        effectiveRate: '17.1%',
        schedule: 'аннуитет',
      },
      {
        id: 7,
        name: 'Мегакредит',
        logo: '/logo/mega.jpg',
        amount: formData.amount,
        term: formData.term,
        rate: '15%',
        payment: '11 300',
        earlyRepayment: 'Нет',
        effectiveRate: '19.0%',
        schedule: 'аннуитет',
      },
      {
        id: 8,
        name: 'ЭкспрессФин',
        logo: '/logo/express.jpg',
        amount: formData.amount,
        term: formData.term,
        rate: '9.8%',
        payment: '9 950',
        earlyRepayment: 'Да',
        effectiveRate: '15.4%',
        schedule: 'аннуитет',
      },
      {
        id: 9,
        name: 'GreenBank',
        logo: '/logo/green.jpg',
        amount: formData.amount,
        term: formData.term,
        rate: '13.2%',
        payment: '10 900',
        earlyRepayment: 'Да',
        effectiveRate: '17.6%',
        schedule: 'аннуитет',
      },
      {
        id: 10,
        name: 'ТехноКапитал',
        logo: '/logo/texno.jpg',
        amount: formData.amount,
        term: formData.term,
        rate: '11.7%',
        payment: '10 420',
        earlyRepayment: 'Нет',
        effectiveRate: '16.9%',
        schedule: 'аннуитет',
      },
    ];

    // Если выбран конкретный банк, фильтруем результаты
    if (selectedBank) {
      allBanks = allBanks.filter((bank) => bank.name === selectedBank);
    }

    setResults(allBanks);
  };

  return (
    <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Поиск кредита по параметрам
        </Typography>
        {/* <Typography variant="body1" color="text.secondary">
          Все ваши заявки на получение кредита
        </Typography> */}
      </Box>

      {selectedBank && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Вы ищете кредиты в банке: <strong>{selectedBank}</strong>
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            mb: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Личный номер:</strong>{' '}
            {userData?.personal_number || userData.user?.personal_number || 'Не указан'}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Адрес регистрации:</strong>{' '}
            {userData.user?.address || 'г. Минск, ул. Победителей, 10'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Телефон:</strong> {userData?.phone || 'Не указан'}
          </Typography>
        </Box>

        <CreditForm onSearch={handleSearch} />
      </Box>

      {results.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
            Результаты поиска: {results.length} предложений
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {results.map((bank) => (
              <BankCard key={bank.id} bank={bank} />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default SearchPage;
