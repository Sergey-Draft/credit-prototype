import React, { useState } from "react";

export default function CreditForm({ onSearch }) {
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [agreeFSZN, setAgreeFSZN] = useState(false);
  const [agreeData, setAgreeData] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeFSZN || !agreeData) {
      alert("Для продолжения необходимо согласие на обработку данных.");
      return;
    }
    onSearch({ goal, amount, term });
  };

  return (
    <>
    <form className="credit-form" onSubmit={handleSubmit}>
      <label>
        Цель кредита:
        <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
          <option value="">Выберите цель</option>
          <option>Ремонт</option>
          <option>Путешествие</option>
          <option>Покупка авто</option>
        </select>
      </label>

      <label>
        Сумма кредита:
        <input
          type="number"
          placeholder="Введите сумму"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>

      <label>
        Срок кредита (мес):
        <input
          type="number"
          placeholder="Введите срок"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </label>
      <div className="button-container">
      <button type="submit">Подобрать</button>
      </div>

      <div className="checkboxes">
        <label>
          <input
            type="checkbox"
            checked={agreeFSZN}
            onChange={(e) => setAgreeFSZN(e.target.checked)}
          />{" "}
          Соглашение на получение данных ФСЗН
        </label>
        <label>
          <input
            type="checkbox"
            checked={agreeData}
            onChange={(e) => setAgreeData(e.target.checked)}
          />{" "}
          Согласие на обработку персональных данных
        </label>
      </div>

    </form>




    </>
  );
}