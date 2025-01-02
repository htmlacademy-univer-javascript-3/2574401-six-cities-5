import { BaseCard } from '@components/BaseCard/BaseCard';
import { Offer } from 'src/types/offer';

type OfferCardProps = {
  offer: Offer;
  onCardHover?: (offer: Offer | null) => void;
};

/**
 * Компонент карточки предложения
 * Отображает информацию о предложении, включая изображение, цену, название и тип
 */
const OfferCard = ({ offer, onCardHover }: OfferCardProps) => (
  <BaseCard
    offer={offer}
    onCardHover={onCardHover}
    imageWrapperClassName="cities__image-wrapper"
    imageSize={{ width: 260, height: 200 }}
    cardClassName="cities__card"
  />
);

export default OfferCard;
