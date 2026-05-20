# FMP Client (credit-prototype)

Веб-клиент **финансового маркетплейса (FMP)** — прототип личного кабинета для подбора и оформления кредитов. Пользователь регистрируется, создаёт заявку на кредит, получает предложения от банков, сравнивает условия, выбирает продукт, подписывает договор и просматривает историю.

Репозиторий на GitHub: [Sergey-Draft/credit-prototype](https://github.com/Sergey-Draft/credit-prototype)

---

## Что умеет приложение

### Публичная зона (без входа)

| Раздел | Путь | Описание |
|--------|------|----------|
| Вход | `/login` | Авторизация по логину/паролю (JWT). Токены сохраняются в `localStorage`. |
| Регистрация | `/register` | Создание учётной записи через API бэкенда. |

### Личный кабинет (после входа)

Все страницы ниже обёрнуты в `ProtectedRoute`: без `accessToken` выполняется редирект на `/login`.

| Раздел | Путь | Описание |
|--------|------|----------|
| Главная (дашборд) | `/dashboard` | Форма заявки на кредит, список активных обращений, карточки банков/организаций, результаты подбора (ставка, платёж, срок), сравнение предложений, оформление и подписание договора. |
| Мои кредиты | `/loans` | Таблица оформленных кредитов (`DataGrid`), детали по клику. |
| История обращений | `/history` | Список прошлых заявок с фильтром по датам. |
| Персональные данные | `/profile` | Просмотр и редактирование профиля (документы, контакты и т.д.). |
| Кредитный калькулятор | `/calculator` | Расчёт аннуитетного / дифференцированного платежа (локально, без API). |
| Документы | `/docs` | Статический список документов (заготовка). |
| Поддержка | `/support` | Страница поддержки. |
| API-кнопки | `/api-buttons` | Тестовые вызовы API (для разработки). |

### Основной сценарий «кредит под ключ»

1. **Создание заявки** — на дашборде заполняется `CreditForm` (тип кредита, сумма, срок, обеспечение и др.), отправляется `POST users/request`.
2. **Ожидание ответов банков** — статус заявки опрашивается (polling), пока бэкенд обрабатывает запрос (`IN_PROCESSING`, `DRAWN_UP` и т.д.).
3. **Просмотр предложений** — при статусах `ACTIVE`, `DRAWN_UP`, `AWAITING_SIGN` показывается `productList` из `GET users/response?responseId=...`.
4. **Выбор продукта** — `POST users/response/select` (выбор конкретного `loanProductId`).
5. **Подписание** — в модальном окне скачиваются документы (`/users/response/doc/info` и `/loan`), при 404 — повторные попытки с сообщением «Документ формируется…», затем `POST users/response/sign`.
6. **Отказ** — `POST users/response/reject` отменяет оформление.

---

## Стек технологий

| Категория | Технологии |
|-----------|------------|
| Сборка | [Vite](https://vitejs.dev/) 7 |
| UI | React 19, [MUI](https://mui.com/) 7, Emotion |
| Маршрутизация | React Router 7 |
| Состояние | Redux Toolkit (`RTK/`), RTK Query (`userApi`) |
| HTTP | Axios (JWT в заголовке, refresh при 401) |
| Таблицы / даты | MUI X Data Grid, MUI Date Pickers, dayjs |
| Моки (опционально) | MSW — заготовка в `src/mocks/`, в `main.jsx` по умолчанию не подключена |

---

## Структура проекта (кратко)

```
credit-prototype/
├── public/              # Статика, логотипы банков, MSW worker
├── RTK/                 # Redux store, userSlice, profileSlice
├── utils/               # Форматирование, тема, справочники (типы кредитов, банки)
├── src/
│   ├── api/             # axiosConfig, auth, baseQuery для RTK Query
│   ├── services/        # userApi — заявки, ответы, select/sign/reject
│   ├── pages/           # Страницы (Login, Dashboard, Loans, History, …)
│   ├── components/      # UI: формы, карточки кредитов, модалки, ProtectedRoute
│   ├── mocks/           # Данные банков / MSW handlers
│   └── App.jsx          # Маршруты приложения
├── package.json
└── vite.config.js
```

---

## Требования

- **Node.js** (рекомендуется LTS)
- **Yarn** (в репозитории есть `yarn.lock`)

---

## Установка и запуск

```bash
yarn install
yarn dev
```

По умолчанию Vite откроет dev-сервер (обычно `http://localhost:5173`).

### Сборка и превью production

```bash
yarn build
yarn preview
```

### Линтинг и форматирование

```bash
yarn lint
yarn lint:fix
yarn format
```

---

## Подключение к бэкенду

Базовый URL API задаётся в **`src/api/axiosConfig.js`**:

```js
baseURL: 'http://192.168.38.4:9089/fmp-backend-1.0-SNAPSHOT/api'
```

Для другой среды измените `baseURL` и при необходимости URL refresh-токена в том же файле (перехватчик ответа при `401`).

Основные эндпоинты (через RTK Query / axios):

| Метод | Путь | Назначение |
|-------|------|------------|
| POST | `auth/...` | Вход, refresh |
| GET | `users/request` | Заявки (активная: `?status=LAST`) |
| POST | `users/request` | Создание заявки |
| GET | `users/response` | Ответ банков по `responseId` |
| POST | `users/response/select` | Выбор продукта |
| POST | `users/response/sign` | Подписание |
| POST | `users/response/reject` | Отказ |
| GET | `users/response/doc/info` | Условия кредитования (PDF) |
| GET | `users/response/doc/loan` | Кредитный договор (PDF) |
| GET | `users/loans` | Список кредитов пользователя |

---

## Авторизация и защита маршрутов

- После входа в `localStorage` сохраняются `accessToken`, `refreshToken`, `user`.
- `ProtectedRoute` проверяет наличие токена (Redux или `localStorage`) и при отсутствии перенаправляет на `/login`.
- Вложенные маршруты дашборда (`/dashboard`, `/loans`, …) рендерятся через `<Outlet />` внутри `DashboardLayout` (боковое меню `Sidebar`).

---

## Git: удалённый репозиторий

### Посмотреть, куда сейчас привязан проект

В корне проекта:

```bash
git remote -v
```

Пример вывода (текущая настройка в рабочей копии):

```
origin  http://gitea.foranx.by/FMP/FMP_Client_Fnx.git (fetch)
origin  http://gitea.foranx.by/FMP/FMP_Client_Fnx.git (push)
```

- **origin** — имя удалённого репозитория по умолчанию.
- **fetch** — откуда `git pull` / `git fetch` забирают изменения.
- **push** — куда уходит `git push`.

Посмотреть ветки и связь с удалённой:

```bash
git branch -vv
```

### Сменить `origin` на GitHub

Если нужно пушить в [https://github.com/Sergey-Draft/credit-prototype](https://github.com/Sergey-Draft/credit-prototype):

```bash
git remote set-url origin https://github.com/Sergey-Draft/credit-prototype.git
git remote -v
```

Проверка: в выводе должны быть оба URL на `github.com/...`.

Первый пуш в GitHub (если ветка ещё не опубликована):

```bash
git push -u origin main
```

### Добавить второй remote (не удаляя Gitea)

Чтобы оставить корпоративный Gitea и отдельно пушить на GitHub:

```bash
git remote add github https://github.com/Sergey-Draft/credit-prototype.git
git push -u github main
```

Пуш только на GitHub: `git push github main`. На Gitea: `git push origin main`.

### Посмотреть репозиторий в браузере

- **GitHub:** откройте [https://github.com/Sergey-Draft/credit-prototype](https://github.com/Sergey-Draft/credit-prototype) — код, коммиты, ветки в веб-интерфейсе.
- **Свой локальный проект** — это та же папка на диске; `git remote -v` показывает, куда при `git push` уйдут коммиты.

### Типичный цикл изменений

```bash
git status
git add .
git commit -m "Краткое описание изменений"
git push origin main
```

(или `git push github main`, если настроен remote `github`.)

---

## Примечания

- В `LoginPage` могут быть предзаполненные тестовые логин/пароль — уберите перед продакшеном.
- Часть данных на дашборде (списки банков для витрины) берётся из `src/mocks/`; бизнес-логика заявок — с реального API.
- Проект создан на базе шаблона React + Vite; README описывает текущее состояние прототипа FMP Client.
