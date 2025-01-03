import { describe, expect, it } from 'vitest';
import { selectOffers, selectCity, selectFilteredOffers } from './selectors';
import { Offer } from '@/types/offer';
import { City } from '@/types/state';
import { RootState } from './root-reducer';
import { SortType } from '@/components/SortOptions/types';

describe('@/store/selectors', () => {
  const mockCity: City = {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  };

  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Paris offer',
      type: 'apartment',
      price: 100,
      city: {
        name: 'Paris',
        location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
      },
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'image.jpg',
      description: 'Nice place',
      bedrooms: 2,
      goods: ['Wi-Fi'],
      host: {
        name: 'Host',
        avatarUrl: 'avatar.jpg',
        isPro: false,
        email: 'host@test.com',
        token: 'token'
      },
      images: ['image.jpg'],
      maxAdults: 2
    },
    {
      id: '2',
      title: 'Amsterdam offer',
      type: 'apartment',
      price: 120,
      city: {
        name: 'Amsterdam',
        location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 }
      },
      location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'image.jpg',
      description: 'Nice place',
      bedrooms: 2,
      goods: ['Wi-Fi'],
      host: {
        name: 'Host',
        avatarUrl: 'avatar.jpg',
        isPro: false,
        email: 'host@test.com',
        token: 'token'
      },
      images: ['image.jpg'],
      maxAdults: 2
    }
  ];

  const state = {
    data: {
      offers: mockOffers,
      favorites: [],
      currentOffer: null,
      nearbyOffers: [],
      reviews: [],
      isLoading: false,
      error: null
    },
    app: {
      city: mockCity,
      sortType: SortType.Popular,
      cities: []
    },
    user: {
      authorizationStatus: 'NO_AUTH',
      userInfo: null
    }
  };

  it('должен выбрать все предложения', () => {
    const result = selectOffers(state as RootState);
    expect(result).toEqual(mockOffers);
  });

  it('должен выбрать текущий город', () => {
    const result = selectCity(state as RootState);
    expect(result).toEqual(mockCity);
  });

  it('должен отфильтровать предложения по городу', () => {
    const result = selectFilteredOffers(state as RootState);
    expect(result).toHaveLength(1);
    expect(result[0].city.name).toBe('Paris');
  });

  it('должен вернуть пустой массив если город не выбран', () => {
    const stateWithoutCity = {
      ...state,
      app: {
        ...state.app,
        city: null
      }
    };
    const result = selectFilteredOffers(stateWithoutCity as RootState);
    expect(result).toHaveLength(0);
  });
});
