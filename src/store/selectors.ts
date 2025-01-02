import { createSelector } from '@reduxjs/toolkit';

import { Offer } from '@/types/offer';
import { City } from '@/types/state';
import { RootState } from './root-reducer';

export const selectOffers = (state: RootState): Offer[] => state.data.offers;
export const selectCity = (state: RootState): City | null => state.app.city;

export const selectFilteredOffers = createSelector(
  [selectOffers, selectCity],
  (offers: Offer[], city: City | null): Offer[] =>
    offers.filter((offer) => offer.city.name === city?.name)
);
