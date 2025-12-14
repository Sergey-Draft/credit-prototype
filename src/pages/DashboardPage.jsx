import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, Alert, Paper } from '@mui/material';
import BankCard from '../components/BankCardResults';
import CreditForm from '../CreditForm';
import getUserData from '../../utils/getUserData';
import CreditOrganizations from '../components/CreditOrganizations';
import BankCardResults from '../components/BankCardResults';
import BankList from '../components/BankList';
import LoanRequestCard from '../components/LoanRequestCard';
import SimpleModal from '../components/SimpleModal';

const DashboardPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const userData = getUserData();
  const selectedBank = location.state?.selectedBank;

  console.log('userData', userData);

  const [selected, setSelected] = useState(selectedBank);
  const [children, setChildren] = useState(null);
  const [open, setOpen] = useState(false);
  const handleModalOpen = (source) => {
    setOpen(true);
    setChildren(source);
  };

  useEffect(() => {
    if (selected) {
      // Можно показать уведомление о выбранном банке
    }
  }, [selected]);

  const loanRequests = [
    {
      id: 1,
      status: 'awaiting_signature',
      type: 'Потребительский кредит',
      date: '19.11.2025 16:04:32',
      amount: 100000,
      term: 24,
      rate: 19.58,
      payment: 4532,
      bankLogo: '/bank-logos/prior_bank.png',
    },
    {
      id: 2,
      status: 'approved',
      type: 'Потребительский кредит',
      date: '10.11.2025 14:21:10',
      amount: 25000,
      term: 36,
      bankLogo: '/bank-logos/prior_bank.png',
    },
    {
      id: 2,
      status: 'processing',
      type: 'Потребительский кредит',
      date: '10.11.2025 14:21:10',
      amount: 25000,
      term: 36,
      bankLogo: '/bank-logos/prior_bank.png',
    },
  ];

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

    if (selected) {
      allBanks = allBanks.filter((bank) => bank.name === selected);
    }

    setResults(allBanks);
  };

  const handleBankReset = () => {
    setSelected(null);
    () => handleSearch;
  };

  return (
    <>
      <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', padding: '20px 60px' }}>
        <Box sx={{ mb: 3 }}>
          <Box className="main-title">Подбор кредита</Box>
          <Box className="main-subtitle">Укажите интересующие вас параметры подбора кредита</Box>
        </Box>

        <CreditForm onSearch={handleSearch} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: '50px 0' }}>
          {loanRequests.map((req) => (
            <LoanRequestCard key={req.id} request={req} onSign={() => handleModalOpen(req)} />
          ))}
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
                <BankCardResults key={bank.id} bank={bank} />
              ))}
            </Box>
          </Box>
        )}

        <BankList />
      </Paper>

      <SimpleModal open={open} onClose={() => setOpen(false)} title="Активный кредит">
        <pre>{JSON.stringify(children, null, 2)}</pre>
      </SimpleModal>
    </>
  );
};

export default DashboardPage;
