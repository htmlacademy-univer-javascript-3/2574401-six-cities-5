import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CityList from './CityList';
import appReducer from '../../store/slices/app';
import { SortType } from '../../components/SortOptions/types';
import { State } from '../../types/state';

describe('components/CityList', () => {
  const mockCity = {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  };

  const mockCities = [
    mockCity,
    {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    }
  ];

  const mockStore = configureStore({
    reducer: {
      app: appReducer
    },
    preloadedState: {
      app: {
        city: mockCity,
        cities: mockCities,
        sortType: SortType.Popular
      }
    } as State
  });

  it('должен корректно отрисовать список городов', () => {
    render(
      <Provider store={mockStore}>
        <CityList />
      </Provider>
    );

    mockCities.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('должен отметить активный город', () => {
    render(
      <Provider store={mockStore}>
        <CityList />
      </Provider>
    );

    const activeCity = screen.getByText(mockCity.name);
    expect(activeCity.closest('a')).toHaveClass('tabs__item--active');
  });
});
