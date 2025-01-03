import { describe, expect, it } from 'vitest';
import appReducer, { changeCity, changeSortType } from './app';
import { SortType } from '../../components/SortOptions/types';
import { AppState, City } from '../../types/state';

describe('@/store/slices/app', () => {
  const initialState: Required<AppState> = {
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
      },
      {
        name: 'Amsterdam',
        location: {
          latitude: 52.37454,
          longitude: 4.897976,
          zoom: 13
        }
      }
    ] as City[]
  };

  it('должен вернуть начальное состояние', () => {
    const result = appReducer(undefined, { type: '' });
    expect(result.sortType).toBe(SortType.Popular);
    expect(result.city?.name).toBe('Paris');
    expect(result.cities).toHaveLength(6);
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

    const result = appReducer(initialState , changeCity(city));
    expect(result.city).toEqual(city);
  });

  it('должен обработать changeSortType', () => {
    const result = appReducer(initialState, changeSortType(SortType.PriceHighToLow));
    expect(result.sortType).toBe(SortType.PriceHighToLow);
  });

  it('должен сохранять существующие города при смене города', () => {
    const newCity: City = {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    };

    const result = appReducer(initialState, changeCity(newCity));
    expect(result.cities).toEqual(initialState.cities);
  });

  it('должен сохранять существующий тип сортировки при смене города', () => {
    const state: AppState = {
      ...initialState,
      sortType: SortType.PriceHighToLow
    };

    const newCity: City = {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    };

    const result = appReducer(state, changeCity(newCity));
    expect(result.sortType).toBe(SortType.PriceHighToLow);
  });

  it('должен сохранять текущий город при смене типа сортировки', () => {
    const result = appReducer(initialState, changeSortType(SortType.PriceHighToLow));
    expect(result.city).toEqual(initialState.city);
  });

  it('должен содержать все доступные типы сортировки', () => {
    const allSortTypes = [
      SortType.Popular,
      SortType.PriceHighToLow,
      SortType.PriceLowToHigh,
      SortType.TopRated
    ];

    allSortTypes.forEach((sortType) => {
      const result = appReducer(initialState, changeSortType(sortType));
      expect(result.sortType).toBe(sortType);
    });
  });
});
