import { renderHook, act } from '@testing-library/react';
import { useMapHover } from './useMapHover';
import { Offer } from '@/types/offer';

describe('@/components/Map/hooks/useMapHover', () => {
  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer',
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
    description: 'Test',
    bedrooms: 2,
    goods: [],
    host: {
      name: 'Test Host',
      avatarUrl: 'test.jpg',
      isPro: false,
      email: 'test@test.com',
      token: 'token'
    },
    images: ['test.jpg'],
    maxAdults: 2,
    previewImage: 'test.jpg'
  };

  it('должен вернуть начальное состояние с null', () => {
    const { result } = renderHook(() => useMapHover());

    expect(result.current.selectedPoint).toBeNull();
  });

  it('должен обновить selectedPoint при вызове handleOfferHover с offer', () => {
    const { result } = renderHook(() => useMapHover());

    act(() => {
      result.current.handleOfferHover(mockOffer);
    });

    expect(result.current.selectedPoint).toEqual({
      id: mockOffer.id,
      location: {
        latitude: mockOffer.location.latitude,
        longitude: mockOffer.location.longitude
      }
    });
  });

  it('должен установить selectedPoint в null при вызове handleOfferHover с null', () => {
    const { result } = renderHook(() => useMapHover());

    // Сначала устанавливаем точку
    act(() => {
      result.current.handleOfferHover(mockOffer);
    });

    // Затем сбрасываем
    act(() => {
      result.current.handleOfferHover(null);
    });

    expect(result.current.selectedPoint).toBeNull();
  });
});
