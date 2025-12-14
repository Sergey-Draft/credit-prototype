import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'feather-icons-react';
import { Box, Typography, Card, CardContent, CardMedia, CardActionArea, Chip } from '@mui/material';

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

const CreditOrganizations = () => {
  const [isExpand, setIsExpand] = useState(false);
  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  return (
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
                // onClick={() => handleBankClick(bank)}
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
  );
};

export default CreditOrganizations;
