import { createSlice, createSelector } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer';
import { Review } from '@/components/Review/types';
import { RootState } from '../root-reducer';
import { fetchOffers, fetchFavorites, changeFavoriteStatus, fetchOffer, fetchNearbyOffers, fetchReviews, postReview } from '../api-actions';

export interface DataState {
  offers: Offer[];
  favorites: Offer[];
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
}

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    offers: [],
    favorites: [],
    currentOffer: null,
    nearbyOffers: [],
    reviews: [],
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
        state.favorites = state.favorites.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        // Обновляем список избранного
        if (updatedOffer.isFavorite) {
          state.favorites.push(updatedOffer);
        } else {
          state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
        }
        // Обновляем текущее предложение если оно совпадает
        if (state.currentOffer?.id === updatedOffer.id) {
          state.currentOffer = updatedOffer;
        }
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Произошла ошибка';
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postReview.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(postReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Произошла ошибка при отправке отзыва';
      });
  }
});

// Базовые селекторы
const selectDataState = (state: RootState) => state.data;

// Мемоизированные селекторы
export const selectOffers = createSelector(
  [selectDataState],
  (data) => data.offers
);

export const selectFavorites = createSelector(
  [selectDataState],
  (data) => data.favorites
);

export const selectCurrentOffer = createSelector(
  [selectDataState],
  (data) => data.currentOffer
);

export const selectNearbyOffers = createSelector(
  [selectDataState],
  (data) => data.nearbyOffers.slice(0, 3)
);

export const selectReviews = createSelector(
  [selectDataState],
  (data) => data.reviews
);

export const selectIsLoading = createSelector(
  [selectDataState],
  (data) => data.isLoading
);

export const selectError = createSelector(
  [selectDataState],
  (data) => data.error
);

export default dataSlice.reducer;
