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
const OfferList = ({ offers, onOfferHover }: OfferListProps) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <OfferCard key={offer.id} offer={offer} onCardHover={onOfferHover} />
    ))}
  </div>
);

export default OfferList;
