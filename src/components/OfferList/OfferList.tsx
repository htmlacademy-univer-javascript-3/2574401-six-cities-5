import { memo, useMemo } from 'react';
import { Offer } from 'src/types/offer';
import OfferCard from '../OfferCard/OfferCard';

/**
 * Пропсы компонента OfferList
 */
interface OfferListProps {
  /**
   * Массив предложений для отображения
   */
  offers: Offer[];
  onOfferHover: (offer: Offer | null) => void;
}

/**
 * Компонент списка предложений
 * Отображает карточки предложений
 *
 * @kind component
 */
const OfferListComponent = memo(({ offers, onOfferHover }: OfferListProps) => {
  const offerCards = useMemo(() =>
    offers.map((offer) => (
      <OfferCard key={offer.id} offer={offer} onCardHover={onOfferHover} />
    )),
  [offers, onOfferHover]
  );

  return (
    <div className="cities__places-list places__list tabs__content">
      {offerCards}
    </div>
  );
});

OfferListComponent.displayName = 'OfferList';

export default OfferListComponent;
