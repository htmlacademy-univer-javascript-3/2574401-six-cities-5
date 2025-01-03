import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import FavoritesList from './FavoritesList';
import { Offer } from '@/types/offer';

describe('@/components/FavoritesList', () => {
  const mockStore = configureStore({
    reducer: {
      user: () => ({
        authorizationStatus: 'AUTH',
        userInfo: null
      }),
      data: () => ({
        favorites: []
      })
    }
  });

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
    },
    {
      id: '2',
      title: 'Nice house',
      type: 'house',
      price: 150,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.37454,
          longitude: 4.897976,
          zoom: 13
        }
      },
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      },
      isFavorite: true,
      isPremium: true,
      rating: 5,
      description: 'Lovely house',
      bedrooms: 3,
      goods: ['Wi-Fi', 'Kitchen'],
      host: {
        name: 'Host 2',
        avatarUrl: 'avatar2.jpg',
        isPro: true,
        email: 'host2@test.com',
        token: 'token2'
      },
      images: ['image2.jpg'],
      maxAdults: 6,
      previewImage: 'preview2.jpg'
    }
  ];

  it('должен отображать сообщение, когда нет избранных предложений', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <FavoritesList offers={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Нет избранных предложений')).toBeInTheDocument();
  });

  it('должен группировать предложения по городам', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <FavoritesList offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    // Проверяем наличие городов
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();

    // Проверяем наличие предложений
    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText('Nice house')).toBeInTheDocument();
  });

  it('должен создавать корректные ссылки на города', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <FavoritesList offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    const parisLink = screen.getByText('Paris').closest('a');
    const amsterdamLink = screen.getByText('Amsterdam').closest('a');

    expect(parisLink).toHaveAttribute('href', '/?city=Paris');
    expect(amsterdamLink).toHaveAttribute('href', '/?city=Amsterdam');
  });

  it('должен отображать карточки предложений для каждого города', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <FavoritesList offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    const favoritesList = screen.getByTestId('favorites-list');
    expect(favoritesList.querySelectorAll('.favorites__locations-items')).toHaveLength(2);
  });
});
