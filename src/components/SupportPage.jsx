import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

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
  const [theme, setTheme] = useState('');
  const [text, setText] = useState('');

  return (
    <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {' '}
            Письмо в техподдержку{' '}
          </Typography>{' '}
          {/* <Typography variant="body1" color="text.secondary">
          
        </Typography> */}
        </Box>

        <Card sx={{ mb: 4, borderRadius: 2 }} elevation={3}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <SupportAgentIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6">Отправить обращение</Typography>
            </Box>

            <Stack spacing={2}>
              <TextField
                label="Тема"
                fullWidth
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />

              <TextField
                label="Описание проблемы"
                multiline
                minRows={4}
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <Button variant="contained" size="large" sx={{ alignSelf: 'flex-start' }}>
                Отправить запрос
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Typography variant="h6" fontWeight={600} mb={2}>
          Часто задаваемые вопросы
        </Typography>

        {faq.map((f, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Accordion key={idx} sx={{ borderRadius: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={500}>{f.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{f.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
}
