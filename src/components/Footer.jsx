import { Box, TextField, Button } from '@mui/material';
import { React, useState } from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '400px',
};

const FooterInput = ({ label, multiline, rows, ...props }) => (
  <TextField
    variant="standard"
    fullWidth
    label={label}
    multiline={multiline}
    rows={rows}
    {...props}
    InputLabelProps={{
      sx: {
        color: '#fff',
        fontSize: '15px',
        fontWeight: 400,
        '&.Mui-focused': {
          color: '#fff',
        },
      },
    }}
    InputProps={{
      sx: {
        color: '#fff',
        fontSize: '15px',
        fontWeight: 400,

        '&:before': {
          borderBottom: '1px solid rgba(255,255,255,0.6)',
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: '1px solid #fff',
        },
        '&:after': {
          borderBottom: '2px solid #fff',
        },

        '& input::placeholder': {
          color: 'rgba(255,255,255,0.7)',
          opacity: 1,
          fontSize: '15px',
        },
      },
    }}
    sx={{
      mb: 2,
    }}
  />
);

const Footer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agree) {
      alert('Необходимо согласие на обработку данных');
      return;
    }

    alert('Отправлено');

    setName('');
    setEmail('');
    setMessage('');
    setAgree(false);
  };

  return (
    <Box sx={{ backgroundColor: '#123B79', color: '#fff' }}>
      <Box
        sx={{
          maxWidth: '1440px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '40px 60px',
          alignItems: 'flex-start',
          margin: '0 auto',
          gap: 6,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ width: '40%' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px 20px', pb: '60px' }}>
            <Link to="/" style={linkStyle}>
              Мои кредиты
            </Link>
            <Link to="/" style={linkStyle}>
              Кредитный калькулятор
            </Link>
            <Link to="/" style={linkStyle}>
              Вопрос-ответ
            </Link>
            <Link to="/" style={linkStyle}>
              История запросов
            </Link>
            <Link to="/" style={linkStyle}>
              О нас
            </Link>
            <Link to="/" style={linkStyle}>
              Сотрудничество
            </Link>
            <Link to="/" style={linkStyle}>
              Контакты
            </Link>
            <Link to="/" style={linkStyle}>
              Политика конфиденциальности
            </Link>
            <Link to="/" style={linkStyle}>
              Политика обработки персональных данных
            </Link>
            <Link to="/" style={linkStyle}>
              Работа с обращениями граждан и юридических лиц
            </Link>
          </Box>

          <Box
            sx={{
              borderTop: '1px solid rgba(255,255,255,0.3)',
              pt: 3,
              fontSize: '13px',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.4,
            }}
          >
            FinMarketPlace использует файлы cookie с целью обеспечения функционирования и повышения
            удобства использования сайта.
          </Box>
        </Box>

        <Box sx={{ width: '40%' }}>
          <Box sx={{ fontSize: '22px', fontWeight: 'bold', letterSpacing: ' 0.32px', mb: 3 }}>
            Техподдержка
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <FooterInput label="Вас зовут" value={name} onChange={(e) => setName(e.target.value)} />

            <FooterInput
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FooterInput
              label="Описание проблемы"
              multiline
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <Box sx={{ ml: 1, fontSize: '14px' }}>
                Я согласен с{' '}
                <span style={{ color: '#FAE41D' }}>условиями обработки персональных данных</span>
              </Box>
            </Box>

            <Button
              type="submit"
              sx={{
                mt: 3,
                backgroundColor: '#fff',
                borderRadius: '8px',
                px: 4,
                py: 1.2,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '16px',
                color: '#2260BC',
                '&:hover': {
                  backgroundColor: '#f2f2f2',
                },
              }}
            >
              Отправить запрос
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
