import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';

import { saveToken, dropToken } from './token';
import { getErrorMessage } from './api-error';
import { Offer } from '@/types/offer';
import { AuthData, User } from '@/types/auth';

/**
 * Получение списка предложений
 */
export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>('data/fetchOffers',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer[]>('/offers');
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Получение детальной информации о предложении
 */
export const fetchOffer = createAsyncThunk<
  Offer,
  string,
  { extra: AxiosInstance }
>('data/fetchOffer', async (id, { extra: api }) => {
  const { data } = await api.get<Offer>(`/offers/${id}`);
  return data;
});

/**
 * Получение списка комментариев
 */
export const fetchComments = createAsyncThunk<
  Comment[],
  string,
  { extra: AxiosInstance }
>('data/fetchComments', async (id, { extra: api }) => {
  const { data } = await api.get<Comment[]>(`/comments/${id}`);
  return data;
});

/**
 * Добавление нового комментария
 */
export const addComment = createAsyncThunk<
  Comment,
  { id: string; comment: Comment },
  {
    extra: AxiosInstance;
    rejectValue: string;
  }
>('data/addComment',
  async ({ id, comment }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Comment>(`/comments/${id}`, comment);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Получение списка избранных предложений
 */
export const fetchFavorites = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>('data/fetchFavorites', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>('/favorite');
  return data;
});

/**
 * Изменение статуса избранного
 */
export const changeFavoriteStatus = createAsyncThunk<
  Offer,
  { id: string; status: 0 | 1 },
  {
    extra: AxiosInstance;
    rejectValue: string;
  }
>('data/changeFavoriteStatus',
  async ({ id, status }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Offer>(`/favorite/${id}/${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Проверка авторизации
 */
export const checkAuth = createAsyncThunk<
  User,
  undefined,
  { extra: AxiosInstance }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<User>('/login');
  return data;
});

/**
 * Авторизация пользователя
 */
export const login = createAsyncThunk<
  User,
  AuthData,
  { extra: AxiosInstance }
>('user/login', async (authData, { extra: api }) => {
  const { data } = await api.post<User>('/login', authData);
  saveToken(data.token);
  return data;
});

/**
 * Выход пользователя
 */
export const logout = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete('/logout');
  dropToken();
});
