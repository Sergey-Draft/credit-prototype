import React, { useEffect } from 'react';
import { Box, Paper, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import { useDispatch, useSelector } from 'react-redux';
import RouterBreadcrumbs from '../components/RouterBreadCrumbs';
import LoanDetailsModal from '../components/LoanDetailsModal';
import api from '../api/axiosConfig';
import { userLoansHistory } from '../../RTK/userSlice';
import { formatCurrency, formatDuration, SimpleformatDate } from '../../utils/format';
import { loansStatusMap } from '../../utils/SelectEnumes';
import { banksMapNames } from '../../utils/banksMap';

const getStatusMeta = (status) => {
  if (status == null) return loansStatusMap.UNKNOWN;
  return loansStatusMap[status] || loansStatusMap.UNKNOWN;
};

export default function LoansPage() {
  const [openDetails, setOpenDetails] = React.useState(false);
  const [details, setDetails] = React.useState(null);

  const dispatch = useDispatch();
  const userLoans = useSelector((state) => state.user.userLoans);

  const getBankInfo = (bankCode) => banksMapNames[bankCode] || banksMapNames.UNKNOWN;

  const handleCellClick = (params) => {
    setDetails(params.row);
    setOpenDetails(true);
  };

  const fetchUserLoans = async () => {
    try {
      const response = await api.get('/users/loans');
      return response.data;
    } catch (err) {
      console.error('Ошибка при загрузке запросов:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchUserLoans().then((response) => {
      dispatch(userLoansHistory(response));
    });
  }, []);

  const columns = [
    {
      field: 'bank',
      headerName: 'Банк',
      flex: 1.1,
      renderCell: (params) => {
        const bank = getBankInfo(params.value);
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: `${params.value === 'UNKNOWN' ? '100%' : '100%'}`,
            }}
          >
            <img
              src={bank?.src}
              alt={bank?.name}
              style={{
                height: params.value === 'UNKNOWN' ? '70%' : '100%',
                margin: params.value === 'UNKNOWN' ? '4%' : 'none',
              }}
            />
            <span>{bank?.name}</span>
          </div>
        );
      },
    },
    {
      field: 'amount',
      headerName: 'Сумма (BYN)',
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return '';
        return formatCurrency(value);
      },
    },
    {
      field: 'term',
      headerName: 'Срок',
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return '';
        return formatDuration(value);
      },
    },
    {
      field: 'contractDate',
      headerName: 'Дата начала',
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return '';
        return SimpleformatDate(value);
      },
    },
    {
      field: 'maturityDate',
      headerName: 'Дата окончания',
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return '';
        return SimpleformatDate(value);
      },
    },
    {
      field: 'rate',
      headerName: 'Ставка',
      flex: 0.8,
      valueFormatter: (value) => {
        if (!value) return '';
        return `${value}%`;
      },
    },
    {
      field: 'loanStatus',
      headerName: 'Статус',
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return '';
        return getStatusMeta(value);
      },
    },
    {
      field: 'details',
      headerName: 'Подробнее',
      flex: 1,
      renderCell: (params) => (
        <Tooltip
          title="Подробности о кредите"
          placement="bottom"
          componentsProps={{
            sx: {
              bgcolor: '#fff',
              color: '1A1A1A',
            },
          }}
        >
          <div
            style={{
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={() => handleCellClick(params)}
          >
            ...
          </div>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
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
            Мои кредиты
          </Box>
          <Box className="main-subtitle">Включает информацию о действующих и закрытых кредитах</Box>
        </Box>
        <DataGrid
          rows={userLoans ? [...userLoans].sort((a, b) => b.id - a.id) : []}
          columns={columns}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          getRowClassName={(params) => (params.row.status === null ? 'row-closed' : 'row-active')}
          loading={!userLoans}
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#F1F0FF',
            },
            '& .row-active': {
              bgcolor: '#fff',
            },
            '& .row-closed': {
              color: '#7F7F7F',
            },
          }}
        />
      </Paper>

      <LoanDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        loan={details}
      />
    </>
  );
}
