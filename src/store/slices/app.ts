import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, City } from '@/types/state';
import { SortType } from '@components/SortOptions/types';
import { RootState } from '../root-reducer';
import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer';

const initialState: AppState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  sortType: SortType.Popular,
  cities: [
    {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    },
    {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    },
    {
      name: 'Hamburg',
      location: {
        latitude: 53.550341,
        longitude: 10.000654,
        zoom: 13
      }
    },
    {
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13
      }
    }
  ]
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    }
  }
});

export const { changeCity, changeSortType } = appSlice.actions;

// Базовый селектор
const selectAppState = (state: RootState) => state.app;

// Мемоизированные селекторы
export const selectOffers = (state: RootState) => state.data.offers;
export const selectSortType = (state: RootState) => state.app.sortType;

export const selectCity = createSelector(
  [selectAppState],
  (app) => app.city
);

export const selectCities = createSelector(
  [selectAppState],
  (app) => app.cities
);

const sortOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  switch (sortType) {
    case SortType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRated:
      return [...offers].sort((a, b) => b.rating - a.rating);
    case SortType.Popular:
    default:
      return offers;
  }
};

export const selectFilteredOffers = createSelector(
  [selectOffers, selectCity, selectSortType],
  (offers, city, sortType) => {
    const filteredByCity = offers.filter((offer) => offer.city.name === city?.name);
    return sortOffers(filteredByCity, sortType);
  }
);

export default appSlice.reducer;
