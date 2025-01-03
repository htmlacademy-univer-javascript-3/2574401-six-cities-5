import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { FavoritesCard } from './FavoritesCard';
import { Offer } from '@/types/offer';


describe('@/components/FavoritesCard', () => {
  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 100,
    previewImage: 'test.jpg',
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
    isPremium: true,
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
    maxAdults: 2
  };

  const mockStore = configureStore({
    reducer: {
      user: () => ({
        authorizationStatus: 'AUTH'
      })
    }
  });

  it('должен корректно отрисовать карточку избранного предложения', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <FavoritesCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockOffer.previewImage);
  });
});
