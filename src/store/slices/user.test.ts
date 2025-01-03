import { describe, expect, it } from 'vitest';
import userReducer, { setAuthStatus, setUserInfo, AuthorizationStatus, UserInfo } from './user';
import { checkAuth, logout } from '../api-actions';

describe('@/store/slices/user', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: null
  };

  const mockUserInfo: UserInfo = {
    name: 'Test User',
    avatarUrl: 'test.jpg',
    isPro: false,
    email: 'test@test.com',
    token: 'token'
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

  it('должен обработать checkAuth.pending', () => {
    const result = userReducer(initialState, checkAuth.pending);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Unknown);
  });

  it('должен обработать checkAuth.fulfilled', () => {
    const result = userReducer(
      initialState,
      setUserInfo(mockUserInfo)
    );
    expect(result.userInfo).toEqual(mockUserInfo);
  });

  it('должен обработать checkAuth.rejected', () => {
    const result = userReducer(
      initialState,
      setAuthStatus(AuthorizationStatus.NoAuth)
    );
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('должен обработать login.fulfilled', () => {
    const result = userReducer(
      initialState,
      setUserInfo(mockUserInfo)
    );
    expect(result.userInfo).toEqual(mockUserInfo);
  });

  it('должен обработать login.rejected', () => {
    const result = userReducer(
      initialState,
      setAuthStatus(AuthorizationStatus.NoAuth)
    );
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('должен обработать logout.fulfilled', () => {
    const stateWithAuth = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: mockUserInfo
    };
    const result = userReducer(
      stateWithAuth,
      setUserInfo(null)
    );
    expect(result.userInfo).toBeNull();
  });

  it('должен сохранять статус авторизации при ошибке logout', () => {
    const stateWithAuth = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: mockUserInfo
    };
    const result = userReducer(
      stateWithAuth,
      logout.rejected(new Error(), '', undefined)
    );
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.userInfo).toEqual(mockUserInfo);
  });
});
