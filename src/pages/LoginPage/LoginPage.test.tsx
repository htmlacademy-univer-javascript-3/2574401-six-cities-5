import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';
import { AuthorizationStatus } from '@/store/slices/user';

describe('@/pages/LoginPage', () => {
  const mockDispatch = vi.fn();

  const createStore = (state: {
    user: {
      authorizationStatus: AuthorizationStatus;
      userInfo: {
        name: string;
        avatarUrl: string;
        isPro: boolean;
        email: string;
        token: string;
      } | null;
    };
    app: {
      cities: Array<{
        name: string;
        location: {
          latitude: number;
          longitude: number;
          zoom: number;
        };
      }>;
    };
  } = {
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userInfo: null
    },
    app: {
      cities: [
        {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13
          }
        }
      ]
    }
  }) => {
    const store = configureStore({
      reducer: {
        user: () => ({ ...state.user }),
        app: () => state.app
      }
    });
    store.dispatch = mockDispatch;
    return store;
  };

  const renderWithProvider = (store = createStore()) => {
    const router = createMemoryRouter(
      [
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/',
          element: <div>Main Page</div>
        }
      ],
      {
        initialEntries: ['/login'],
        initialIndex: 0
      }
    );

    return {
      ...render(
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      ),
      router
    };
  };

  it('должен отображать форму входа', () => {
    renderWithProvider();

    expect(screen.getByRole('heading', { name: 'Sign in', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /6 cities logo/i })).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('должен перенаправлять на главную при авторизации', async () => {
    const authorizedStore = createStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: {
          name: 'John Doe',
          avatarUrl: 'https://example.com/avatar.jpg',
          isPro: false,
          email: 'john.doe@example.com',
          token: '1234567890'
        }
      },
      app: {
        cities: [
          {
            name: 'Paris',
            location: {
              latitude: 48.85661,
              longitude: 2.351499,
              zoom: 13
            }
          }
        ]
      }
    });

    const { router } = renderWithProvider(authorizedStore);
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/');
    });
  });

  it('не должен перенаправлять без авторизации', async () => {
    const { router } = renderWithProvider();
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/login');
    });
  });

  it('должен отображать форму логина', () => {
    renderWithProvider();

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('required');
  });

  it('должен иметь корректные классы для стилизации', () => {
    renderWithProvider();

    expect(screen.getByTestId('login-page')).toHaveClass('page', 'page--gray', 'page--login');
    expect(screen.getByTestId('login-main')).toHaveClass('page__main', 'page__main--login');
  });

  it('должен обрабатывать клик по случайному городу', async () => {
    const { router } = renderWithProvider();

    const cityLink = screen.getByTestId('random-city-link');
    fireEvent.click(cityLink);

    expect(mockDispatch).toHaveBeenCalled();
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/');
    });
  });
});
