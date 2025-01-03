import { describe, it, expect, vi } from 'vitest';
import { createAPI } from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { AppDispatch } from '../types/state';
import { PayloadAction } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from './slices/user';
import { fetchOffers, fetchOffer, fetchFavorites, changeFavoriteStatus, checkAuth, login, logout } from './api-actions';
import MockAdapter from 'axios-mock-adapter';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, PayloadAction, AppDispatch>(middlewares);

  const mockOffer = {
    id: '1',
    title: 'Test offer',
    type: 'apartment',
    price: 100,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    description: 'Test description',
    bedrooms: 2,
    goods: ['Wi-Fi'],
    host: {
      name: 'Test Host',
      avatarUrl: 'test.jpg',
      isPro: false,
      email: 'test@test.com',
      token: 'token'
    },
    images: ['test.jpg'],
    maxAdults: 2,
    previewImage: 'preview.jpg'
  };

  it('должен загрузить список предложений', async () => {
    const store = mockStore();
    mockAPI
      .onGet('/offers')
      .reply(200, [mockOffer]);

    await store.dispatch(fetchOffers());
    const actions = store.getActions();

    expect(actions[0].type).toBe(fetchOffers.pending.type);
    expect(actions[1].type).toBe(fetchOffers.fulfilled.type);
    expect(actions[1].payload).toEqual([mockOffer]);
  });

  it('должен загрузить детальную информацию о предложении', async () => {
    const store = mockStore();
    mockAPI
      .onGet('/offers/1')
      .reply(200, mockOffer);

    await store.dispatch(fetchOffer('1'));
    const actions = store.getActions();

    expect(actions[0].type).toBe(fetchOffer.pending.type);
    expect(actions[1].type).toBe(fetchOffer.fulfilled.type);
    expect(actions[1].payload).toEqual(mockOffer);
  });

  it('должен загрузить список избранных предложений', async () => {
    const store = mockStore();
    mockAPI
      .onGet('/favorite')
      .reply(200, [mockOffer]);

    await store.dispatch(fetchFavorites());
    const actions = store.getActions();

    expect(actions[0].type).toBe(fetchFavorites.pending.type);
    expect(actions[1].type).toBe(fetchFavorites.fulfilled.type);
    expect(actions[1].payload).toEqual([mockOffer]);
  });

  it('должен изменить статус избранного', async () => {
    const store = mockStore();
    const updatedOffer = { ...mockOffer, isFavorite: true };
    mockAPI
      .onPost('/favorite/1/1')
      .reply(200, updatedOffer);

    await store.dispatch(changeFavoriteStatus({ id: '1', status: 1 }));
    const actions = store.getActions();

    expect(actions[0].type).toBe(changeFavoriteStatus.pending.type);
    expect(actions[1].type).toBe(changeFavoriteStatus.fulfilled.type);
    expect(actions[1].payload).toEqual(updatedOffer);
  });

  it('должен проверить статус авторизации', async () => {
    const store = mockStore();
    const authInfo = {
      token: 'token',
      name: 'Test User',
      avatarUrl: 'test.jpg',
      isPro: false,
      email: 'test@test.com'
    };

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('token');
    mockAPI
      .onGet('/login')
      .reply(200, authInfo);

    await store.dispatch(checkAuth());
    const actions = store.getActions();

    expect(actions[0].type).toBe(checkAuth.pending.type);
    expect(actions[1].type).toBe('user/setAuthStatus');
    expect(actions[1].payload).toBe(AuthorizationStatus.Auth);
    expect(actions[2].type).toBe('user/setUserInfo');
    expect(actions[2].payload).toEqual(authInfo);
    expect(actions[3].type).toBe(checkAuth.fulfilled.type);
  });

  it('должен выполнить авторизацию', async () => {
    const store = mockStore();
    const authData = { email: 'test@test.com', password: '123456' };
    const authInfo = {
      token: 'token',
      name: 'Test User',
      avatarUrl: 'test.jpg',
      isPro: false,
      email: 'test@test.com'
    };

    mockAPI
      .onPost('/login')
      .reply(200, authInfo);

    await store.dispatch(login(authData));
    const actions = store.getActions();

    expect(actions[0].type).toBe(login.pending.type);
    expect(actions[1].type).toBe('user/setAuthStatus');
    expect(actions[1].payload).toBe(AuthorizationStatus.Auth);
    expect(actions[2].type).toBe('user/setUserInfo');
    expect(actions[2].payload).toEqual(authInfo);
    expect(actions[3].type).toBe(login.fulfilled.type);
  });

  it('должен выполнить выход', async () => {
    const store = mockStore();
    mockAPI
      .onDelete('/logout')
      .reply(204);

    await store.dispatch(logout());
    const actions = store.getActions();

    expect(actions[0].type).toBe(logout.pending.type);
    expect(actions[1].type).toBe('user/setAuthStatus');
    expect(actions[1].payload).toBe(AuthorizationStatus.NoAuth);
    expect(actions[2].type).toBe('user/setUserInfo');
    expect(actions[2].payload).toBeNull();
    expect(actions[3].type).toBe(logout.fulfilled.type);
  });
});
