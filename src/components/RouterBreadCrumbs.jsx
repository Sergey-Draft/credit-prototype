import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const breadcrumbsNameMap = {
  dashboard: 'Главная',
  loans: 'Мои кредиты',
  calculator: 'Кредитный калькулятор',
  profile: 'Личный кабинет',
  API: 'api-buttons',
  support: 'Вопрос-ответ',
  history: 'История обращений',
};

const styledLink = {
  color: '#7F7F7F',
  fontSize: '14px',
  fontWeight: 400,
  opacity: 0.7,
};

function RouterBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  console.log('loacation.pathname', location.pathname);
  console.log('pathnames', pathnames);

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›">
      <Link
        component={RouterLink}
        underline="hover"
        color="inherit"
        to="/"
        sx={{ display: 'flex', alignItems: 'center', ...styledLink }}
      >
        Главная
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const label = breadcrumbsNameMap[value] ?? value;

        return last ? (
          <Typography color="text.primary" key={to} sx={styledLink}>
            {label}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={to}
            key={to}
            sx={styledLink}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default RouterBreadcrumbs;
