import { useState, useCallback } from 'react';
import { Offer } from '@components/OfferCard/OfferCard';
import { MapPoint } from '@components/Map/lib/types';

/**
 * Хук для управления точками на карте
 * @param points - Массив точек для отображения на карте
 * @returns Объект с выбранной точкой и функцией обработки наведения
 */
export const useMapHover = () => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  const handleOfferHover = useCallback((offer: Offer | null) => {
    const point = offer
      ? {
        id: offer.id,
        location: {
          latitude: offer.location.latitude,
          longitude: offer.location.longitude
        }
      }
      : null;

    setSelectedPoint(point);
  }, []);

  return {
    selectedPoint,
    handleOfferHover
  };
};
