import React, { useState } from 'react';
import { Box, Container, Typography, TextField, InputAdornment, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

const mockHistory = [
  {
    id: 1,
    date: '2024-01-15',
    bank: 'Сбербанк',
    loanType: 'Потребительский кредит',
    amount: 10000,
    term: 24,
    rate: '12%',
    status: 'approved',
    statusText: 'Одобрено',
  },
  {
    id: 2,
    date: '2024-01-10',
    bank: 'Альфа-Банк',
    loanType: 'Автокредит',
    amount: 8000,
    term: 12,
    rate: '13%',
    status: 'pending',
    statusText: 'На рассмотрении',
  },
  {
    id: 3,
    date: '2024-01-05',
    bank: 'Тинькофф',
    loanType: 'Микрокредит',
    amount: 6000,
    term: 6,
    rate: '10%',
    status: 'rejected',
    statusText: 'Отклонено',
  },
  {
    id: 4,
    date: '2023-12-20',
    bank: 'GreenBank',
    loanType: 'Потребительский кредит',
    amount: 12000,
    term: 18,
    rate: '11%',
    status: 'closed',
    statusText: 'Закрыто',
  },
  {
    id: 5,
    date: '2023-12-15',
    bank: 'ЭкспрессФин',
    loanType: 'Потребительский кредит',
    amount: 5000,
    term: 12,
    rate: '9.8%',
    status: 'approved',
    statusText: 'Одобрено',
  },
  {
    id: 6,
    date: '2023-12-01',
    bank: 'НоваБанк',
    loanType: 'Автокредит',
    amount: 15000,
    term: 36,
    rate: '10.9%',
    status: 'closed',
    statusText: 'Закрыто',
  },
];

const columns = [
  {
    field: 'date',
    headerName: 'Дата',
    flex: 1,
    renderCell: (params) => {
      try {
        const date = new Date(params.value);
        return date.toLocaleDateString('ru-RU');
      } catch (e) {
        return params.value;
      }
    },
  },
  {
    field: 'bank',
    headerName: 'Банк',
    flex: 1,
  },
  {
    field: 'loanType',
    headerName: 'Тип кредита',
    flex: 1,
  },
  {
    field: 'amount',
    headerName: 'Сумма (BYN)',
    align: 'right',
    headerAlign: 'right',
    renderCell: (params) => `${params.value?.toLocaleString('ru-RU') || params.value}`,
  },
  {
    field: 'term',
    headerName: 'Срок (мес)',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'rate',
    headerName: 'Ставка',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'status',
    headerName: 'Статус',
    flex: 1,
    renderCell: (params) => {
      const statusColors = {
        approved: { color: '#2e7d32', bg: '#e8f5e9' },
        pending: { color: '#ed6c02', bg: '#fff3e0' },
        rejected: { color: '#d32f2f', bg: '#ffebee' },
        closed: { color: '#616161', bg: '#f5f5f5' },
      };
      const status = statusColors[params.value] || statusColors.pending;
      return (
        <Box
          sx={{
            bgcolor: status.bg,
            color: status.color,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.875rem',
            fontWeight: 600,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {params.row.statusText}
        </Box>
      );
    },
  },
];

export default function HistoryPage() {
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(mockHistory);

  // Отладка - проверяем данные
  console.log('HistoryPage - filteredRows:', filteredRows);
  console.log('HistoryPage - columns:', columns);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    if (!value) {
      setFilteredRows(mockHistory);
      return;
    }

    const filtered = mockHistory.filter(
      (row) =>
        row.bank.toLowerCase().includes(value) ||
        row.loanType.toLowerCase().includes(value) ||
        row.statusText.toLowerCase().includes(value) ||
        row.amount.toString().includes(value),
    );
    setFilteredRows(filtered);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          История обращений
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Все ваши заявки на получение кредита
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Поиск по банку, типу кредита, статусу..."
          value={searchText}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
      </Paper>

      <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.id}
          autoHeight={false}
          sx={{
            height: 600,
            width: '100%',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-root': {
              border: 'none',
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          checkboxSelection={false}
        />
      </Paper>

      {filteredRows.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Ничего не найдено
          </Typography>
        </Box>
      )}
    </Container>
  );
}
