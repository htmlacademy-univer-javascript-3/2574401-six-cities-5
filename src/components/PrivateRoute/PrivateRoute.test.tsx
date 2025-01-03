import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import PrivateRoute from './PrivateRoute';
import { AuthorizationStatus } from '@/store/slices/user';

describe('@/components/PrivateRoute', () => {
  const TestComponent = () => <div>Protected Content</div>;
  const LoginComponent = () => <div>Login Page</div>;

  const createMockStore = (authStatus: AuthorizationStatus) => configureStore({
    reducer: {
      user: () => ({
        authorizationStatus: authStatus,
        userInfo: null
      }),
      data: () => ({
        isLoading: false,
        offers: [],
        favorites: [],
        currentOffer: null,
        nearbyOffers: [],
        reviews: [],
        error: null
      }),
      app: () => ({
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13
          }
        },
        sortType: 'Popular',
        cities: []
      })
    }
  });

  const renderWithProvider = (authStatus: AuthorizationStatus) => {
    const mockStore = createMockStore(authStatus);

    return render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route
              path="/protected"
              element={
                <PrivateRoute>
                  <TestComponent />
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it('должен отображать защищенный контент для авторизованного пользователя', () => {
    renderWithProvider(AuthorizationStatus.Auth);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('должен перенаправлять на страницу логина для неавторизованного пользователя', () => {
    renderWithProvider(AuthorizationStatus.NoAuth);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('должен показывать спиннер при неизвестном статусе авторизации', () => {
    renderWithProvider(AuthorizationStatus.Unknown);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
