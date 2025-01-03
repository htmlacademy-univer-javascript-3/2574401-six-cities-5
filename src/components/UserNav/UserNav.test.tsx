import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import UserNav from './UserNav';
import { AuthorizationStatus } from '@/store/slices/user';
import * as ApiActions from '@/store/api-actions';

vi.mock('@/store/api-actions', () => ({
  logout: vi.fn()
}));

describe('@/components/UserNav', () => {
  const mockStore = configureStore({
    reducer: {
      user: () => ({
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: {
          name: 'Test User',
          email: 'test@test.com',
          avatarUrl: 'test.jpg'
        }
      }),
      data: () => ({
        favorites: []
      })
    }
  });

  it('должен вызвать logout при клике на кнопку выхода', () => {
    const mockDispatch = vi.fn();
    vi.spyOn(mockStore, 'dispatch').mockImplementation(mockDispatch);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <UserNav />
        </MemoryRouter>
      </Provider>
    );

    const logoutLink = screen.getByText('Sign out');
    fireEvent.click(logoutLink);

    expect(mockDispatch).toHaveBeenCalledWith(ApiActions.logout());
  });

  it('должен отображать количество избранных предложений', () => {
    const storeWithFavorites = configureStore({
      reducer: {
        user: () => ({
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: {
            name: 'Test User',
            email: 'test@test.com',
            avatarUrl: 'test.jpg'
          }
        }),
        data: () => ({
          favorites: [{}, {}, {}]
        })
      }
    });

    render(
      <Provider store={storeWithFavorites}>
        <MemoryRouter>
          <UserNav />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
