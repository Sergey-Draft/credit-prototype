import React from 'react';
import SimpleModal from '../SimpleModal';
import { useLoanSchedule } from './useLoanSchedule';

const LoanScheduleModal = ({ open, onClose, loanAmount, term, rate, type }) => {
  const { schedule } = useLoanSchedule({
    loanAmount,
    term,
    rate,
    type,
  });

  return (
    <SimpleModal open={open} onClose={onClose} title="Расчёт по месяцам">
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
  );
};

export default LoanScheduleModal;
