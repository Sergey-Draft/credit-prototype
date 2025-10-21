import React from "react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="user-block">
        <div className="avatar-circle">А</div>
        <p className="username">Александр Иванов</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>Персональные данные</li>
          <li>История обращений</li>
          <li>Действующие кредиты</li>
          <li>Закрытые кредиты</li>
        </ul>
      </nav>
    </aside>
  );
}