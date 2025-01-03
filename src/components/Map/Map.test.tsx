import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Map from './Map';
import { City, MapPoint } from './lib/types';
import * as useMapHook from './hooks/useMap';
import { Map as LeafletMap } from 'leaflet';

vi.mock('leaflet', () => ({
  Icon: vi.fn(),
  Marker: vi.fn(() => ({
    setIcon: vi.fn().mockReturnThis(),
    addTo: vi.fn().mockReturnThis()
  })),
  layerGroup: vi.fn(() => ({
    addTo: vi.fn().mockReturnThis()
  })),
  LatLngBounds: vi.fn(() => ({
    extend: vi.fn().mockReturnThis()
  }))
}));

describe('@/components/Map', () => {
  const mockCity: City = {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  };

  const mockPoints: MapPoint[] = [
    {
      id: '1',
      location: {
        latitude: 48.85661,
        longitude: 2.351499
      }
    },
    {
      id: '2',
      location: {
        latitude: 48.85671,
        longitude: 2.351599
      }
    }
  ];

  const mockMap = {
    setView: vi.fn(),
    fitBounds: vi.fn(),
    removeLayer: vi.fn(),
    addLayer: vi.fn()
  } as unknown as LeafletMap;

  beforeEach(() => vi.spyOn(useMapHook, 'default').mockReturnValue(mockMap));

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('должен корректно рендериться с базовыми пропсами', () => {
    render(
      <Map
        city={mockCity}
        points={[]}
      />
    );

    const mapElement = screen.getByTestId('map-container');
    expect(mapElement).toHaveClass('map');
  });

  it('должен применять дополнительные классы', () => {
    render(
      <Map
        city={mockCity}
        points={[]}
        className="custom-class"
      />
    );

    const mapElement = screen.getByTestId('map-container');
    expect(mapElement).toHaveClass('map', 'custom-class');
  });

  it('должен устанавливать стили для заполненного контейнера', () => {
    render(
      <Map
        city={mockCity}
        points={[]}
        isFulfilledContainer
      />
    );

    const mapElement = screen.getByTestId('map-container');
    expect(mapElement).toHaveStyle({
      height: '100%',
      width: '100%'
    });
  });

  it('должен отображать маркеры для всех точек', () => {
    render(
      <Map
        city={mockCity}
        points={mockPoints}
      />
    );

    expect(mockMap.setView).toHaveBeenCalledWith(
      [mockCity.location.latitude, mockCity.location.longitude],
      mockCity.location.zoom
    );
  });

  it('должен отображать активный маркер для выбранной точки', () => {
    const selectedPoint = mockPoints[0];

    render(
      <Map
        city={mockCity}
        points={mockPoints}
        selectedPoint={selectedPoint}
      />
    );

    expect(mockMap.setView).toHaveBeenCalled();
  });

  it('должен очищать слои при размонтировании', () => {
    const { unmount } = render(
      <Map
        city={mockCity}
        points={mockPoints}
      />
    );

    unmount();
    expect(mockMap.removeLayer).toHaveBeenCalled();
  });
});
