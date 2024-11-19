import OfferCard, { Offer } from '../OfferCard/OfferCard';

/**
 * Пропсы компонента OfferList
 */
interface OfferListProps {
  /**
   * Массив предложений для отображения
   */
  offers: Offer[];
}

/**
 * Компонент списка предложений
 * Отображает карточки предложений
 *
 * @kind component
 */
const OfferList = ({ offers }: OfferListProps) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <OfferCard key={offer.id} offer={offer} />
    ))}
  </div>
);

export default OfferList;
