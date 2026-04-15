export const loanTypeOptions = [
  { value: 'CONSUMER', label: 'Потребительский кредит' },
  { value: 'CAR', label: 'Автокредит' },
  { value: 'MICRO', label: 'Микрокредит' },
];

export const bankOptions = [
  { value: 'PRIORBANK', label: 'Приорбанк' },
  { value: 'BELARUSBANK', label: 'Беларусбанк' },
  { value: 'MTBANK', label: 'МТБанк' },
  { value: 'SBERBANK', label: 'Сбербанк' },
];

export const scheduleOptions = [
  { value: 'ANNUITY', label: 'Аннуитетный' },
  { value: 'LINEAR', label: 'Дифференцированный' },
];

export const educationOptions = [
  { value: 'SECONDARY', label: 'Среднее образование' },
  { value: 'INCOMPLETE_HIGHER', label: 'Неполное высшее образование' },
  { value: 'HIGHER', label: 'Высшее образование' },
  { value: 'ACADEMIC_DEGREE', label: 'Учёная степень' },
];

export const martialStatusOptions = [
  { value: 'MARRIED', label: 'В браке' },
  { value: 'SINGLE', label: 'Холост / не замужем' },
  { value: 'DIVORCED', label: 'Разведён(а)' },
  { value: 'WINDOWED', label: 'Вдовец / вдова' },
];

export const dependentsOptions = [
  { value: 'ZERO', label: '0' },
  { value: 'ONE', label: '1' },
  { value: 'TWO', label: '2' },
  { value: 'THREE_OR_MORE', label: '3 и более' },
];

export const securedOptions = [
  { value: 'YES', label: 'С обеспечением' },
  { value: 'NO', label: 'Без обеспечения' },
  { value: 'ANY', label: 'Без обеспечения/С обеспечением' },
];

export const carOptions = [
  { value: true, label: 'Есть' },
  { value: false, label: 'Нет' },
];

export const realEstateOptions = [
  { value: true, label: 'Есть' },
  { value: false, label: 'Нет' },
];

export const termUnitOptions = [
  { label: 'лет', value: 'Y' },
  { label: 'месяцев', value: 'M' },
  { label: 'дней', value: 'D' },
];

export const loanTypeMap = {
  CONSUMER: 'Потребительский кредит',
  CAR: 'Автокредит',
  MICRO: 'Микрокредит',
};

export const scheduleTypeMap = {
  ANNUITY: 'Аннуитетный график',
  LINEAR: 'Дифференцированный график',
};

export const RequestStatusMap = {
  ACTIVE: {
    label: 'Активный',
    color: '#009E2F',
  },

  DRAWN_UP: {
    label: 'Идет оформление',
    color: '#2260BC',
  },

  IN_PROCESSING: {
    label: 'В обработке',
    color: '#2260BC',
  },

  CLOSED: {
    label: 'Закрыт',
    color: '#7F7F7F',
  },

  AWAITING_SIGN: {
    label: 'Ожидает подписания договора',
    color: '#009E2F',
  },

  CUSTOMER_DECLINED: {
    label: 'Клиент отказался',
    color: '#ff4f79',
  },

  SIGNED: {
    label: 'Подписан',
    color: '#009E2F',
  },

  NOT_FOUND: {
    label: 'Продукты не найдены',
    color: '#FF2D55',
  },
};

export const loansStatusMap = {
  AUTH: 'Заключен',
  CURRENT: 'Действующий',
  EXPIRED: 'Не закрыт в срок',
  'PENDING.CLOSURE': 'Готов к закрытию',
  CLOSE: 'Закрыт',
  UNKNOWN: 'Неизвестен',
};

export const securedOptionsMap = {
  YES: 'С обеспечением',
  NO: 'Без обеспечения',
  ANY: 'Любой',
};
