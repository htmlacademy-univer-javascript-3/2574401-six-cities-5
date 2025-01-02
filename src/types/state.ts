import { SortType } from '@components/SortOptions/types';
import { store } from '../store';
import { Offer } from '@components/OfferCard/OfferCard';

export interface City {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export interface AppState {
  city: City | null;
  offers: Offer[];
  sortType: SortType;
}

export interface State {
  app: AppState;
}

export type AppDispatch = typeof store.dispatch;
