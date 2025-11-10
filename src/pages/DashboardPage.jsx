import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
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

export default function DashboardPage() {
  const navigate = useNavigate();

  // нужен ли поиск по банку?
  //   const handleBankClick = (bank) => {
  //     navigate('/search', { state: { selectedBank: bank.name } });
  //   };

  const stats = {
    activeLoans: 2,
    totalAmount: 18000,
    applications: 5,
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Добро пожаловать!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Выберите банк или начните поиск кредита
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <GradingIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {stats.activeLoans}
                </Typography>
                <Typography variant="body2">Активных кредитов</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SearchIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {stats.applications}
                </Typography>
                <Typography variant="body2">Заявок отправлено</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PaymentsIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {stats.totalAmount.toLocaleString()}
                </Typography>
                <Typography variant="body2">общая сумма кредитов(BYN)</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Быстрые действия
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label="Найти кредит"
            onClick={() => navigate('/search')}
            sx={{ p: 2, fontSize: '1rem', cursor: 'pointer' }}
            color="primary"
          />
          <Chip
            label="Мои кредиты"
            onClick={() => navigate('/loans')}
            sx={{ p: 2, fontSize: '1rem', cursor: 'pointer' }}
            color="primary"
            variant="outlined"
          />
          <Chip
            label="История"
            onClick={() => navigate('/history')}
            sx={{ p: 2, fontSize: '1rem', cursor: 'pointer' }}
            color="primary"
            variant="outlined"
          />
        </Box>
      </Box> */}

      <Box>
        <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
          Банки-партнёры
        </Typography>
        <Grid container spacing={3}>
          {banks.map((bank) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={bank.id}
              sx={{
                display: 'flex',
                minWidth: 0,
              }}
            >
              <Card
                elevation={3}
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
                  //   onClick={() => handleBankClick(bank)}
                  sx={{
                    flexGrow: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 140,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f5f5f5',
                      p: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={bank.logo}
                      alt={bank.name}
                      sx={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                      }}
                    />
                  </CardMedia>
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
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
