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

const LoanCalculator = () => {
  const [price, setPrice] = useState('20000');
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
      <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Кредитный калькулятор
          </Typography>
          {/* <Typography variant="body1" color="text.secondary">
          
        </Typography> */}
        </Box>

        <Box className="loan-calculator">
          <Box className="form-grid">
            <FormControl fullWidth>
              <FormLabel>Стоимость, BYN</FormLabel>
              <TextField
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                variant="outlined"
                size="small"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Первоначальный взнос, BYN</FormLabel>
              <TextField
                fullWidth
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                variant="outlined"
                size="small"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Срок (мес)</FormLabel>
              <TextField
                fullWidth
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                variant="outlined"
                size="small"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Ставка, %</FormLabel>
              <TextField
                fullWidth
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                variant="outlined"
                size="small"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Грейс-период (мес)</FormLabel>
              <TextField
                fullWidth
                type="number"
                value={grace}
                onChange={(e) => setGrace(e.target.value)}
                variant="outlined"
                size="small"
              />
            </FormControl>

            <FormControl component="fieldset" className="radio-group">
              <FormLabel component="legend" sx={{ mb: 1 }}>
                Тип платежей
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
                  value="annuity"
                  sx={{
                    flex: 1,
                    color: '#404E67',
                    backgroundColor: '#fff',
                    border: '1px solid #d0d0d0',
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#fff',
                      border: '1px solid #d0d0d0',
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#fe8a7d',
                      color: '#fff',
                      border: '1px solid #fe8a7d',
                      '&:hover': {
                        backgroundColor: '#fe8a7d',
                        border: '1px solid #fe8a7d',
                      },
                    },
                  }}
                >
                  Равные платежи
                </ToggleButton>

                <ToggleButton
                  value="diff"
                  sx={{
                    flex: 1,
                    color: '#404E67',
                    backgroundColor: '#fff',
                    border: '1px solid #d0d0d0',
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#fff',
                      border: '1px solid #d0d0d0',
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#fe8a7d',
                      color: '#fff',
                      border: '1px solid #fe8a7d',
                      '&:hover': {
                        backgroundColor: '#fe8a7d', // оставляем тот же цвет
                        border: '1px solid #fe8a7d',
                      },
                    },
                  }}
                >
                  С уменьшением
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          </Box>
          <Box className="results">
            <div className="result-row">
              <span className="result-row-title">Сумма кредита:</span>
              <span className="result-row-value">{loanAmount.toLocaleString()} BYN</span>
            </div>
            <Divider />
            <div className="result-row">
              <span className="result-row-title">Переплата:</span>
              <span className="result-row-value">{overpayment.toFixed(2)} BYN</span>
            </div>
            <Divider />
            <div className="result-row">
              <span className="result-row-title">Ежемесячный платёж:</span>
              <span className="result-row-value">
                {schedule[0]?.payment.toFixed(2)} →{' '}
                {schedule[schedule.length - 1]?.payment.toFixed(2)} BYN
              </span>
            </div>
            <Divider />
            <div className="result-row">
              <span className="result-row-title">Общая сумма выплат:</span>
              <span className="result-row-value">{totalPayment.toFixed(2)} BYN</span>
            </div>
          </Box>
        </Box>

        <div>
          <label className="show-schedule">
            <span onClick={(e) => handleOpenModal()}>Показать расчет по месяцам</span>
          </label>
        </div>
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
