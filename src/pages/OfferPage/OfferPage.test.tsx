import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import OfferPage from './OfferPage';
import { AuthorizationStatus } from '@/store/slices/user';
import { fetchOffer, fetchNearbyOffers, fetchReviews } from '@/store/api-actions';
import { Offer } from '@/types/offer';

vi.mock('@/store/api-actions', () => ({
  fetchOffer: vi.fn(() => Promise.resolve({ payload: null })),
  fetchNearbyOffers: vi.fn(() => Promise.resolve({ payload: [] })),
  fetchReviews: vi.fn(() => Promise.resolve({ payload: [] })),
  postReview: vi.fn(),
  changeFavoriteStatus: vi.fn()
}));

describe('@/pages/OfferPage', () => {
  const mockOffer: Offer = {
    id: '1',
    title: 'Beautiful apartment',
    type: 'apartment',
    price: 120,
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
    isFavorite: false,
    isPremium: true,
    rating: 4,
    description: 'Nice place',
    bedrooms: 2,
    goods: ['Wi-Fi'],
    host: {
      name: 'Host',
      avatarUrl: 'avatar.jpg',
      isPro: true,
      email: 'host@test.com',
      token: 'token'
    },
    images: ['image1.jpg', 'image2.jpg'],
    maxAdults: 4,
    previewImage: 'preview.jpg'
  };

  const mockNearbyOffers = [{ ...mockOffer, id: '2' }];
  const mockReviews = [{
    id: '1',
    date: '2024-01-01',
    user: {
      name: 'User',
      avatarUrl: 'avatar.jpg',
      isPro: false
    },
    comment: 'Great place!',
    rating: 5
  }];

  const createStore = (state = {
    data: {
      currentOffer: mockOffer,
      nearbyOffers: mockNearbyOffers,
      reviews: mockReviews,
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

  const renderWithProvider = (store = createStore()) => render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/offer/1']}>
        <Routes>
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/404" element={<div>404 Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен загружать данные предложения при монтировании', async () => {
    const store = createStore({
      data: {
        currentOffer: null as unknown as Offer,
        nearbyOffers: [],
        reviews: [],
        isLoading: false,
        error: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null
      }
    });

    (fetchOffer as unknown as jest.Mock).mockResolvedValueOnce({ payload: mockOffer });
    (fetchNearbyOffers as unknown as jest.Mock).mockResolvedValueOnce({ payload: mockNearbyOffers });
    (fetchReviews as unknown as jest.Mock).mockResolvedValueOnce({ payload: mockReviews });

    renderWithProvider(store);

    await waitFor(() => {
      expect(fetchOffer).toHaveBeenCalledWith('1');
    }, { timeout: 2000 });
  });

  it('должен отображать информацию о предложении', () => {
    renderWithProvider();

    expect(screen.getByRole('heading', { name: 'Beautiful apartment', level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText('Premium')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/€120/)[0]).toBeInTheDocument();
    expect(screen.getByText(/2 Bedrooms/)).toBeInTheDocument();
    expect(screen.getByText(/Max 4 adults/)).toBeInTheDocument();
    expect(screen.getByText('Nice place')).toBeInTheDocument();
  });

  it('должен отображать информацию о хозяине', () => {
    renderWithProvider();

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText('Host')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByAltText('Host avatar')).toBeInTheDocument();
  });

  it('должен отображать спиннер при загрузке', () => {
    const store = createStore({
      data: {
        currentOffer: mockOffer,
        nearbyOffers: [],
        reviews: [],
        isLoading: true,
        error: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null
      }
    });

    renderWithProvider(store);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('должен отображать ошибку', () => {
    const store = createStore({
      data: {
        currentOffer: mockOffer,
        nearbyOffers: [],
        reviews: [],
        isLoading: false,
        error: 'Test error' as unknown as null
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null
      }
    });

    const { container } = renderWithProvider(store);

    const errorElement = container.querySelector('.error-container');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent('Произошла ошибка');
    expect(errorElement).toHaveTextContent('Test error');
  });

  it('должен перенаправлять на страницу логина при добавлении в избранное без авторизации', async () => {
    const unauthorizedStore = createStore({
      data: {
        currentOffer: mockOffer,
        nearbyOffers: [],
        reviews: [],
        isLoading: false,
        error: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null
      }
    });

    renderWithProvider(unauthorizedStore);

    const bookmarkButton = screen.getByRole('button', { name: /to bookmarks/i });
    await userEvent.click(bookmarkButton);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('должен отображать карту и список ближайших предложений', () => {
    renderWithProvider();

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.getByTestId('near-places-list')).toBeInTheDocument();
  });
});
