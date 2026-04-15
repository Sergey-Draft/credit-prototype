import React from 'react';
import { Box, Typography, Divider, Checkbox, CircularProgress } from '@mui/material';
import { CheckboxField, StyledButton } from './ReusableInputs/MainAppStyledElements';
import SimpleModal from './SimpleModal';

const CREDIT_FLOW_STATUS = {
  ACTIVE: 'active',
  DISACTIVE: 'disactive',
  IN_PROGRESS: 'in_progress',
  AWAITING_SIGNATURE: 'awaiting_signature',
  SIGNED: 'signed',
  REJECTED: 'rejected',
};

export default function CreditResultCard({ item, selected, onSelect, onSign }) {
  const [status, setStatus] = React.useState(item.status);
  const [open, setOpen] = React.useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const getButtonText = (source) => {
    switch (source) {
      case CREDIT_FLOW_STATUS.ACTIVE:
        return 'Оформить договор';

      case CREDIT_FLOW_STATUS.IN_PROGRESS:
        return 'Оформление договора';

      case CREDIT_FLOW_STATUS.AWAITING_SIGNATURE:
        return 'Подписать договор';

      case CREDIT_FLOW_STATUS.SIGNED:
        return 'Подписано';

      default:
        return 'Недоступно';
    }
  };

  const startContract = async () => {
    setStatus(CREDIT_FLOW_STATUS.IN_PROGRESS);

    setTimeout(() => {
      setStatus(CREDIT_FLOW_STATUS.AWAITING_SIGNATURE);
    }, 5000);
  };

  React.useEffect(() => {
    if (!open) return;

    if (status === CREDIT_FLOW_STATUS.ACTIVE) {
      startContract();
    }
  }, [open, status]);

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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '27%',
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
                src={item.logo}
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
                {item.type || 'Потребительский кредит'}
              </Typography>
              <Typography fontSize={14} fontWeight={400} color="#7F7F7F">
                {item.bank}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* METRICS */}
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
            <Metric label="Платеж" value={`${item.payment} BYN`} />
            <Metric label="Сумма" value={`${item.amount.toLocaleString()}`} />
            <Metric label="Срок" value={item.term} sx={{ fontWeight: '500', fontSize: '20px' }} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}
          >
            {item.tags?.map((tag) => (
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
          <StyledButton onClick={handleModalOpen} text={getButtonText(status)} type="button" />

          <Typography
            sx={{
              fontSize: 15,
              color: '#2260BC',
              cursor: 'pointer',
              mt: '10px',
            }}
          >
            Условия
          </Typography>
        </Box>
      </Box>
      <SimpleModal open={open} onClose={() => setOpen(false)}>
        {status === CREDIT_FLOW_STATUS.IN_PROGRESS && (
          <Box sx={{ padding: '20px 40px' }}>
            <Box sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A', mb: '75px' }}>
              <Box sx={{ mb: 2 }}>Идёт формирование документов</Box>
              <Box>Приблизительное время ожидания 1 минута</Box>
            </Box>
            <Box sx={{ textAlign: 'center', pb: '50px' }}>
              <CircularProgress size={50} />
            </Box>
          </Box>
        )}

        {status === CREDIT_FLOW_STATUS.AWAITING_SIGNATURE && (
          <Box sx={{ padding: '20px 40px' }}>
            <Box sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A', mb: '8px' }}>
              Документы сформированы
            </Box>
            <Box sx={{ fontSize: 15, fontWeight: 400, color: '#7F7F7F' }}>
              пожалуйста, ознакомьтесь и нажмите «Подписать»
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', p: '32px 0' }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Box sx={{ width: 180, fontSize: 15, color: '#7F7F7F' }}>Условия кредитования</Box>
                <Box
                  sx={{
                    fontSize: 15,
                    color: '#2260BC',
                    cursor: 'pointer',
                  }}
                >
                  Условия кредитования.pdf
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Box sx={{ width: 180, fontSize: 15, color: '#7F7F7F' }}>Кредитный договор</Box>
                <Box
                  sx={{
                    fontSize: 15,
                    color: '#2260BC',
                    cursor: 'pointer',
                  }}
                >
                  Кредитный договор.pdf
                </Box>
              </Box>
            </Box>

            <CheckboxField
              label="Подтверждаю, что ознакомлен и согласен с условиями кредитного договора"
              chekboxSX={{ ml: '-10px' }}
              labelSx={{ fontSize: 14, color: '#1A1A1A' }}
            />

            <Divider sx={{ m: '18px 0 28px 0' }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <StyledButton text="Отказаться" variant="outlined" onClick={() => setOpen(false)} />
              <StyledButton text="Назад" variant="outlined" onClick={() => setOpen(false)} />
              <StyledButton text="Подписать" onClick={() => setOpen(false)} />
            </Box>
          </Box>
        )}
      </SimpleModal>
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
