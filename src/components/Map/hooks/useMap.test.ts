import { renderHook } from '@testing-library/react';
import { Map } from 'leaflet';
import useMap from './useMap';

vi.mock('leaflet', () => ({
  Map: vi.fn(() => ({
    addLayer: vi.fn()
  })),
  TileLayer: vi.fn()
}));

describe('@/components/Map/hooks/useMap', () => {
  const mockCity = {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  };

  const mockRef = {
    current: document.createElement('div')
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен создать карту при наличии ref', () => {
    renderHook(() => useMap(mockRef, mockCity));

    expect(Map).toHaveBeenCalledWith(mockRef.current, {
      center: {
        lat: mockCity.location.latitude,
        lng: mockCity.location.longitude,
      },
      zoom: mockCity.location.zoom,
    });
  });

  it('не должен создавать карту при отсутствии ref', () => {
    const emptyRef = { current: null };
    const { result } = renderHook(() => useMap(emptyRef, mockCity));

    expect(Map).not.toHaveBeenCalled();
    expect(result.current).toBeNull();
  });
});
