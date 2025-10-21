import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar2342";
import CreditForm from "./CreditForm";
import BankCard from "./BankCredit";

export default function App() {
  const [results, setResults] = useState([]);

  const handleSearch = (formData) => {
    // Фейковые результаты (прототип)
    setResults([
      {
        id: 1,
        name: "Сбербанк",
        logo: "https://logo.clearbit.com/sberbank.ru",
        amount: formData.amount,
        term: formData.term,
        rate: "12%",
        payment: "10 500 ₽",
        earlyRepayment: "Да",
        effectiveRate: "17%",
        schedule: "aннуитет"
      },
      {
        id: 2,
        name: "Альфа-Банк",
        logo: "https://logo.clearbit.com/alfabank.ru",
        amount: formData.amount,
        term: formData.term,
        rate: "13%",
        payment: "10 800 ₽",
        earlyRepayment: "Нет",
        effectiveRate: "16%",
        schedule: "aннуитет"
      },
      {
        id: 3,
        name: "Тинькофф",
        logo: "https://logo.clearbit.com/tinkoff.ru",
        amount: formData.amount,
        term: formData.term,
        rate: "11.5%",
        payment: "10 300 ₽",
        earlyRepayment: "Да",
        effectiveRate: "17%",
        schedule: "aннуитет"
      },
      {
        id: 4,
        name: "НоваБанк",
        logo: "https://logo.clearbit.com/alfabank.ru",
        amount: formData.amount,
        term: formData.term,
        rate: "10.9%",
        payment: "10 150 ₽",
        earlyRepayment: "Да",
        effectiveRate: "16.5%",
        schedule: "аннуитет"
      },
      {
        id: 5,
        name: "КредитКвартал",
        logo: "https://logo.clearbit.com/alfabank.ru",
        amount: formData.amount,
        term: formData.term,
        rate: "14%",
        payment: "11 050 ₽",
        earlyRepayment: "Нет",
        effectiveRate: "18.2%",
        schedule: "аннуитет"
      },
      {
        id: 6,
        name: "ФинТек Про",
        logo: "https://logo.clearbit.com/fintechpro.ru",
        amount: formData.amount,
        term: formData.term,
        rate: "12.5%",
        payment: "10 600 ₽",
        earlyRepayment: "Да",
        effectiveRate: "17.1%",
        schedule: "аннуитет"
      },
      {
        id: 7,
        name: "Мегакредит",
        logo: "https://logo.clearbit.com/alfabank.ru",
        amount: formData.amount,
        term: formData.term,
        rate: "15%",
        payment: "11 300 ₽",
        earlyRepayment: "Нет",
        effectiveRate: "19.0%",
        schedule: "аннуитет"
      },
      {
        id: 8,
        name: "ЭкспрессФин",
        logo: "https://logo.clearbit.com/expressfin.ru",
        amount: formData.amount,
        term: formData.term,
        rate: "9.8%",
        payment: "9 950 ₽",
        earlyRepayment: "Да",
        effectiveRate: "15.4%",
        schedule: "аннуитет"
      },
      {
        id: 9,
        name: "GreenBank",
        logo: "https://logo.clearbit.com/greenbank.ru",
        amount: formData.amount,
        term: formData.term,
        rate: "13.2%",
        payment: "10 900 ₽",
        earlyRepayment: "Да",
        effectiveRate: "17.6%",
        schedule: "аннуитет"
      },
      {
        id: 10,
        name: "ТехноКапитал",
        logo: "https://logo.clearbit.com/technocapital.ru",
        amount: formData.amount,
        term: formData.term,
        rate: "11.7%",
        payment: "10 420 ₽",
        earlyRepayment: "Нет",
        effectiveRate: "16.9%",
        schedule: "аннуитет"
      }
      
    ]);
  };

  return (
    <div className="app-layout">
      
      <main className="main-content">
        <div className="user-info">
          <p><strong>Личный номер:</strong> 1234567890</p>
          <p><strong>Адрес регистрации:</strong> г. Минск, ул. Победителей, 10</p>
          <p><strong>Телефон:</strong> +375 29 123 45 67</p>
        </div>

        <CreditForm onSearch={handleSearch} />

        {results.length > 0 && (
          <div className="results">
            <h3>Результат скоринга: {results.length}</h3>
            <div className="cards">
              {results.map((bank) => (
                <BankCard key={bank.id} bank={bank} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Sidebar />
    </div>
  );
}