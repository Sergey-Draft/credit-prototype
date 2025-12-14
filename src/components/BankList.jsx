import React from 'react';

import { Box } from '@mui/material';
import BankCard from './BankCard';

export default function BankList() {
  const banks = [
    {
      logo: '/logo-sized/alfa.png',
      logoSmall: '/logo-sized/alfa-small.png',
      name: 'Альфа Банк',
      description:
        'Коммерческий банк, который входит в состав международного консорциума «Альфа-групп». Основан в 1991 году. Предлагает полный спектр услуг.',
    },
    {
      logo: '/logo-sized/prior.png',
      logoSmall: '/logo-sized/prior-small.png',
      name: 'Приорбанк',
      description:
        'Один из ведущих коммерческих банков страны. Основан в 1991 году. С 2024 года основным акционером банка является компания Soven 1 Holding. Предлагает полный спектр банковских услуг для физических и юридических лиц.',
    },
    {
      logo: '/logo-sized/sber.png',
      logoSmall: '/logo-sized/sber-small.png',
      name: 'Сбербанк',
      description:
        'Один из крупнейших системообразующих банков страны. Основан в 1923 году, а с 2009 года входит международную группу российского Сбербанка. Предлагает полный спектр банковских услуг для физических и юридических лиц.',
    },
    {
      logo: '/logo-sized/mtb.png',
      logoSmall: '/logo-sized/mtb-small.png',
      name: 'MTБанк',
      description:
        'Коммерческий банк с иностранным капиталом. Основан в 1994 году. Позиционирует себя как "Банк свежих решений". Предлагает полный спектр банковских услуг для физических и юридических лиц.',
    },
    {
      logo: '/logo-sized/belarus.png',
      logoSmall: '/logo-sized/belarus-small.png',
      name: 'Беларусбанк',
      description:
        'Крупнейший системообразующий банк страны, контрольный пакет акций которого принадлежит государству. Образован в 1995 году. Предлагает полный спектр банковских услуг для физических и юридических лиц.',
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)',
        },
        gap: 3,
        alignItems: 'stretch',
      }}
    >
      {banks.map((bank) => (
        <BankCard key={bank.name} {...bank} />
      ))}
    </Box>
  );
}
