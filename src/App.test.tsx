import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import { AuthorizationStatus } from './store/slices/user';
import * as Redux from './hooks/redux';
import * as ApiActions from './store/api-actions';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { RootState } from './store/root-reducer';
import { SortType } from './components/SortOptions/types';
import { AxiosInstance } from 'axios';

vi.mock('./store/api-actions', () => ({
  fetchOffers: vi.fn(() => ({ type: 'data/fetchOffers' })),
  checkAuth: vi.fn(() => ({ type: 'user/checkAuth' })),
  fetchFavorites: vi.fn(() => ({ type: 'data/fetchFavorites' }))
}));

describe('App Routing', () => {
  const mockStore = configureStore({
    reducer: {
      user: () => ({
        authorizationStatus: AuthorizationStatus.Auth
      }),
      data: () => ({
        isLoading: false,
        offers: [],
        favorites: []
      })
    }
  });

  const mockUseAppSelector = vi.spyOn(Redux, 'useAppSelector');
  const mockUseAppDispatch = vi.spyOn(Redux, 'useAppDispatch');
  const mockDispatch = vi.fn(() => Promise.resolve()) as unknown as ThunkDispatch<RootState, AxiosInstance, AnyAction>;

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selector) => selector({
      app: {
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13
          }
        },
        sortType: SortType.Popular,
        cities: []
      },
      data: {
        isLoading: false,
        offers: [],
        favorites: [],
        currentOffer: null,
        nearbyOffers: [],
        reviews: [],
        error: null
      },
      user: { authorizationStatus: AuthorizationStatus.Auth, userInfo: null }
    }));
  });

  it('должен отрисовать главную страницу по умолчанию', () => {
    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(ApiActions.fetchOffers());
    expect(mockDispatch).toHaveBeenCalledWith(ApiActions.checkAuth());
    expect(mockDispatch).toHaveBeenCalledWith(ApiActions.fetchFavorites());
  });

  it('должен показывать спиннер при загрузке', () => {
    mockUseAppSelector.mockImplementation((selector) => selector({
      data: {
        isLoading: true,
        offers: [],
        favorites: [],
        currentOffer: null,
        nearbyOffers: [],
        reviews: [],
        error: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null
      },
      app: {
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13
          }
        },
        sortType: SortType.Popular,
        cities: []
      }
    }));

    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('должен отрисовать страницу 404 для несуществующего маршрута', () => {
    window.history.pushState({}, '', '/non-existent-route');

    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('должен перенаправлять неавторизованных пользователей с /favorites на /login', () => {
    mockUseAppSelector.mockImplementation((selector) => selector({
      data: { isLoading: false, offers: [], favorites: [], currentOffer: null, nearbyOffers: [], reviews: [], error: null },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null },
      app: {
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13
          }
        },
        sortType: SortType.Popular,
        cities: []
      }
    }));

    window.history.pushState({}, '', '/favorites');

    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    expect(window.location.pathname).toBe('/login');
  });
});
