import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const loans = [
  { id: 1, bank: 'Сбербанк', amount: 10000, term: '24 мес', rate: '12%', status: 'active' },
  { id: 2, bank: 'Альфа-Банк', amount: 8000, term: '12 мес', rate: '13%', status: 'active' },
  { id: 3, bank: 'Тинькофф', amount: 6000, term: '6 мес', rate: '10%', status: 'closed' },
  { id: 4, bank: 'GreenBank', amount: 12000, term: '18 мес', rate: '11%', status: 'closed' },
];

const columns = [
  { field: 'bank', headerName: 'Банк', flex: 1 },
  { field: 'amount', headerName: 'Сумма (BYN)', flex: 1 },
  { field: 'term', headerName: 'Срок', flex: 1 },
  { field: 'rate', headerName: 'Ставка', flex: 1 },
  {
    field: 'status',
    headerName: 'Статус',
    flex: 1,
    renderCell: (params) => (
      <span
        style={{
          color: params.value === 'active' ? 'green' : 'gray',
          fontWeight: 600,
        }}
      >
        {params.value === 'active' ? 'Активен' : 'Закрыт'}
      </span>
    ),
  },
];

export default function LoansPage() {
  return (
    <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Кредиты пользователя
        </Typography>
        {/* <Typography variant="body1" color="text.secondary">
        </Typography> */}
      </Box>

      <DataGrid
        rows={loans}
        columns={columns}
        pageSize={5}
        disableRowSelectionOnClick
        getRowClassName={(params) => (params.row.status === 'active' ? 'row-active' : 'row-closed')}
        sx={{
          '& .row-active': {
            bgcolor: 'rgba(0, 255, 0, 0.05)',
          },
          '& .row-closed': {
            bgcolor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      />
    </Paper>
  );
}
