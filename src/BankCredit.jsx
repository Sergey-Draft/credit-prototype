import React, { useState } from "react";

export default function BankCard({ bank }) {
  const [compare, setCompare] = useState(false);

  return (
    <div className="bank-card">
      <div className="card-header">
        <img src={bank.logo} alt={bank.name} />
        <h4>{bank.name}</h4>
      </div>
      <div className="card-body">
        <p><strong>Сумма:</strong> {bank.amount} ₽</p>
        <p><strong>Срок:</strong> {bank.term} мес</p>
        <p><strong>Ставка:</strong> {bank.rate}</p>
        <p><strong>Ежемесячный платёж:</strong> {bank.payment}</p>
        <p><strong>Досрочное погашение:</strong> {bank.earlyRepayment}</p>
        <p><strong>"Эффективная % ставка":</strong> {bank.effectiveRate}</p>
        <p><strong>"График погашения":</strong> {bank.schedule}</p>
      </div>
      <div className="card-footer">
        <label>
          <input
            type="checkbox"
            checked={compare}
            onChange={(e) => setCompare(e.target.checked)}
          />{" "}
          Добавить в сравнение
        </label>
        <button>Выбрать</button>
      </div>
    </div>
  );
}