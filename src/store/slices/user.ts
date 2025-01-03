import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Тип данных для информации о пользователе */
type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
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
    setAuthStatus: (state: UserState, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserInfo: (state: UserState, action: PayloadAction<UserInfo | null>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setAuthStatus, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
