# FMP Client (credit-prototype)

Фронтенд-приложение на **React** для финансового маркетплейса: авторизация, дашборд, кредиты, калькулятор, история заявок, профиль и поддержка.

## Стек

- **Vite 7** + **React 19**
- **MUI** (Material UI), **Emotion**
- **Redux Toolkit**, **React Router**, **TanStack Query**
- **Axios** (JWT + refresh в перехватчиках)
- **MSW** (в проекте есть заготовка моков; по умолчанию не подключена в `main.jsx`)

## Требования

- **Node.js** (рекомендуется LTS)
- **Yarn** (в репозитории есть `yarn.lock`)

## Установка и запуск

```bash
yarn install
yarn dev
```

Приложение поднимается через Vite (порт по умолчанию — см. вывод в терминале, обычно `http://localhost:5173`).

## Сборка

```bash
yarn build
yarn preview   # локальный просмотр production-сборки
```

## Линтинг и форматирование

```bash
yarn lint
yarn lint:fix
yarn format
```

## Бэкенд API

Базовый URL API задаётся в `src/api/axiosConfig.js` (сейчас указывает на локальный/сетевой хост бэкенда). Для другой среды измените `baseURL` и при необходимости эндпоинт refresh-токена в том же файле.

## Git

- **Удалённый репозиторий:** `origin` → `http://gitea.foranx.by/FMP/FMP_Client_Fnx.git`
- **Основная ветка:** `main` (отслеживает `origin/main`)

Пуш изменений:

```bash
git add .
git commit -m "Ваше сообщение"
git push origin main
```

---

_Проект создан на базе шаблона React + Vite._
