/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RouterBreadcrumbs from '../components/RouterBreadCrumbs';

const faq = [
  {
    q: 'Как подобрать кредит?',
    a: 'Перейдите в раздел «Поиск кредитов» и заполните обязательные поля.',
  },
  {
    q: 'Почему отклонили обращение?',
    a: 'Причины могут быть разные. Проверьте корректность ваших данных.',
  },
  {
    q: 'Как изменить личные данные?',
    a: 'Открыть раздел «Личный кабинет» и нажать «Редактировать».',
  },
  { q: 'Какие документы нужны?', a: 'Личный номер' },
];

export default function SupportPage() {
  return (
    <Paper
      elevation={0}
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
      <Box sx={{ mb: 2 }}>
        <Box className="main-title" sx={{ mb: 2 }}>
          Вопрос-ответ
        </Box>
        <Box className="main-subtitle">
          Найдите ответ на интересующий вопрос или обратитесь в техподдержку
        </Box>
        <Box sx={{ mt: '-10px' }}>
          {faq.map((f, idx) => (
            <Accordion
              key={idx}
              sx={{
                pl: 0,
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: 0,
                  boxShadow: 'none',
                },
                '&.Mui-expanded .MuiAccordionSummary-expandIconWrapper': {
                  color: '#2260BC',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  pl: 0,
                  justifyContent: 'flex-start',
                  '& .MuiAccordionSummary-content': {
                    flexGrow: 0,
                    margin: 0,
                  },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    marginLeft: 1,
                  },
                }}
              >
                <Typography
                  fontWeight={600}
                  color="#1A1A1A"
                  fontSize={16}
                  sx={{
                    color: '#1A1A1A',
                    '.Mui-expanded &': {
                      color: '#2260BC',
                    },
                  }}
                >
                  {f.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography fontWeight={400} color="#1A1A1A" fontSize={16}>
                  {f.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
