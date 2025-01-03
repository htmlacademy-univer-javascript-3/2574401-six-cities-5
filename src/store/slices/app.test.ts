import { describe, expect, it } from 'vitest';
import appReducer, { changeCity, changeSortType } from './app';
import { SortType } from '../../components/SortOptions/types';
import { City } from '../../types/state';

describe('@/store/slices/app', () => {
  const initialState = {
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    sortType: SortType.Popular,
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
  };

  it('должен вернуть начальное состояние', () => {
    const result = appReducer(undefined, { type: '' });
    expect(result.sortType).toBe(SortType.Popular);
    expect(result.city?.name).toBe('Paris');
  });

  it('должен обработать changeCity', () => {
    const city: City = {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    };

    const result = appReducer(initialState, changeCity(city));
    expect(result.city).toEqual(city);
  });

  it('должен обработать changeSortType', () => {
    const result = appReducer(initialState, changeSortType(SortType.PriceHighToLow));
    expect(result.sortType).toBe(SortType.PriceHighToLow);
  });
});
