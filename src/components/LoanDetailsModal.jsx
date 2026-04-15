import React from 'react';
import { Box, Divider, Typography, Tooltip, CircularProgress } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SimpleModal from './SimpleModal';
import LoanScheduleModal from './LoanScheduleModal/LoanScheduleModal';
import { banksMapNames, banksMapUrls } from '../../utils/banksMap';
import {
  formatCurrency,
  formatDuration,
  convertToMonths,
  SimpleformatDate,
} from '../../utils/format';
import { loansStatusMap, loanTypeMap } from '../../utils/SelectEnumes';
import api from '../api/axiosConfig';

const getStatusMeta = (status) => {
  if (status == null) return loansStatusMap.UNKNOWN;
  return loansStatusMap[status] || loansStatusMap.UNKNOWN;
};

const DOC_POLL_INTERVAL_MS = 5000;
const DOC_POLL_MAX_ATTEMPTS = 12;

async function fetchDocWithPolling(loanId, docType, attempt = 1) {
  const path = docType === 'info' ? 'users/response/doc/info' : 'users/response/doc/loan';
  const filename = docType === 'info' ? 'Условия кредитования.pdf' : 'Кредитный договор.pdf';
  try {
    const res = await api.get(path, { params: { loanId }, responseType: 'blob' });
    return { blob: res.data, filename };
  } catch (err) {
    if (err.response?.status === 404 && attempt < DOC_POLL_MAX_ATTEMPTS) {
      await new Promise((resolve) => {
        setTimeout(resolve, DOC_POLL_INTERVAL_MS);
      });
      return fetchDocWithPolling(loanId, docType, attempt + 1);
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

export default function LoanDetailsModal({ open, onClose, loan }) {
  const [scheduleOpen, setScheduleOpen] = React.useState(false);

  const [docLoanForming, setDocLoanForming] = React.useState(false);
  const [docInfoForming, setDocInfoForming] = React.useState(false);

  const handleDownloadDoc = async (docType) => {
    const setForming = docType === 'info' ? setDocInfoForming : setDocLoanForming;
    setForming(true);
    try {
      const result = await fetchDocWithPolling(loan.id, docType);
      if (result) {
        triggerBlobDownload(result.blob, result.filename);
      } else {
        // onSuccess?.('Документ ещё формируется', 'Попробуйте скачать через минуту.');
      }
    } catch (err) {
      // onSuccess?.(
      //   'Ошибка',
      //   err.response?.status === 404
      //     ? 'Документ ещё формируется. Попробуйте через минуту.'
      //     : 'Не удалось загрузить документ.',
      // );
    } finally {
      setForming(false);
    }
  };

  if (!loan) return null;

  const bank = banksMapNames[loan.bank] || banksMapNames.UNKNOWN;
  const bankUrl = banksMapUrls[loan.bank] || null;
  const scheduleType = loan.scheduleType ? loan.scheduleType.toLowerCase() : 'annuity';

  return (
    <>
      <SimpleModal open={open} onClose={onClose} maxWidth="none" fullWidth={false} title={null}>
        <Box sx={{ p: '8px 4px' }}>
          <img
            src="./images/close.svg"
            alt="close_modal"
            style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}
            onClick={onClose}
          />
          {/* Bank header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #eee',
                backgroundColor: '#fff',
              }}
            >
              <img
                src={bank.src}
                alt={bank.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
            <Box>
              <Typography fontSize={18} fontWeight={400} color="#1A1A1A">
                {bank.name}
              </Typography>
              <Typography fontSize={15} color="#7F7F7F">
                {loanTypeMap[loan.loanType] || 'Потребительский кредит'}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 5,
              justifyContent: 'space-between',
              background: '#F1F0FF',
              borderRadius: '8px',
              p: '12px 16px',
              mb: 2,
            }}
          >
            <MetricChip label="Сумма" value={`${formatCurrency(loan.amount)} BYN`} />
            <MetricChip label="Ставка" value={`${loan.rate}%`} />
            <MetricChip label="Срок" value={formatDuration(loan.term)} />
            {loan.contractDate && (
              <MetricChip label="Начало" value={SimpleformatDate(loan.contractDate)} />
            )}
          </Box>

          <Divider />

          <ActionRow
            icon={<CalendarMonthOutlinedIcon sx={{ color: '#2260BC', fontSize: 22 }} />}
            label={<span style={{ fontSize: 18, fontWeight: 400 }}>График платежей</span>}
            end={<ChevronRightIcon sx={{ color: '#CACACA' }} />}
            onClick={() => setScheduleOpen(true)}
            sx={{
              fontSize: 18,
              fontWeight: '400',
            }}
          />

          <Divider />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', p: '24px 4px' }}>
            <Typography
              fontSize={18}
              fontWeight={400}
              color="#1A1A1A"
              sx={{
                pb: '0',
                display: 'flex',
                justifyContent: ' flex-start',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <DescriptionOutlinedIcon sx={{ color: '#2260BC' }} />
              <span>Скачать документы</span>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, pl: 4 }}>
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

            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, pl: 4 }}>
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

          <Divider />

          <Tooltip
            title={bankUrl ? '' : 'Скоро будет доступно'}
            placement="top"
            disableHoverListener={!!bankUrl}
          >
            <Box>
              <ActionRow
                icon={
                  <LanguageOutlinedIcon
                    sx={{ color: bankUrl ? '#2260BC' : '#CACACA', fontSize: 22 }}
                  />
                }
                label={<span style={{ fontSize: 18, fontWeight: 400 }}>Перейти на сайт банка</span>}
                labelColor={bankUrl ? '#1A1A1A' : '#CACACA'}
                end={
                  <OpenInNewIcon sx={{ color: bankUrl ? '#CACACA' : '#E0E0E0', fontSize: 18 }} />
                }
                onClick={
                  bankUrl ? () => window.open(bankUrl, '_blank', 'noopener,noreferrer') : undefined
                }
                disabled={!bankUrl}
              />
            </Box>
          </Tooltip>
        </Box>
      </SimpleModal>

      <LoanScheduleModal
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        loanAmount={loan.amount}
        term={convertToMonths(loan.term)}
        rate={loan.rate}
        type={scheduleType}
      />
    </>
  );
}

function ActionRow({ icon, label, end, onClick, disabled = false, labelColor = '#1A1A1A' }) {
  return (
    <Box
      onClick={disabled ? undefined : onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1.5,
        cursor: disabled ? 'default' : onClick ? 'pointer' : 'default',
        borderRadius: '6px',
        px: '4px',
        '&:hover': {
          background: disabled || !onClick ? 'transparent' : '#f7f7f7',
        },
        transition: 'background 0.15s',
      }}
    >
      {icon}
      <Typography fontSize={15} color={labelColor} sx={{ flex: 1 }}>
        {label}
      </Typography>
      {end}
    </Box>
  );
}

function MetricChip({ label, value }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
      <Typography fontSize={16} fontWeight={600} color="#1A1A1A">
        {value}
      </Typography>
      <Typography fontSize={14} fontWeight={400} color="#7F7F7F">
        {label}
      </Typography>
    </Box>
  );
}
