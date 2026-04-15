import React from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Конвертируем строку "11.02.2026 17:26:18" в формат, понятный для new Date()
// const parseDate = (dateStr) => {
//   const [day, month, yearAndTime] = dateStr.split('.');
//   const [year, time] = yearAndTime.split(' ');
//   return new Date(`${year}-${month}-${day}T${time}`);
// };

import RouterBreadcrumbs from '../components/RouterBreadCrumbs';
import {
  InputFilLabelled,
  SimpleDateRangePicker,
} from '../components/ReusableInputs/MainAppStyledElements';
import LoanRequestCard from '../components/RequestCard';
import { PaginationPlaceholder } from '../components/PaginationPlaceholder';
import api from '../api/axiosConfig';
import { userRequestsHistory } from '../../RTK/userSlice';

dayjs.extend(customParseFormat);

const parseDate = (dateStr) =>
  // Формат D.M.YYYY HH:mm:ss работает для "3.2.2026 16:31:38" и "16.02.2026 11:56:47"
  dayjs(dateStr, 'D.M.YYYY HH:mm:ss').toDate();
export default function HistoryPage() {
  const requests = useSelector((state) => state.user.userRequests);

  const dispatch = useDispatch();

  const [dateRange, setDateRange] = React.useState({
    startDate: null,
    endDate: null,
  });

  const handleStartDateChange = (date) => {
    setDateRange((prev) => ({
      ...prev,
      startDate: date,
    }));
  };

  const handleEndDateChange = (date) => {
    setDateRange((prev) => ({
      ...prev,
      endDate: date,
    }));
  };

  const filteredRequests = requests?.filter((req) => {
    const reqDate = parseDate(req.requestDate);

    if (dateRange.startDate) {
      const start = new Date(dateRange.startDate);
      start.setHours(0, 0, 0, 0);

      if (reqDate < start) return false;
    }

    if (dateRange.endDate) {
      const end = new Date(dateRange.endDate);
      end.setHours(23, 59, 59, 999);

      if (reqDate > end) return false;
    }

    return true;
  });

  const fetchUserRequests = async () => {
    try {
      const response = await api.get('/users/request');
      return response.data;
    } catch (err) {
      console.error('Ошибка при загрузке запросов:', err);
      return [];
    }
  };

  React.useEffect(() => {
    fetchUserRequests().then((response) => {
      dispatch(userRequestsHistory(response));
    });
  }, []);

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
          История обращений
        </Box>
        <Box className="main-subtitle">
          Включает информацию об активном текущем запросе и об истекших запросах
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: 5,
          }}
        >
          <Box
            sx={{
              width: '40%',
            }}
          >
            <InputFilLabelled
              name="last_name"
              placeholder=" Введите значение для поиска"
              fieldSx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: '15px', pointerEvents: 'none' }}>
                    <SearchIcon
                      sx={{
                        fontSize: 20,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <SimpleDateRangePicker
            startValue={dateRange.startDate}
            endValue={dateRange.endDate}
            onStartChange={handleStartDateChange}
            onEndChange={handleEndDateChange}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: '50px 0 15px 0' }}>
          {!requests && (
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={50} />
            </Box>
          )}
          {filteredRequests
            ?.slice()
            .sort((a, b) => {
              const statusA = a.status ?? 'CLOSED';
              const statusB = b.status ?? 'CLOSED';

              if (statusA === 'CLOSED' && statusB !== 'CLOSED') return 1;
              if (statusB === 'CLOSED' && statusA !== 'CLOSED') return -1;

              const dateA = parseDate(a.requestDate);
              const dateB = parseDate(b.requestDate);
              return dateB - dateA; // Сортировка от новых к старым
            })
            .map((req) => (
              <LoanRequestCard key={req.id} request={req} />
            ))}
        </Box>
        <Box>
          {' '}
          <PaginationPlaceholder />{' '}
        </Box>
      </Box>
    </Paper>
  );
}
