/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
} from '@mui/material';

export default function CreditForm({ onSearch }) {
  const [goal, setGoal] = useState('');
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [agreeFSZN, setAgreeFSZN] = useState(false);
  const [agreeData, setAgreeData] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeFSZN || !agreeData) {
      alert('Для продолжения необходимо согласие на обработку данных.');
      return;
    }
    onSearch({ goal, amount, term });
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Параметры кредита
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ mb: 2, justifyContent: 'flex-start' }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth required sx={{ minWidth: 200 }}>
              <InputLabel id="target-label">Тип кредита</InputLabel>
              <Select
                labelId="target-label"
                id="target"
                value={goal}
                label="Тип кредита"
                onChange={(e) => setGoal(e.target.value)}
                required
                fullWidth
              >
                <MenuItem value="">Выберите цель</MenuItem>
                <MenuItem value="Потребительский кредит">Потребительский кредит</MenuItem>
                <MenuItem value="Автокредит">Автокредит</MenuItem>
                <MenuItem value="Микрокредит">Микрокредит</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="sum"
              label="Сумма кредита (BYN)"
              type="number"
              placeholder="Введите сумму"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="term"
              label="Срок кредита (мес)"
              type="number"
              placeholder="Введите срок"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                id="fszn"
                checked={agreeFSZN}
                onChange={(e) => setAgreeFSZN(e.target.checked)}
              />
            }
            label="Согласие на получение данных из ФСЗН"
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                id="personal"
                checked={agreeData}
                onChange={(e) => setAgreeData(e.target.checked)}
              />
            }
            label="Согласие на обработку персональных данных"
          />
        </Box>

        <Button variant="contained" color="primary" type="submit" fullWidth size="large">
          Подобрать кредит
        </Button>
      </form>
    </Paper>
  );
}
