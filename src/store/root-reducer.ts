import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './slices/app';
import dataReducer from './slices/data';
import userReducer from './slices/user';

export const rootReducer = combineReducers({
  app: appReducer,
  data: dataReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
