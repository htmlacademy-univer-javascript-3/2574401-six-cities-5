import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';
import { AuthorizationStatus } from '@/store/slices/user';

describe('@/pages/LoginPage', () => {
  const createStore = (state = {
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userInfo: null
    }
  }) => configureStore({
    reducer: {
      user: () => state.user
    }
  });

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
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });

  it('должен перенаправлять на главную при авторизации', async () => {
    const authorizedStore = createStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null
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
});
