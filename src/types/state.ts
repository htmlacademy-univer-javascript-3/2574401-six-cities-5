import { SortType } from '@components/SortOptions/types';
import { store } from '../store';
import { Offer } from './offer';
import { AuthorizationStatus } from '@/store/slices/user';

/** Местоположение */
export type Location = {
  /** Широта */
  latitude: number;
  /** Долгота */
  longitude: number;
  /** Масштаб карты */
  zoom: number;
};

/** Город */
export type City = {
  name: string;
  location: Location;
};

/** Состояние приложения */
export interface AppState {
  city: City | null;
  sortType: SortType;
  cities: City[];
}

/** Состояние данных */
export interface DataState {
  offers: Offer[];
  favorites: Offer[];
  isLoading: boolean;
  error: string | null;
}

/** Состояние пользователя */
export interface UserState {
  authorizationStatus: AuthorizationStatus;
  userInfo: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
    email: string;
  } | null;
}

/** Корневое состояние */
export interface State {
  app: AppState;
  data: DataState;
  user: UserState;
}

/** Тип для dispatch */
export type AppDispatch = typeof store.dispatch;
