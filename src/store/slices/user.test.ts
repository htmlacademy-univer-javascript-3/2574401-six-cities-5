import { describe, expect, it } from 'vitest';
import userReducer, { setAuthStatus, setUserInfo, AuthorizationStatus } from './user';

describe('@/store/slices/user', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: null
  };

  const mockUserInfo = {
    name: 'Test User',
    avatarUrl: 'test.jpg',
    isPro: false,
    email: 'test@test.com'
  };

  it('должен вернуть начальное состояние', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('должен обработать setAuthStatus', () => {
    const result = userReducer(
      initialState,
      setAuthStatus(AuthorizationStatus.Auth)
    );
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('должен обработать setUserInfo', () => {
    const result = userReducer(initialState, setUserInfo(mockUserInfo));
    expect(result.userInfo).toEqual(mockUserInfo);
  });

  it('должен обработать setUserInfo с null', () => {
    const stateWithUser = {
      ...initialState,
      userInfo: mockUserInfo
    };
    const result = userReducer(stateWithUser, setUserInfo(null));
    expect(result.userInfo).toBeNull();
  });
});
