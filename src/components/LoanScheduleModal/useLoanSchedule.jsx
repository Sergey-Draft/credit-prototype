import { useMemo } from 'react';

export const useLoanSchedule = ({ loanAmount, term, rate, type = 'annuity' }) => {
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

      const payment = type === 'annuity' ? annuityPayment : principal + interest;

      balance -= principal;

      payments.push({
        month,
        payment,
        principal,
        interest,
        balance: Math.max(balance, 0),
      });
    }

    return payments;
  }, [loanAmount, term, monthlyRate, type, annuityPayment]);

  const totalPayment = useMemo(() => schedule.reduce((sum, p) => sum + p.payment, 0), [schedule]);

  const overpayment = totalPayment - loanAmount;

  return {
    schedule,
    totalPayment,
    overpayment,
    annuityPayment,
  };
};
