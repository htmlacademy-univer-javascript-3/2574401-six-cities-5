import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import OfferCard from './OfferCard';
import { Offer } from '@/types/offer';

describe('@/components/OfferCard', () => {
  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 200,
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

  it('должен корректно отрисовать карточку предложения', () => {
    const handleCardHover = vi.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <OfferCard offer={mockOffer} onCardHover={handleCardHover} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockOffer.previewImage);

    if (mockOffer.isPremium) {
      expect(screen.getByText('Premium')).toBeInTheDocument();
    }
  });
});
