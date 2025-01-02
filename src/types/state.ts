import { SortType } from '@components/SortOptions/types';
import { store } from '../store';
import { Offer } from './offer';

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

/** Корневое состояние */
export interface State {
  /** Состояние предложений */
  offers: {
    offers: Offer[];
    isLoading: boolean;
    error: string | null;
  };
  /** Состояние приложения */
  app: AppState;
  /** Состояние данных */
  data: {
    offers: Offer[];
    favorites: Offer[];
    isLoading: boolean;
    error: string | null;
  };
}

/** Тип для dispatch */
export type AppDispatch = typeof store.dispatch;
