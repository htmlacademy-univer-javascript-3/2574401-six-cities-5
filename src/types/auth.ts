/** Данные пользователя */
export type User = {
  /** Имя пользователя */
  name: string;
  /** URL аватара */
  avatarUrl: string;
  /** Флаг профессионального статуса */
  isPro: boolean;
  /** Email пользователя */
  email: string;
  /** Токен авторизации */
  token: string;
};

/** Данные для авторизации */
export type AuthData = {
  /** Email пользователя */
  email: string;
  /** Пароль */
  password: string;
};
