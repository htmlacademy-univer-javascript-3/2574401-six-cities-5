import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Layout from './Layout';

describe('@/components/Layout', () => {
  const mockStore = configureStore({
    reducer: {
      user: () => ({
        authorizationStatus: 'AUTH',
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

  it('должен корректно отрисовать шаблон страницы', () => {
    const testContent = 'Test Content';
    const testClassName = 'test-class';

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Layout pageClassName={testClassName}>
            <div>{testContent}</div>
          </Layout>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('img', { name: '6 cities logo' })).toBeInTheDocument();
    expect(screen.getByText(testContent)).toBeInTheDocument();
    expect(document.querySelector(`.page.${testClassName}`)).toBeInTheDocument();
  });

  it('должен работать без дополнительного класса страницы', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Layout>
            <div>Content</div>
          </Layout>
        </MemoryRouter>
      </Provider>
    );

    expect(document.querySelector('.page')).toBeInTheDocument();
  });
});
