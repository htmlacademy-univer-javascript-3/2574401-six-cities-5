import { describe, expect, it } from 'vitest';
import { dataSlice } from './data';
import { fetchOffers, fetchFavorites, changeFavoriteStatus, fetchOffer } from '../api-actions';
import { Offer } from '../../types/offer';

describe('@/store/slices/data', () => {
  const initialState = {
    offers: [],
    favorites: [],
    currentOffer: null,
    nearbyOffers: [],
    reviews: [],
    isLoading: false,
    error: null
  };

  const mockOffer: Offer = {
    id: '1',
    title: 'Test offer',
    type: 'apartment',
    price: 100,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    description: 'Test description',
    bedrooms: 2,
    goods: ['Wi-Fi'],
    host: {
      name: 'Test Host',
      avatarUrl: 'test.jpg',
      isPro: false,
      email: 'test@test.com',
      token: 'token'
    },
    images: ['test.jpg'],
    maxAdults: 2,
    previewImage: 'preview.jpg'
  };

  it('должен вернуть начальное состояние', () => {
    const result = dataSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('должен обработать fetchOffers.pending', () => {
    const result = dataSlice.reducer(initialState, fetchOffers.pending);
    expect(result.isLoading).toBe(true);
    expect(result.error).toBe(null);
  });

  it('должен обработать fetchOffers.fulfilled', () => {
    const offers = [mockOffer];
    const result = dataSlice.reducer(initialState, fetchOffers.fulfilled(offers, '', undefined));
    expect(result.offers).toEqual(offers);
    expect(result.isLoading).toBe(false);
  });

  it('должен обработать fetchOffers.rejected', () => {
    const error = 'Error message';
    const result = dataSlice.reducer(
      initialState,
      fetchOffers.rejected(new Error(error), '', undefined, error)
    );
    expect(result.error).toBe(error);
    expect(result.isLoading).toBe(false);
  });

  it('должен обработать changeFavoriteStatus.fulfilled', () => {
    const state = {
      ...initialState,
      offers: [mockOffer],
      favorites: []
    };

    const updatedOffer = { ...mockOffer, isFavorite: true };
    const result = dataSlice.reducer(
      state,
      changeFavoriteStatus.fulfilled(updatedOffer, '', { id: '1', status: 1 })
    );

    expect(result.offers[0].isFavorite).toBe(true);
    expect(result.favorites).toContainEqual(updatedOffer);
  });

  it('должен обработать fetchOffer.fulfilled', () => {
    const result = dataSlice.reducer(
      initialState,
      fetchOffer.fulfilled(mockOffer, '', '1')
    );
    expect(result.currentOffer).toEqual(mockOffer);
    expect(result.isLoading).toBe(false);
  });

  it('должен обработать fetchFavorites.fulfilled', () => {
    const favorites = [mockOffer];
    const result = dataSlice.reducer(
      initialState,
      fetchFavorites.fulfilled(favorites, '', undefined)
    );
    expect(result.favorites).toEqual(favorites);
    expect(result.isLoading).toBe(false);
  });

  it('должен обновить currentOffer при изменении избранного', () => {
    const state = {
      ...initialState,
      currentOffer: mockOffer
    };

    const updatedOffer = { ...mockOffer, isFavorite: true };
    const result = dataSlice.reducer(
      state,
      changeFavoriteStatus.fulfilled(updatedOffer, '', { id: '1', status: 1 })
    );

    expect(result.currentOffer).toEqual(updatedOffer);
  });

  it('должен обновить nearbyOffers при изменении избранного', () => {
    const state = {
      ...initialState,
      nearbyOffers: [mockOffer]
    };

    const updatedOffer = { ...mockOffer, isFavorite: true };
    const result = dataSlice.reducer(
      state,
      changeFavoriteStatus.fulfilled(updatedOffer, '', { id: '1', status: 1 })
    );

    expect(result.nearbyOffers[0]).toEqual(updatedOffer);
  });

  it('должен удалять предложение из избранного при установке isFavorite в false', () => {
    const state = {
      ...initialState,
      favorites: [mockOffer],
      offers: [mockOffer]
    };

    const updatedOffer = { ...mockOffer, isFavorite: false };
    const result = dataSlice.reducer(
      state,
      changeFavoriteStatus.fulfilled(updatedOffer, '', { id: '1', status: 0 })
    );

    expect(result.favorites).toHaveLength(0);
    expect(result.offers[0].isFavorite).toBe(false);
  });

  it('должен сбрасывать ошибку при начале новых запросов', () => {
    const stateWithError = {
      ...initialState,
      error: 'Previous error'
    };

    const result = dataSlice.reducer(stateWithError, fetchOffers.pending);
    expect(result.error).toBeNull();
  });
});
