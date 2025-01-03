import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import GuestRoute from './GuestRoute';
import { AuthorizationStatus } from '@/store/slices/user';

describe('@/components/GuestRoute', () => {
  const renderWithRouter = (
    component: React.ReactNode,
    authStatus: AuthorizationStatus
  ) => {
    const router = createMemoryRouter([
      {
        path: '/login',
        element: component
      }
    ], {
      initialEntries: ['/login']
    });

    const mockStore = configureStore({
      reducer: {
        user: () => ({
          authorizationStatus: authStatus
        })
      }
    });

    return render(
      <Provider store={mockStore}>
        <RouterProvider router={router} />
      </Provider>
    );
  };

  it('должен перенаправлять авторизованного пользователя на главную страницу', () => {
    const { container } = renderWithRouter(
      <GuestRoute>
        <div>Login Page</div>
      </GuestRoute>,
      AuthorizationStatus.Auth
    );

    expect(container.ownerDocument.location.pathname).toBe('/');
  });

  it('должен отображать страницу для неавторизованного пользователя', () => {
    const { getByText } = renderWithRouter(
      <GuestRoute>
        <div>Login Page</div>
      </GuestRoute>,
      AuthorizationStatus.NoAuth
    );

    expect(getByText('Login Page')).toBeInTheDocument();
  });
});
