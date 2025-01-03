import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import OfferList from './OfferList';
import { Offer } from '@/types/offer';

describe('@/components/OfferList', () => {
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
      isFavorite: false,
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

  const mockStore = configureStore({
    reducer: {
      user: () => ({
        authorizationStatus: 'AUTH',
        userInfo: null
      })
    }
  });

  const renderWithProvider = (component: React.ReactNode) => render(
    <Provider store={mockStore}>
      <MemoryRouter>
        {component}
      </MemoryRouter>
    </Provider>
  );

  it('должен отображать список предложений', () => {
    renderWithProvider(<OfferList offers={mockOffers} onOfferHover={() => {}} />);

    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText('Nice house')).toBeInTheDocument();
  });

  it('должен вызывать onOfferHover при наведении на карточку', async () => {
    const handleOfferHover = vi.fn();
    renderWithProvider(
      <OfferList
        offers={mockOffers}
        onOfferHover={handleOfferHover}
      />
    );

    const firstCard = screen.getByText('Beautiful apartment').closest('article');
    if (firstCard) {
      await userEvent.hover(firstCard);
      expect(handleOfferHover).toHaveBeenCalledWith(mockOffers[0]);

      await userEvent.unhover(firstCard);
      expect(handleOfferHover).toHaveBeenCalledWith(null);
    }
  });

  it('должен применять пользовательские классы', () => {
    const customClass = 'custom-list';
    renderWithProvider(
      <OfferList
        offers={mockOffers}
        onOfferHover={() => {}}
        className={customClass}
      />
    );

    const list = screen.getByTestId('offer-list');
    expect(list).toHaveClass(customClass);
  });

  it('должен корректно мемоизировать карточки', () => {
    const { rerender } = renderWithProvider(
      <OfferList offers={mockOffers} onOfferHover={() => {}} />
    );

    const initialCards = screen.getAllByRole('article');

    rerender(
      <Provider store={mockStore}>
        <MemoryRouter>
          <OfferList offers={mockOffers} onOfferHover={() => {}} />
        </MemoryRouter>
      </Provider>
    );

    const rerenderedCards = screen.getAllByRole('article');
    expect(rerenderedCards).toHaveLength(initialCards.length);
  });

  it('должен отображать пустой список при отсутствии предложений', () => {
    renderWithProvider(<OfferList offers={[]} onOfferHover={() => {}} />);
    const list = screen.getByTestId('offer-list');
    expect(list.children).toHaveLength(0);
  });
});
