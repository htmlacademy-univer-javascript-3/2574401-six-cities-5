import { memo, useMemo } from 'react';
import { Offer } from 'src/types/offer';
import NearPlaceCard from '@components/NearPlaceCard/NearPlaceCard';

/**
 * Пропсы компонента NearPlacesList
 */
interface NearPlacesListProps {
  /** Массив предложений */
  offers: Offer[];
  /** Обработчик наведения на предложение */
  onOfferHover?: (offer: Offer | null) => void;
}

/**
 * Компонент списка ближайших предложений
 */
const NearPlacesListComponent = memo(({ offers, onOfferHover }: NearPlacesListProps) => {
  const nearPlaceCards = useMemo(() =>
    offers.map((offer) => (
      <NearPlaceCard
        key={offer.id}
        offer={offer}
        onCardHover={onOfferHover}
      />
    )),
  [offers, onOfferHover]
  );

  return (
    <div className="near-places__list places__list" data-testid="near-places-list">
      {nearPlaceCards}
    </div>
  );
});

NearPlacesListComponent.displayName = 'NearPlacesList';

export default NearPlacesListComponent;
