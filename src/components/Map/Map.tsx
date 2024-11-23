import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup, LatLngBounds } from 'leaflet';
import useMap from './hooks/useMap';
import { City, MapPoint } from './lib/types';
import { DefaultPin } from './icons/DefaultPin';
import { ActivePin } from './icons/ActivePin';
import 'leaflet/dist/leaflet.css';
import ReactDOMServer from 'react-dom/server';
import { DEFAULT_PADDING } from './lib/constants';
/**
 * Пропсы для компонента карты
 */
type MapProps = {
  /** Город для отображения на карте */
  city: City;
  /** Точки на карте */
  points: MapPoint[];
  /** Выбранная точка на карте */
  selectedPoint?: MapPoint | null;
  /** Дополнительные CSS классы для карты */
  className?: string;
  /** Флаг, указывающий, заполнен ли контейнер карты */
  isFulfilledContainer?: boolean;
};

/**
 * Конвертирует SVG в URL данные
 * @param svg - SVG строка
 * @returns URL данных
 */
const svgToDataUrl = (svg: string) => `data:image/svg+xml;base64,${btoa(svg)}`;

/** Иконка по умолчанию */
const defaultCustomIcon = new Icon({
  iconUrl: svgToDataUrl(ReactDOMServer.renderToString(<DefaultPin />)),
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

/** Иконка для выбранной точки */
const currentCustomIcon = new Icon({
  iconUrl: svgToDataUrl(ReactDOMServer.renderToString(<ActivePin />)),
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

/**
 * Компонент карты
 * @param props - Пропсы компонента
 * @returns JSX элемент
 */
function Map({ city, points, selectedPoint, className, isFulfilledContainer }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      const bounds = new LatLngBounds([]);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoint && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);

        bounds.extend([point.location.latitude, point.location.longitude]);
      });

      map.fitBounds(bounds, { padding: DEFAULT_PADDING });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div className={`map ${className}`} ref={mapRef} style={isFulfilledContainer ? { height: '100%', width: '100%' } : {}}></div>;
}

export default Map;
