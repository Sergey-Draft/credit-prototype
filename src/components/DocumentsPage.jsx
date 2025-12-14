import React from 'react';
import { Box, Typography, Card, CardContent, Button, Stack, Paper } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

const documents = [
  {
    id: 1,
    title: 'Паспорт гражданина Республики Беларусь',
    description: 'Документ подтверждающий личность',
  },
  {
    id: 2,
    title: 'Справка о доходах',
    description: 'Документ для оценки платёжеспособности',
  },
  {
    id: 3,
    title: 'Кредитный договор',
    description: 'Содержит условия текущего кредита',
  },
  {
    id: 4,
    title: 'График платежей',
    description: 'Ваш персональный график выплат',
  },
];

export default function DocumentsPage() {
  return (
    <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            {' '}
            Документы{' '}
          </Typography>{' '}
          {/* <Typography variant="body1" color="text.secondary">
          
        </Typography> */}
        </Box>

        <Stack spacing={2}>
          {documents.map((doc) => (
            <Card key={doc.id} sx={{ borderRadius: 2 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DescriptionIcon color="primary" sx={{ fontSize: 40 }} />

                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{doc.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doc.description}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button variant="outlined">Просмотреть</Button>
                  <Button variant="contained">Скачать</Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
