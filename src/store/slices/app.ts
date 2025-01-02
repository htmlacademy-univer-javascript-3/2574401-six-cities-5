import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '@components/OfferCard/OfferCard';
import { City, State } from '../../types/state';

type AppState = {
  city: City | undefined;
  offers: Offer[];
};

const initialState: AppState = {
  city: undefined,
  offers: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
  },
});

// Селекторы
export const selectCity = (state: State) => state.app.city;
export const selectOffers = (state: State) => state.app.offers;
export const selectFilteredOffers = (state: State) => {
  const city = selectCity(state);
  const offers = selectOffers(state);

  if (!city) {
    return offers;
  }

  return offers.filter((offer) => offer.city === city.name);
};

export const { changeCity, loadOffers } = appSlice.actions;

export default appSlice.reducer;
