/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo, useState } from 'react';
import './CalculatorPage.css';
import {
  Box,
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from '@mui/material';
import SimpleModal from '../components/SimpleModal';
import RouterBreadcrumbs from '../components/RouterBreadCrumbs';
import { InputFilLabelled } from '../components/ReusableInputs/MainAppStyledElements';
import { formatCurrency } from '../../utils/format';

const LoanCalculator = () => {
  const [price, setPrice] = useState('1500');
  const [downPayment, setDownPayment] = useState('0');
  const [term, setTerm] = useState('36');
  const [rate, setRate] = useState('19');
  const [grace, setGrace] = useState('0');
  const [type, setType] = useState('annuity');
  const [showSchedule, setShowSchedule] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const loanAmount = useMemo(
    () => Number(price || 0) - Number(downPayment || 0),
    [price, downPayment],
  );

  const monthlyRate = useMemo(() => Number(rate || 0) / 100 / 12, [rate]);

  const annuityPayment = useMemo(() => {
    const P = loanAmount;
    const r = monthlyRate;
    const n = Number(term || 0);

    if (n === 0) return 0;
    if (r === 0) return P / n;

    return (P * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  }, [loanAmount, term, monthlyRate]);

  const schedule = useMemo(() => {
    const P = loanAmount;
    const n = Number(term || 0);
    const r = monthlyRate;

    let balance = P;
    const payments = [];

    for (let month = 1; month <= n; month++) {
      const interest = balance * r;
      const principal = type === 'annuity' ? annuityPayment - interest : P / n;

      const totalPayment = type === 'annuity' ? annuityPayment : principal + interest;

      balance -= principal;

      payments.push({
        month,
        payment: totalPayment,
        principal,
        interest,
        balance: Math.max(balance, 0),
      });
    }

    return payments;
  }, [loanAmount, term, monthlyRate, type, annuityPayment]);

  const totalPayment = useMemo(() => schedule.reduce((sum, p) => sum + p.payment, 0), [schedule]);

  const overpayment = totalPayment - loanAmount;
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
        <Box className="main-title" sx={{ mb: 2 }}>
          Кредитный калькулятор
        </Box>
        <Box className="main-subtitle">Представленные данные носят информационный характер</Box>

        <Box className="loan-calculator">
          <Box className="form-grid">
            <InputFilLabelled
              label="Сумма кредита, BYN"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fieldSx={{}}
            />

            <InputFilLabelled
              label="Срок кредита"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />

            <InputFilLabelled
              label="Первоначальный взнос"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />

            <InputFilLabelled
              label="Процентная ставка"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />

            <InputFilLabelled
              label="Грейс-период"
              value={grace}
              onChange={(e) => setGrace(e.target.value)}
            />

            <FormControl component="fieldset" className="radio-group">
              <FormLabel
                component="legend"
                sx={{ mb: 1, fontSize: 15, fontWeight: 500, color: '#1A1A1A' }}
              >
                Тип платежа
              </FormLabel>
              <ToggleButtonGroup
                value={type}
                exclusive
                onChange={(e, newType) => {
                  if (newType !== null) setType(newType);
                }}
                sx={{
                  border: 'none',
                  display: 'flex',

                  p: 0.5,
                }}
              >
                <ToggleButton
                  value="diff"
                  sx={{
                    flex: 1,
                    color: '#404E67',
                    backgroundColor: '#fff',
                    border: '1px solid #d0d0d0',
                    borderRadius: '8px',
                    textTransform: 'none',
                    lineHeight: 'normal',
                    fontSize: '15px',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: '#fff',
                      border: '1px solid #2260BC',
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#2260BC',
                      color: '#fff',
                      border: '1px solid #2260BC',
                      '&:hover': {
                        backgroundColor: '#2260BC',
                        border: '1px solid #2260BC',
                      },
                    },
                  }}
                >
                  С уменьшением платежа
                </ToggleButton>

                <ToggleButton
                  value="annuity"
                  sx={{
                    flex: 1,
                    color: '#404E67',
                    backgroundColor: '#fff',
                    border: '1px solid #2260BC',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: '15px',
                    lineHeight: 'normal',
                    '&:hover': {
                      backgroundColor: '#fff',
                      border: '1px solid #d0d0d0',
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#2260BC',
                      color: '#fff',
                      border: '1px solid #2260BC',
                      '&:hover': {
                        backgroundColor: '#2260BC',
                        border: '1px solid #2260BC',
                      },
                    },
                  }}
                >
                  Равные платежи
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          </Box>
          <Box className="results-container">
            <Box className="results">
              <Box className="results-left">
                <div className="result-row">
                  <span className="result-row-title">Сумма кредита:</span>
                  <span className="result-row-value">{formatCurrency(loanAmount)} BYN</span>
                </div>
                <div className="result-row">
                  <span className="result-row-title">Переплата:</span>
                  <span className="result-row-value">{formatCurrency(overpayment)} BYN</span>
                </div>
              </Box>
              <Box className="results-right">
                <div className="result-row">
                  <span className="result-row-title">Ежемесячный платёж:</span>
                  <span className="result-row-value">
                    {formatCurrency(schedule[0]?.payment)} →{' '}
                    {formatCurrency(schedule[schedule.length - 1]?.payment)} BYN
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-row-title">Общая сумма выплат:</span>
                  <span className="result-row-value">{formatCurrency(totalPayment)} BYN</span>
                </div>
              </Box>
            </Box>

            <div>
              <Box className="show-schedule">
                <span onClick={(e) => handleOpenModal()}>Приблизительный график платежей </span>
                <img src="/muiIcons/color-arrow-right.png" alt="arrow" />{' '}
              </Box>
            </div>
          </Box>
        </Box>
      </Paper>
      <SimpleModal open={open} onClose={() => setOpen(false)} title="Расчёт по месяцам">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Месяц</th>
              <th>Платёж</th>
              <th>Основной долг</th>
              <th>Проценты</th>
              <th>Остаток</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((p) => (
              <tr key={p.month}>
                <td>{p.month}</td>
                <td>{p.payment.toFixed(2)}</td>
                <td>{p.principal.toFixed(2)}</td>
                <td>{p.interest.toFixed(2)}</td>
                <td>{p.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SimpleModal>
    </>
  );
};

export default LoanCalculator;
