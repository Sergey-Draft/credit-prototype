/* eslint-disable arrow-body-style */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Box, Typography, Divider, Checkbox, CircularProgress } from '@mui/material';

import { CheckboxField, StyledButton } from './ReusableInputs/MainAppStyledElements';
import SimpleModal from './SimpleModal';
import { loanTypeMap } from '../../utils/SelectEnumes';
import { banksMap, banksMapNames } from '../../utils/banksMap';
import {
  useRejectLoanMutation,
  useSelectLoanMutation,
  useSignLoanMutation,
} from '../services/userApi';
import { convertToMonths, formatDuration } from '../../utils/format';
import GlobalLoader from './GlobalLoader';
import api from '../api/axiosConfig';
import LoanScheduleModal from './LoanScheduleModal/LoanScheduleModal';

const DOC_POLL_INTERVAL_MS = 5000;
const DOC_POLL_MAX_ATTEMPTS = 12;

async function fetchDocWithPolling(requestId, docType, attempt = 1) {
  const path = docType === 'info' ? 'users/response/doc/info' : 'users/response/doc/loan';
  const filename = docType === 'info' ? 'Условия кредитования.pdf' : 'Кредитный договор.pdf';
  try {
    const res = await api.get(path, { params: { requestId }, responseType: 'blob' });
    return { blob: res.data, filename };
  } catch (err) {
    if (err.response?.status === 404 && attempt < DOC_POLL_MAX_ATTEMPTS) {
      await new Promise((resolve) => {
        setTimeout(resolve, DOC_POLL_INTERVAL_MS);
      });
      return fetchDocWithPolling(requestId, docType, attempt + 1);
    }
    throw err;
  }
}

function triggerBlobDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function CreditResultCardNoStatus({
  item,
  selected,
  onSelect,
  canSign,
  responseId,
  currentStatus,
  selectingGlobal,
  setSelectingGlobal,
  onSuccess,
}) {
  const [open, setOpen] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [docInfoForming, setDocInfoForming] = React.useState(false);
  const [docLoanForming, setDocLoanForming] = React.useState(false);
  const [scheduleOpen, setScheduleOpen] = React.useState(false);
  const [selectLoan] = useSelectLoanMutation();
  const [rejectLoan, { isLoading: rejectloading }] = useRejectLoanMutation();
  const [signLoan, { isLoading: signLoading }] = useSignLoanMutation();

  const pollingRef = React.useRef(null);

  const handleScheduleOpen = () => {
    setScheduleOpen(true);
  };

  const handleStart = async () => {
    try {
      setSelectingGlobal(true);

      await selectLoan({
        responseId,
        loanProdId: item.loanProductId,
      });

      setOpen(true);
    } finally {
      setSelectingGlobal(false);
    }
  };

  const handleSign = async () => {
    if (!isChecked) return;

    try {
      await signLoan({
        requestId: responseId,
        agreement: true,
      }).unwrap();

      setOpen(false);
      onSuccess?.(
        'Успешно',
        <>
          <div>Договор успешно подписан.</div>
          <div>
            Со всей информацией по кредиту вы можете ознакомиться на вкладке{' '}
            <Link
              component={RouterLink}
              to="/loans"
              underline="hover"
              sx={{ color: '#2260BC', fontWeight: 500 }}
            >
              Мои кредиты
            </Link>
            .
          </div>
          <span>Для перечисления денежных средств обратитесь в </span>
        </>,
        item.bank,
      );
    } catch (error) {
      onSuccess?.(
        'Ошибка',
        'Произошла ошибка. Попробуйте вернуться к оформлению договора через несколько минут',
      );
    }
  };

  const handleReject = async () => {
    try {
      await rejectLoan(responseId).unwrap();
      setOpen(false);

      setOpen(false);
      onSuccess?.('Успешно', 'Оформление договора отменено');
    } catch (error) {
      onSuccess?.(
        'Ошибка',
        'Произошла ошибка. Попробуйте вернуться к оформлению договора через несколько минут',
      );
    }
  };

  const handleDownloadDoc = async (docType) => {
    const setForming = docType === 'info' ? setDocInfoForming : setDocLoanForming;
    setForming(true);
    try {
      const result = await fetchDocWithPolling(responseId, docType);
      if (result) {
        triggerBlobDownload(result.blob, result.filename);
      } else {
        onSuccess?.('Документ ещё формируется', 'Попробуйте скачать через минуту.');
      }
    } catch (err) {
      onSuccess?.(
        'Ошибка',
        err.response?.status === 404
          ? 'Документ ещё формируется. Попробуйте через минуту.'
          : 'Не удалось загрузить документ.',
      );
    } finally {
      setForming(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const isProcessing = currentStatus === 'DRAWN_UP';
  const awaitingSign = currentStatus === 'AWAITING_SIGN';

  const hasContent = isProcessing || awaitingSign;

  return (
    <>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          background: '#fff',
          borderRadius: '8px',
          padding: '24px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          border: selected ? '1px solid #2260BC' : '1px solid #CACACA',
          // pointerEvents: selectingGlobal ? 'none' : 'auto',
          // opacity: selectingGlobal ? '0.7!important' : 1,
        }}
        className="animate__animated animate__fadeIn"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '25%',
          }}
        >
          <Checkbox
            checked={selected}
            onChange={onSelect}
            onClick={(e) => e.stopPropagation()}
            sx={{ position: 'absolute', top: 0, left: 0 }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}
            >
              <img
                src={banksMap[item.bank] || '/bank-logos/belarus.png'}
                alt={item.bank}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>

            <Box>
              <Typography fontSize={16} fontWeight={400}>
                {item.productDescription || 'Потребительский кредит'}
              </Typography>
              <Typography fontSize={14} fontWeight={400} color="#7F7F7F">
                {banksMapNames[item.bank]?.name || 'НЕИЗВЕСТНО'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '50%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0px 20px',
            }}
          >
            <Metric label="Ставка" value={`${item.rate}%`} />
            <Metric label="Платеж" value={`${item.pay} BYN`} />
            <Metric label="Сумма" value={`${item.amount.toLocaleString()}`} />
            <Metric
              label="Срок"
              value={formatDuration(item.term)}
              sx={{ fontWeight: '500', fontSize: '20px' }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}
          >
            {item?.productFeat?.map((tag) => (
              <Box
                key={tag}
                sx={{
                  backgroundColor: '#F1F0FF',
                  px: '20px',
                  py: '12px',
                  borderRadius: '30px',
                  fontSize: 14,
                  fontWeight: '400',
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start',
            gap: 1,
          }}
        >
          <StyledButton
            onClick={() => handleStart(item)}
            text={currentStatus === 'AWAITING_SIGN' ? 'Подписать договор' : 'Оформить договор'}
            disabled={!canSign}
            loading={selectingGlobal}
            type="button"
          />

          <Typography
            onClick={handleScheduleOpen}
            sx={{
              fontSize: 15,
              color: '#2260BC',
              cursor: selectingGlobal ? 'wait' : 'pointer',
              mt: '10px',
            }}
          >
            График погашения
          </Typography>
        </Box>
      </Box>
      {open && hasContent && (
        <SimpleModal
          open={open}
          onClose={() => setOpen(false)}
          sx={{ maxWidth: `${isProcessing ? '650px' : 'auto'}` }}
        >
          {isProcessing && (
            <Box sx={{ padding: '20px 40px' }}>
              <Box sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A', mb: '50px' }}>
                <Box sx={{ mb: 2 }}>Идёт формирование документов</Box>
                <Box>
                  Пожалуйста, дождитесь изменение статуса активного запроса по подбору кредита на
                  &ldquo;Ожидает подписания&ldquo;
                </Box>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress size={50} />
              </Box>
            </Box>
          )}

          {awaitingSign && (
            <Box sx={{ padding: '20px 40px' }}>
              <Box sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A', mb: '8px' }}>
                Документы сформированы
              </Box>
              <Box sx={{ fontSize: 15, fontWeight: 400, color: '#7F7F7F' }}>
                пожалуйста, ознакомьтесь и нажмите «Подписать»
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', p: '32px 0' }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Box sx={{ width: 180, fontSize: 15, color: '#7F7F7F' }}>
                    Условия кредитования
                  </Box>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => handleDownloadDoc('info')}
                    disabled={docInfoForming}
                    sx={{
                      fontSize: 15,
                      color: '#2260BC',
                      cursor: docInfoForming ? 'wait' : 'pointer',
                      border: 'none',
                      background: 'none',
                      textAlign: 'left',
                      p: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    {docInfoForming ? (
                      <>
                        <CircularProgress size={14} />
                        Документ формируется…
                      </>
                    ) : (
                      'Условия кредитования.pdf'
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Box sx={{ width: 180, fontSize: 15, color: '#7F7F7F' }}>Кредитный договор</Box>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => handleDownloadDoc('loan')}
                    disabled={docLoanForming}
                    sx={{
                      fontSize: 15,
                      color: '#2260BC',
                      cursor: docLoanForming ? 'wait' : 'pointer',
                      border: 'none',
                      background: 'none',
                      textAlign: 'left',
                      p: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    {docLoanForming ? (
                      <>
                        <CircularProgress size={14} />
                        Документ формируется…
                      </>
                    ) : (
                      'Кредитный договор.pdf'
                    )}
                  </Box>
                </Box>
              </Box>

              <CheckboxField
                label="Подтверждаю, что ознакомлен и согласен с условиями кредитного договора"
                chekboxSX={{ ml: '-10px' }}
                labelSx={{ fontSize: 14, color: '#1A1A1A' }}
                onChange={(e) => setIsChecked(e.target.checked)}
              />

              <Divider sx={{ m: '18px 0 28px 0' }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <StyledButton text="Отказаться" variant="outlined" onClick={handleReject} />
                <StyledButton text="Назад" variant="outlined" onClick={() => setOpen(false)} />
                <StyledButton text="Подписать" onClick={handleSign} disabled={!isChecked} />
              </Box>
            </Box>
          )}
        </SimpleModal>
      )}

      <LoanScheduleModal
        open={scheduleOpen}
        onClose={() => {
          setScheduleOpen(false);
        }}
        loanAmount={item?.amount}
        term={convertToMonths(item?.term)}
        rate={item?.rate}
        type={item?.scheduleType.toLowerCase()}
      />

      <GlobalLoader loading={rejectloading || signLoading} text="Обработка запроса..." />
    </>
  );
}

const Metric = ({ label, value }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Typography fontWeight={500} fontSize={20} lineHeight={1.3}>
      {value}
    </Typography>
    <Typography fontSize={14} fontWeight={400} color="#7F7F7F">
      {label}
    </Typography>
  </Box>
);
