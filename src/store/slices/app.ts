import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '@components/OfferCard/OfferCard';
import { SortType } from '@components/SortOptions/types';
import { AppState, City } from 'src/types/state';

const initialState: AppState = {
  city: null,
  offers: [],
  sortType: SortType.Popular
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    }
  }
});

export const { changeCity, loadOffers, changeSortType } = appSlice.actions;

export const selectCity = (state: { app: AppState }) => state.app.city;
export const selectSortType = (state: { app: AppState }) => state.app.sortType;

export const selectFilteredOffers = (state: { app: AppState }) => {
  const { city, offers, sortType } = state.app;

  if (!city) {
    return [];
  }

  const filteredOffers = offers.filter((offer) => offer.city === city.name);

  switch (sortType) {
    case SortType.PriceLowToHigh:
      return [...filteredOffers].sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return [...filteredOffers].sort((a, b) => b.price - a.price);
    case SortType.TopRated:
      return [...filteredOffers].sort((a, b) => b.rating - a.rating);
    default:
      return filteredOffers;
  }
};

export default appSlice.reducer;
