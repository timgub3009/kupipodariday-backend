export const Ru = {
  PROFILE_DESCRIPTION_DEFAULT_TEXT: 'Пока ничего не рассказал о себе.',
  WISH_EDIT_DISABLED:
    'Нельзя внести изменения, т.к. уже есть желающие скинуться на подарок.',
  OFFER_REQUIRED_PARAMS_ABSENT:
    'Не указана сумма сбора или подарок, на который скидываются пользователи.',
  OFFER_AMOUNT_TOO_BIG: 'Сумма взноса превышает остаток стоимости подарка.',
  EMAIL_ALREADY_EXISTS: 'Пользователь с таким email уже существует.',
  USERNAME_ALREADY_EXISTS: 'Пользователь с таким именем уже существует.',
  AUTH_FAILED: 'Неправильное имя пользователя или пароль.'
};

const NotFoundExceptionTexts = {
  WISH: 'Подарок не найден.',
  USER: 'Пользователь не найден.',
  WISHLIST: 'Вишлист не найден.',
  OFFER: 'Предложение не найдено.',
} as const;
export type NotFoundExceptionTexts = keyof typeof NotFoundExceptionTexts;
