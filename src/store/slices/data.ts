import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer';
import { RootState } from '../root-reducer';
import { fetchOffers, fetchFavorites, changeFavoriteStatus } from '../api-actions';

export interface DataState {
  offers: Offer[];
  favorites: Offer[];
  isLoading: boolean;
  error: string | null;
}

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    offers: [],
    favorites: [],
    isLoading: false,
    error: null
  } as DataState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Произошла ошибка';
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Произошла ошибка';
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        // Обновляем статус в списке offers
        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        // Обновляем список избранного
        if (updatedOffer.isFavorite) {
          state.favorites.push(updatedOffer);
        } else {
          state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
        }
      });
  }
});

export const selectOffers = (state: RootState) => state.data.offers;
export const selectFavorites = (state: RootState) => state.data.favorites;

export default dataSlice.reducer;
