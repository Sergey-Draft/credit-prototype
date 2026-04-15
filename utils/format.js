export const formatCurrency = (number) => {
  if (number == null) return '0';
  return number.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function SimpleformatDate(value) {
  if (!value || value.length !== 8) return value;

  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const day = value.slice(6, 8);

  return `${day}.${month}.${year}`;
}

function pluralize(n, forms) {
  if (n % 10 === 1 && n % 100 !== 11) return forms[0];
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return forms[1];
  return forms[2];
}

export function formatDuration(value) {
  if (!value) return '';

  const match = value.match(/^(\d+)([YMD])$/);
  if (!match) return value;

  const n = Number(match[1]);
  const unit = match[2];

  const map = {
    Y: ['год', 'года', 'лет'],
    M: ['месяц', 'месяца', 'месяцев'],
    D: ['день', 'дня', 'дней'],
  };

  return `${n} ${pluralize(n, map[unit])}`;
}

/**
 * Конвертирует строку с периодом в месяцы
 * @param {string} period - строка вида "1Y", "15M", "2D", "1y", "15m", "2d"
 * @returns {number} - количество месяцев
 */
export const convertToMonths = (period) => {
  if (!period || typeof period !== 'string') return 0;
  const cleanPeriod = period.replace(/\s+/g, '').toUpperCase();

  const match = cleanPeriod.match(/^(\d+)([YMD])$/);

  if (!match) return 0;

  const [, value, unit] = match;
  const numValue = parseInt(value, 10);

  switch (unit) {
    case 'Y':
      return numValue * 12;
    case 'M':
      return numValue;
    case 'D':
      return Math.round(numValue / 30.44);
    default:
      return 0;
  }
};
