import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import MainPage from './MainPage';
import { SortType } from '@/components/SortOptions/types';
import { Offer } from '@/types/offer';
import { City } from '@/types/state';
import { AuthorizationStatus } from '@/store/slices/user';

describe('@/pages/MainPage', () => {
  const mockCity: City = {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  };

  const mockCities = [
    mockCity,
    {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    }
  ];

  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Beautiful apartment',
      type: 'apartment',
      price: 120,
      city: mockCity,
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
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
    }
  ];

  const createStore = (state = {
    app: {
      city: mockCity,
      sortType: SortType.Popular,
      filteredOffers: mockOffers,
      cities: mockCities
    },
    data: {
      offers: mockOffers,
      isLoading: false,
      error: null
    },
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: null
    }
  }) => configureStore({
    reducer: {
      app: () => state.app,
      data: () => state.data,
      user: () => state.user
    }
  });

  const renderWithProvider = (store = createStore()) => render(
    <Provider store={store}>
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    </Provider>
  );

  it('должен отображать список предложений и карту', () => {
    renderWithProvider();

    expect(screen.getByText(/places to stay in amsterdam/i)).toBeInTheDocument();
    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveClass('map', 'cities__map', 'leaflet-container');

    const marker = screen.getByRole('img', { name: '' });
    expect(marker).toHaveClass('leaflet-marker-icon');
  });

  it('должен отображать пустое состояние', () => {
    const emptyStore = createStore({
      app: {
        city: mockCity,
        sortType: SortType.Popular,
        filteredOffers: [],
        cities: mockCities
      },
      data: {
        offers: [],
        isLoading: false,
        error: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null
      }
    });

    renderWithProvider(emptyStore);

    expect(screen.getByText(/no places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Amsterdam/i)).toBeInTheDocument();
  });

  it('должен отображать корректное количество предложений', () => {
    renderWithProvider();

    expect(screen.getByText('1 places to stay in Amsterdam')).toBeInTheDocument();
  });

  it('должен отображать опции сортировки', () => {
    renderWithProvider();

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('sort-type')).toHaveTextContent(SortType.Popular);
  });

  it('должен иметь корректные классы для стилизации', () => {
    renderWithProvider();

    expect(screen.getByTestId('main-page')).toHaveClass('page__main', 'page__main--index');
    expect(screen.getByTestId('places-container')).toHaveClass('cities__places-container', 'container');
  });

  it('не должен ничего отображать без выбранного города', () => {
    const noCityStore = createStore({
      app: {
        city: null as unknown as City,
        sortType: SortType.Popular,
        filteredOffers: [],
        cities: mockCities
      },
      data: {
        offers: [],
        isLoading: false,
        error: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null
      }
    });

    const { container } = renderWithProvider(noCityStore);
    expect(container).toBeEmptyDOMElement();
  });
});
