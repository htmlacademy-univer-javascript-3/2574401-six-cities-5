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
});
