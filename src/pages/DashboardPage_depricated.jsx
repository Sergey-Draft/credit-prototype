import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'feather-icons-react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Paper,
  Chip,
} from '@mui/material';
import GradingIcon from '@mui/icons-material/Grading';
import SearchIcon from '@mui/icons-material/Search';
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCard from '../components/CreditCard';
import SimpleModal from '../components/SimpleModal';
import LoanRequestCard from '../components/RequestCard';

const banks = [
  { id: 1, name: 'Сбербанк', logo: '/logo/sber.jpg', rating: 4.8, products: 12 },
  { id: 2, name: 'Альфа-Банк', logo: '/logo/alfa.jpg', rating: 4.6, products: 10 },
  { id: 3, name: 'Тинькофф', logo: '/logo/tinkof.jpg', rating: 4.7, products: 15 },
  { id: 4, name: 'НоваБанк', logo: '/logo/novos.jpg', rating: 4.5, products: 8 },
  { id: 5, name: 'КредитКвартал', logo: '/logo/credit.jpg', rating: 4.3, products: 6 },
  { id: 6, name: 'ФинТек Про', logo: '/logo/fintech.jpg', rating: 4.4, products: 9 },
  { id: 7, name: 'Мегакредит', logo: '/logo/mega.jpg', rating: 4.2, products: 7 },
  { id: 8, name: 'ЭкспрессФин', logo: '/logo/express.jpg', rating: 4.9, products: 11 },
  { id: 9, name: 'GreenBank', logo: '/logo/green.jpg', rating: 4.5, products: 8 },
  { id: 10, name: 'ТехноКапитал', logo: '/logo/texno.jpg', rating: 4.4, products: 9 },
];

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

const creditJSON = {
  creditId: '123456',
  amount: 1500.0, // Сумма кредита
  currency: 'BYN', // Валюта
  interestRate: 18.5, // Процентная ставка годовая
  termMonths: 12, // Срок кредита в месяцах
  monthlyPayment: 140.25, // Ежемесячный платёж
  remainingBalance: 980.75, // Остаток долга
  startDate: '2025-01-10', // Дата выдачи
  endDate: '2026-01-10', // Дата окончания
  status: 'active', // Статус кредита (active, closed, overdue)
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isExpand, setIsExpand] = useState(false);
  const [children, setChildren] = useState(null);
  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  const [open, setOpen] = useState(false);
  const handleModalOpen = (source) => {
    setOpen(true);
    setChildren(source);
  };

  const handleBankClick = (bank) => {
    navigate('/search', { state: { selectedBank: bank.name } });
  };

  return (
    <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          {' '}
          Активные кредиты{' '}
        </Typography>{' '}
        {/* <Typography variant="body1" color="text.secondary">
          
        </Typography> */}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
        {' '}
        <Box>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <span onDoubleClick={() => handleModalOpen(creditJSON)} style={{ cursor: 'pointer' }}>
                <CreditCard credit={creditJSON} />
              </span>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label="Подобрать кредит"
            onClick={() => navigate('/search')}
            sx={{ p: 2, fontSize: '1rem', cursor: 'pointer', backgroundColor: '#fff' }}
            color="primary"
          />
          <Chip
            label="Мои кредиты"
            onClick={() => navigate('/loans')}
            sx={{ p: 2, fontSize: '1rem', cursor: 'pointer', backgroundColor: '#fff' }}
            color="primary"
          />
        </Box>
      </Box>

      <Box>
        <Typography
          variant="h5"
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start' }}
        >
          Кредитные организации{' '}
          <span onClick={handleExpand} style={{ cursor: 'pointer' }}>
            {isExpand ? <ChevronDown size={34} /> : <ChevronUp size={34} />}
          </span>
        </Typography>
        {isExpand ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(5, 1fr)',
              },
              gap: 3,
              transition: 'max-height 0.5s ease',
            }}
          >
            {banks.map((bank) => (
              <Card
                elevation={3}
                key={bank.id}
                sx={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleBankClick(bank)}
                  sx={{
                    flexGrow: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={bank.logo}
                    alt={bank.name}
                    sx={{
                      objectFit: 'contain',
                      p: 2,
                      backgroundColor: '#f5f5f5',
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {bank.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                        width: '100%',
                      }}
                    >
                      <Chip
                        label={`⭐ ${bank.rating}`}
                        size="small"
                        color="warning"
                        sx={{ fontWeight: 'bold' }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ whiteSpace: 'nowrap', ml: 1 }}
                      >
                        {bank.products} продуктов
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        ) : null}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {loanRequests.map((req) => (
          <LoanRequestCard key={req.id} request={req} onSign={() => handleModalOpen(req)} />
        ))}
      </Box>

      <SimpleModal open={open} onClose={() => setOpen(false)} title="Активный кредит">
        <pre>{JSON.stringify(children, null, 2)}</pre>
      </SimpleModal>
    </Paper>
  );
}
