import { describe, expect, it } from 'vitest';
import offersReducer, { fetchOffers } from './offers';
import { Offer } from '../../types/offer';

describe('@/store/slices/offers', () => {
  const initialState = {
    offers: [],
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
    const result = offersReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('должен обработать fetchOffers.pending', () => {
    const result = offersReducer(initialState, fetchOffers.pending);
    expect(result.isLoading).toBe(true);
    expect(result.error).toBe(null);
  });

  it('должен обработать fetchOffers.fulfilled', () => {
    const offers = [mockOffer];
    const result = offersReducer(initialState, fetchOffers.fulfilled(offers, '', undefined));
    expect(result.offers).toEqual(offers);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe(null);
  });

  it('должен обработать fetchOffers.rejected с сообщением об ошибке', () => {
    const error = 'Error message';
    const result = offersReducer(
      initialState,
      fetchOffers.rejected(new Error(error), '', undefined)
    );
    expect(result.error).toBe(error);
    expect(result.isLoading).toBe(false);
    expect(result.offers).toEqual([]);
  });

  it('должен обработать fetchOffers.rejected без сообщения об ошибке', () => {
    const result = offersReducer(
      initialState,
      fetchOffers.rejected(new Error(), '', undefined)
    );
    expect(result.error).toBe('Произошла ошибка при загрузке предложений');
    expect(result.isLoading).toBe(false);
  });

  it('должен сохранять существующие предложения при ошибке', () => {
    const stateWithOffers = {
      ...initialState,
      offers: [mockOffer]
    };

    const result = offersReducer(
      stateWithOffers,
      fetchOffers.rejected(new Error('Error'), '', undefined)
    );
    expect(result.offers).toEqual([mockOffer]);
  });
});
