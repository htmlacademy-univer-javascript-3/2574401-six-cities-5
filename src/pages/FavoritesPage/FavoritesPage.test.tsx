import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import FavoritesPage from './FavoritesPage';
import { Offer } from '@/types/offer';
import { AuthorizationStatus } from '@/store/slices/user';

describe('@/pages/FavoritesPage', () => {
  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Beautiful apartment',
      type: 'apartment',
      price: 120,
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
      isFavorite: true,
      isPremium: false,
      rating: 4,
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
      maxAdults: 4,
      previewImage: 'preview.jpg'
    }
  ];

  const createStore = (state = {
    data: {
      favorites: mockOffers,
      isLoading: false,
      error: null
    },
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: null
    }
  }) => configureStore({
    reducer: {
      data: () => state.data,
      user: () => state.user
    }
  });

  const mockStore = createStore();

  const renderWithProvider = (store = mockStore) => render(
    <Provider store={store}>
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    </Provider>
  );

  it('должен отображать список избранных предложений', () => {
    renderWithProvider();

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
  });

  it('должен отображать спиннер при загрузке', () => {
    const loadingStore = createStore({
      data: {
        favorites: [],
        isLoading: true,
        error: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null
      }
    });

    renderWithProvider(loadingStore);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('должен отображать ошибку', () => {
    const errorStore = createStore({
      data: {
        favorites: [],
        isLoading: false,
        error: 'Test error' as unknown as null,
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null
      }
    });

    renderWithProvider(errorStore);
    expect(screen.getByText('Произошла ошибка')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('должен отображать пустой список', () => {
    const emptyStore = createStore({
      data: {
        favorites: [],
        isLoading: false,
        error: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null
      }
    });

    renderWithProvider(emptyStore);
    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });
});
