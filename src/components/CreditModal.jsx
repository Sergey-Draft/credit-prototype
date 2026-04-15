import React from 'react';
import { Dialog, DialogContent, Box, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  CheckboxField,
  InputFilLabelled,
  StyledButton,
} from './ReusableInputs/MainAppStyledElements';
import GlobalLoader from './GlobalLoader';
import api from '../api/axiosConfig';
import SimpleModal from './SimpleModal';
import { userLoansHistory } from '../../RTK/userSlice';
import { SimpleformatDate } from '../../utils/format';
import { useCreateLoanRequestMutation } from '../services/userApi';

export default function CreditModal({ open, onClose, userData, creditData }) {
  const [openResponse, setOpenResponse] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [reportAgree, setReportAgree] = React.useState(false);
  const [personalConfirm, setPersonalConfirm] = React.useState(false);
  const [createLoanRequest, { isLoading }] = useCreateLoanRequestMutation();

  const setCloseModals = () => {
    setOpenResponse(false);
    onClose();
  };

  const handleCloseCreditModal = () => {
    setReportAgree(false);
    setPersonalConfirm(false);
    onClose();
  };

  const submitCreditRequest = async () => {
    setMessage(null);

    const payload = {
      loanType: creditData.loanType,
      amount: Number(String(creditData.amount).replace(',', '.')),
      term: `${creditData.term}${creditData.unit}`,
      prinDecr: true,
      secured: creditData.secured,
      bank: 'SBERBANK',
      education: creditData.education,
      martialStatus: creditData.martialStatus,
      dependents: creditData.dependents,
      realEstate: creditData.realEstate,
      car: creditData.car,
      experience: 1,
      income: 7911836.0,
    };

    try {
      const response = await createLoanRequest(payload).unwrap();
      setReportAgree(false);
      setPersonalConfirm(false);
      onClose();
    } catch (e) {
      if (e.isUserProcessing) {
        setMessage('Идентификация клиента в процессе. Попробуйте отправить заявку чуть позже');
      } else if (e?.status === 423 || e?.response?.status === 423) {
        setMessage('Идентификация клиента в процессе. Попробуйте отправить заявку чуть позже');
      } else {
        console.log(
          'error:',
          e?.response?.data || e?.response?.data.message || { error: 'UNKNOWN_ERROR' },
        );
        // setMessage(e?.response?.data || e?.response?.data.message || { error: 'UNKNOWN_ERROR' });
        setMessage('По вашему запросу ничего не найдено. Попробуйте изменить параметры подбора');
      }
      setOpenResponse(true);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseCreditModal}
        maxWidth={false}
        fullWidth
        scroll="paper"
        sx={{
          padding: '70px 60px',
          '& .MuiDialog-paper': {
            height: '93vh',
            maxHeight: '820px',
            width: '1000px',
            maxWidth: '1000px',
          },
        }}
      >
        <DialogContent sx={{ padding: '30px 60px' }}>
          <span
            onClick={handleCloseCreditModal}
            style={{ cursor: 'pointer', position: 'absolute', right: '25px', top: '30px' }}
          >
            <img src="/images/close.svg" alt="close_img" />
          </span>
          <Box
            sx={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#123B79',
              pb: '20px',
            }}
          >
            Данные для подтверждения
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                fontSize: '18px',
                fontWeight: '800',
                mb: '16px',
                pointerEvents: 'none',
              }}
            >
              {' '}
              Личные данные
            </Box>
            <Box sx={{ display: 'flex', gap: 14, mb: 0, pointerEvents: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  flex: 1,
                  maxWidth: '360px',
                }}
              >
                <InputFilLabelled label="Фамилия" value={userData?.lastName || ''} readOnly />
                <InputFilLabelled label="Имя" value={userData?.firstName || ''} readOnly />
                <InputFilLabelled label="Отчество" value={userData?.middleName || ''} readOnly />
                <InputFilLabelled
                  label="Дата рождения"
                  value={SimpleformatDate(userData?.birthDate) || ''}
                  readOnly
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                <InputFilLabelled label="Личный номер" value={userData?.pinfl || ''} readOnly />

                <InputFilLabelled
                  label="Номер паспорта"
                  value={userData?.docNumber || ''}
                  readOnly
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <InputFilLabelled
                    label="Дата выдачи"
                    value={SimpleformatDate(userData?.docIssueDate) || ''}
                    readOnly
                  />

                  <InputFilLabelled
                    label="Срок действия"
                    value={SimpleformatDate(userData?.docExpireDate) || ''}
                    readOnly
                  />
                </Box>

                <InputFilLabelled
                  label="Орган выдавший документ"
                  value={userData?.docIssuer || ''}
                  multiline
                  readOnly
                />
              </Box>
            </Box>

            <Box
              sx={{
                fontSize: '18px',
                fontWeight: '800',
                m: '10px 0 16px 0',
                pointerEvents: 'none',
              }}
            >
              {' '}
              Контактная информация
            </Box>
            <Box sx={{ display: 'flex', gap: 14, mb: 2, pointerEvents: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  flex: 1,
                  maxWidth: '360px',
                }}
              >
                <InputFilLabelled
                  label="Мобильный телефон"
                  value={userData?.phone || ''}
                  readOnly
                />
                <InputFilLabelled
                  label="Адрес регистрации"
                  value={userData?.registerAddress || ''}
                  multiline
                  readOnly
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                <InputFilLabelled label="E-mail" value={userData?.email || ''} readOnly />

                <InputFilLabelled
                  label="Адрес проживания"
                  value={userData?.residenceAddress || ''}
                  multiline
                  readOnly
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& > *': {
                  margin: '-5px',
                },
              }}
            >
              <CheckboxField
                label="Согласие на предоставление кредитного отчета"
                checked={reportAgree}
                onChange={() => setReportAgree(!reportAgree)}
              />
              <CheckboxField
                label="Подтверждаю актуальность личных данных"
                checked={personalConfirm}
                onChange={() => setPersonalConfirm(!personalConfirm)}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0 }}>
            <StyledButton
              text="Подобрать кредит"
              onClick={submitCreditRequest}
              disabled={!reportAgree || !personalConfirm}
            />
          </Box>
        </DialogContent>
      </Dialog>
      <GlobalLoader loading={isLoading} text="Подбираем варианты..." />

      <SimpleModal open={openResponse} onClose={setCloseModals} title="Поиск кредитов">
        <Box sx={{ p: '16px 16px 16px 0', ml: '-8px' }}>
          <Box sx={{ fontSize: 15, fontWeight: 400, color: '#1A1A1A', whiteSpace: 'pre-line' }}>
            {' '}
            {message && typeof message === 'object' ? JSON.stringify(message, null, 2) : message}
          </Box>
        </Box>
      </SimpleModal>
    </>
  );
}
