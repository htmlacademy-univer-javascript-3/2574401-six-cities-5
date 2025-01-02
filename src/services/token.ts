const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

/**
 * Получение токена из localStorage
 */
export const getToken = (): string => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

/**
 * Сохранение токена в localStorage
 */
export const saveToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

/**
 * Удаление токена из localStorage
 */
export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
