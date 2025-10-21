import React from "react";

export default function Sidebar() {
  const [active, setActive] = React.useState("Персональные данные");

  const menuItems = [
    "Персональные данные",
    "История обращений",
    "Действующие кредиты",
    "Закрытые кредиты",
  ];


  return (
    <aside className="sidebar">
      <div className="user-block">
        <div className="avatar-circle">А</div>
        <p className="username">Александр Иванов</p>
      </div>
      <nav className="sidebar-nav">
      <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => setActive(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}