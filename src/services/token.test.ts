import { describe, it, expect, beforeEach } from 'vitest';
import { getToken, saveToken, dropToken } from './token';

describe('@/services/token', () => {
  const TOKEN_KEY = 'six-cities-token';
  const TEST_TOKEN = 'test-token';

  beforeEach(() => {
    localStorage.clear();
  });

  it('должен сохранять токен в localStorage', () => {
    saveToken(TEST_TOKEN);
    expect(localStorage.getItem(TOKEN_KEY)).toBe(TEST_TOKEN);
  });

  it('должен получать токен из localStorage', () => {
    localStorage.setItem(TOKEN_KEY, TEST_TOKEN);
    expect(getToken()).toBe(TEST_TOKEN);
  });

  it('должен возвращать пустую строку если токен отсутствует', () => {
    expect(getToken()).toBe('');
  });

  it('должен удалять токен из localStorage', () => {
    localStorage.setItem(TOKEN_KEY, TEST_TOKEN);
    dropToken();
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
  });

  it('не должен вызывать ошибку при удалении несуществующего токена', () => {
    expect(() => dropToken()).not.toThrow();
  });

  it('должен перезаписывать существующий токен', () => {
    const NEW_TOKEN = 'new-test-token';

    saveToken(TEST_TOKEN);
    saveToken(NEW_TOKEN);

    expect(localStorage.getItem(TOKEN_KEY)).toBe(NEW_TOKEN);
  });
});
