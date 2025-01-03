import { describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { BaseCard } from './BaseCard';
import { AuthorizationStatus } from '../../store/slices/user';
import { Offer } from '../../types/offer';

describe('components/BaseCard', () => {
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
    maxAdults: 2,
    previewImage: 'test.jpg'
  };

  const mockStore = configureStore({
    reducer: {
      user: () => ({
        authorizationStatus: AuthorizationStatus.Auth
      })
    }
  });

  it('должен корректно отрисовать карточку предложения', () => {
    const handleCardHover = vi.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BaseCard
            offer={mockOffer}
            onCardHover={handleCardHover} imageWrapperClassName={''} imageSize={{
              width: 0,
              height: 0
            }} cardClassName={''}
          />
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

  it('должен корректно округлять рейтинг', () => {
    const testCases = [
      { input: 3.1, expected: '60%' }, // 3 звезды
      { input: 4.5, expected: '100%' }, // 5 звезд
      { input: 3.4, expected: '60%' }, // 3 звезды
      { input: 3.6, expected: '80%' }, // 4 звезды
    ];

    testCases.forEach(({ input, expected }) => {
      cleanup();

      const offerWithRating = { ...mockOffer, rating: input };
      render(
        <Provider store={mockStore}>
          <MemoryRouter>
            <BaseCard
              offer={offerWithRating}
              imageWrapperClassName=""
              imageSize={{ width: 0, height: 0 }}
              cardClassName=""
            />
          </MemoryRouter>
        </Provider>
      );

      const ratingElement = screen.getByTestId('rating-stars');
      expect(ratingElement).toHaveStyle({ width: expected });
    });
  });
});
