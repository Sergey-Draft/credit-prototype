/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';

import { Box, Paper } from '@mui/material';

import CreditForm from '../components/CreditForm';
import getUserData from '../../utils/getUserData';
import BankList from '../components/BankList';
import LoanRequestCard from '../components/RequestCard';
import SimpleModal from '../components/SimpleModal';
import { StyledButton } from '../components/ReusableInputs/MainAppStyledElements';
import SortToggle from '../components/SortToggle';
import api from '../api/axiosConfig';
import CreditResultCardNoStatus from '../components/CreditResultCardNoStatus';
import { useGetActiveUserRequestsQuery, useGetRequestResponseQuery } from '../services/userApi';
import { banks } from '../mocks/banks';
import { finantialsInst } from '../mocks/finantialsInst';
import { leasingInst } from '../mocks/leasingInst';
import { banksMapNames } from '../../utils/banksMap';

const DashboardPage = () => {
  const userData = getUserData();

  const [selectedIds, setSelectedIds] = useState([]);
  const [children, setChildren] = useState(null);
  const [open, setOpen] = useState(false);
  const [openCompare, setOpenCompare] = useState(false);
  const [loanSelecting, setLoanSelecting] = useState(false);
  const SHOW_PRODUCTS = ['ACTIVE', 'DRAWN_UP', 'AWAITING_SIGN'];

  const [notificationState, setNotificationState] = useState({
    open: false,
    title: '',
    message: '',
    bank: '',
  });

  const [sort, setSort] = useState({
    type: 'amount',
    direction: 'desc',
  });

  const { data: loanRequests = [] } = useGetActiveUserRequestsQuery(undefined);
  const activeStatus = loanRequests?.[0]?.status;

  const enablePolling = activeStatus === 'DRAWN_UP' || activeStatus === 'IN_PROCESSING';

  useGetActiveUserRequestsQuery(undefined, {
    skip: !enablePolling,
    pollingInterval: 5000,
  });

  const activeRequest = loanRequests[0];
  const requestId = activeRequest?.requestId;

  // во время полинга при переходе заявки в статус ACTIVE,
  // нужен принудительный запрос за productList
  const { data: responseData, refetch: refetchResponse } = useGetRequestResponseQuery(requestId, {
    skip: !requestId,
    refetchOnMountOrArgChange: true,
  });

  const fetchRequestResponse = async (resId) => {
    try {
      const response = await api.get(`/users/response?responseId=${resId}`);

      return response.data;
    } catch (err) {
      console.error('Ошибка при загрузке ответа по запросу:', err);
      throw err;
    }
  };

  const handleModalOpen = async (source) => {
    setOpen(true);
    setChildren(source);

    try {
      const data = await fetchRequestResponse(source.requestId);
      setChildren(data);
    } catch (e) {
      setChildren([]);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const selectedItems = React.useMemo(
    () => responseData?.productList?.filter((item) => selectedIds.includes(item.loanProductId)),
    [responseData?.productList, selectedIds],
  );

  const handleCompareOpen = () => {
    setOpenCompare(true);
  };

  const productList = React.useMemo(() => {
    if (!SHOW_PRODUCTS.includes(activeStatus)) return [];
    return responseData?.productList ?? [];
  }, [activeStatus, responseData]);

  const sortedProducts = React.useMemo(() => {
    const field = sort.type === 'amount' ? 'pay' : 'rate';

    return [...productList].sort((a, b) =>
      sort.direction === 'desc' ? b[field] - a[field] : a[field] - b[field],
    );
  }, [productList, sort]);

  // делаем принудительный запрос, для того чтобы обновить productList
  useEffect(() => {
    if (activeStatus === 'ACTIVE' || activeStatus === 'DRAWN_UP') {
      refetchResponse();
    }
  }, [activeStatus, refetchResponse]);

  return (
    <>
      <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden', padding: '48px 60px' }}>
        <Box sx={{ mb: 2 }}>
          <Box className="main-title" sx={{ mb: 2 }}>
            Подбор кредита
          </Box>
          <Box className="main-subtitle">Укажите интересующие вас параметры подбора кредита</Box>
        </Box>

        <CreditForm userData={userData} />

        <Box sx={{ display: 'flex', flexDirection: 'column', m: '48px 0' }}>
          <Box className="block-title" sx={{ mb: '20px' }}>
            Активный запрос
          </Box>
          {!loanRequests || loanRequests.length === 0 ? (
            <span>нет активных запросов</span>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {loanRequests.map((req) => (
                <LoanRequestCard
                  key={req.requestId}
                  request={req}
                  onSign={() => handleModalOpen(req)}
                />
              ))}
            </Box>
          )}
        </Box>

        <Box
          sx={{
            height: '63px',
            background:
              'linear-gradient(90deg, rgba(228,228,228,0.44) 0%, rgba(221,221,220,0.31) 43%, rgba(221,221,220,0.26) 53%, rgba(221,221,220,0.24) 58%, rgba(221,221,220,0.03) 100%);',
            display: `${activeRequest?.status === 'NOT_FOUND' ? 'flex' : 'none'}`,
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '0px -60px',
            padding: '0 60px',
          }}
        >
          <img src="/images/priority.svg" alt="warn_img" />

          <span
            style={{
              fontSize: '16px',
              fontWeight: 400,
            }}
          >
            По вашему запросу ничего не найдено. Попробуйте изменить параметры подбора.{' '}
          </span>
        </Box>

        <Box>
          {productList.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: '48px 0' }}>
              <Box className="block-title" sx={{ mb: '10px' }}>
                {' '}
                Результаты поиска{' '}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ fontSize: '16px', fontWeight: '500', color: '#1A1A1A' }}>
                  {' '}
                  Полное соответствие
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <SortToggle
                    active={sort.type === 'amount'}
                    label={
                      sort.direction === 'desc' && sort.type === 'amount'
                        ? 'С большей суммой платежа'
                        : 'С меньшей суммой платежа'
                    }
                    direction={sort.direction}
                    onClick={() =>
                      setSort((prev) => ({
                        type: 'amount',
                        direction:
                          prev.type === 'amount'
                            ? prev.direction === 'desc'
                              ? 'asc'
                              : 'desc'
                            : 'desc',
                      }))
                    }
                    sx={{
                      opacity: sort.type === 'amount' ? 1 : 0.5,
                    }}
                  />

                  <Box sx={{ color: '#CBD5E1', mx: 1 }}>|</Box>
                  <SortToggle
                    active={sort.type === 'rate'}
                    label={
                      sort.direction === 'desc' && sort.type === 'rate'
                        ? 'С большей ставкой'
                        : 'С меньшей ставкой'
                    }
                    direction={sort.direction}
                    onClick={() =>
                      setSort((prev) => ({
                        type: 'rate',
                        direction:
                          prev.type === 'rate'
                            ? prev.direction === 'desc'
                              ? 'asc'
                              : 'desc'
                            : 'desc',
                      }))
                    }
                    sx={{
                      opacity: sort.type === 'rate' ? 1 : 0.5,
                    }}
                  />
                </Box>
              </Box>
              {sortedProducts?.map((item) => (
                <CreditResultCardNoStatus
                  key={item.loanProductId}
                  item={item}
                  responseId={requestId}
                  currentStatus={activeRequest?.status}
                  selectingGlobal={loanSelecting}
                  setSelectingGlobal={setLoanSelecting}
                  canSign={responseData?.status === 'DONE'}
                  selected={selectedIds.includes(item.loanProductId)}
                  onSelect={() => toggleSelect(item.loanProductId)}
                  onSuccess={(title, message, bank) =>
                    setNotificationState({ open: true, title, message, bank })
                  }
                />
              ))}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  pt: '16px',
                }}
              >
                <StyledButton
                  text="Сравнить кредитные условия"
                  variant="text"
                  sx={{
                    color: `${selectedItems?.length === 0 ? '#7F7F7F' : '#2260BC'}`,
                    border: `${selectedItems?.length === 0 ? '1px solid #CACACA' : '1px solid #2260BC'}`,
                  }}
                  onClick={handleCompareOpen}
                />
              </Box>
            </Box>
          )}
        </Box>

        <Box className="block-title" sx={{ mb: '20px', mt: 6 }}>
          Банки
        </Box>
        <BankList banks={banks} />
        <Box className="block-title" sx={{ mb: '20px', mt: 6 }}>
          Микрофинансовые организации
        </Box>
        <BankList banks={finantialsInst} />
        <Box className="block-title" sx={{ mb: '20px', mt: 6 }}>
          Лизинговые компании
        </Box>
        <BankList banks={leasingInst} />
      </Paper>

      <SimpleModal open={open} onClose={() => setOpen(false)} title="Доступные продукты">
        <pre>{JSON.stringify(children, null, 2)}</pre>
      </SimpleModal>

      <SimpleModal
        open={openCompare}
        onClose={() => setOpenCompare(false)}
        title="Сравнить варианты"
      >
        {selectedItems && selectedItems.length > 0 ? (
          selectedItems.map((item) => <pre key={item.id}>{JSON.stringify(item, null, 2)}</pre>)
        ) : (
          <span>Выберите из результатов поиска кредиты для сравнения (чекбокс сверху слева)</span>
        )}
      </SimpleModal>

      <SimpleModal
        open={notificationState.open}
        onClose={() =>
          setNotificationState((prev) => ({
            ...prev,
            open: false,
          }))
        }
        title={notificationState.title}
        maxWidth={false}
        fullWidth={false}
      >
        {(() => {
          const bankName = banksMapNames[notificationState.bank]?.name || null;
          const bankUrl = banksMapNames[notificationState.bank]?.url || null;
          return (
            <Box sx={{ p: '16px 16px 16px 0', ml: '-8px' }}>
              <Box
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: '#1A1A1A',
                  whiteSpace: 'pre-line',
                }}
              >
                {notificationState.message}
                <Box
                  component="span"
                  onClick={
                    bankUrl
                      ? () => window.open(bankUrl, '_blank', 'noopener,noreferrer')
                      : undefined
                  }
                  sx={{
                    color: '#2260BC',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'inline',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {bankName}
                </Box>
              </Box>
            </Box>
          );
        })()}
      </SimpleModal>
    </>
  );
};

export default DashboardPage;
