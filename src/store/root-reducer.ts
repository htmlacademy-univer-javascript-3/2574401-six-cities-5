import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './slices/app';
import offersReducer from './slices/offers';
import dataReducer from './slices/data';

export const rootReducer = combineReducers({
  app: appReducer,
  offers: offersReducer,
  data: dataReducer
});

export type RootState = ReturnType<typeof rootReducer>;
