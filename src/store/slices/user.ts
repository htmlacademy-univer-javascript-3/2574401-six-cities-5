import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Тип данных для информации о пользователе */
export type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

/** Статус авторизации */
export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

/** Состояние пользователя */
type UserState = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setAuthStatus, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
