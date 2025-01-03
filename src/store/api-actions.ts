import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Review } from '../components/Review/types';
import { setAuthStatus, setUserInfo, AuthorizationStatus, UserInfo } from './slices/user';
import { saveToken, dropToken, getToken } from '../services/token';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';

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
      return rejectWithValue(error instanceof Error ? error.message : 'Произошла ошибка при загрузке предложений');
    }
  }
);

/**
 * Получение детальной информации о предложении
 */
export const fetchOffer = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>('data/fetchOffer',
  async (id, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer>(`/offers/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Произошла ошибка при загрузке предложения');
    }
  }
);

/**
 * Получение списка предложений неподалёку
 */
export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>('data/fetchNearbyOffers',
  async (id, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Произошла ошибка при загрузке ближайших предложений');
    }
  }
);

/**
 * Получение отзывов для предложения
 */
export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>('data/fetchReviews',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Review[]>(`/comments/${offerId}`);
      return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Произошла ошибка при загрузке отзывов');
    }
  }
);

/**
 * Отправка нового отзыва
 */
export const postReview = createAsyncThunk<
  Review,
  { offerId: string; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>('data/postReview',
  async ({ offerId, comment, rating }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Review>(`/comments/${offerId}`, { comment, rating });
      // После успешной отправки обновляем список отзывов
      dispatch(fetchReviews(offerId));
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Произошла ошибка при отправке отзыва');
    }
  }
);

/**
 * Получение списка избранных предложений
 */
export const fetchFavorites = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>('data/fetchFavorites',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer[]>('/favorite');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Произошла ошибка при загрузке избранного');
    }
  }
);

/**
 * Изменение статуса избранного
 */
export const changeFavoriteStatus = createAsyncThunk<
  Offer,
  { id: string; status: 0 | 1 },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>('data/changeFavoriteStatus',
  async ({ id, status }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Offer>(`/favorite/${id}/${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Произошла ошибка при изменении избранного');
    }
  }
);

/** Данные для авторизации */
type AuthData = {
  email: string;
  password: string;
};

/** Тип ответа от сервера при авторизации */
type AuthResponse = UserInfo;

/** Проверка статуса авторизации */
export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth',
  async (_, { dispatch, extra: api }) => {
    try {
      const token = getToken();
      if (!token) {
        dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
        return;
      }

      const { data } = await api.get<AuthResponse>('/login');
      dispatch(setAuthStatus(AuthorizationStatus.Auth));
      dispatch(setUserInfo(data));
    } catch {
      dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
      dropToken();
    }
  }
);

/** Авторизация пользователя */
export const login = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>('user/login',
  async (authData, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>('/login', authData);
      saveToken(data.token);
      dispatch(setAuthStatus(AuthorizationStatus.Auth));
      dispatch(setUserInfo(data));
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Произошла ошибка при авторизации');
    }
  }
);

/** Выход пользователя */
export const logout = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>('user/logout',
  async (_, { dispatch, extra: api, rejectWithValue }) => {
    try {
      await api.delete('/logout');
      dropToken();
      dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
      dispatch(setUserInfo(null));
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Произошла ошибка при выходе');
    }
  }
);
