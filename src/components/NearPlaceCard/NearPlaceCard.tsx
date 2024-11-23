import { BaseCard, BaseCardProps } from '@components/BaseCard/BaseCard';

type NearPlaceCardProps = Pick<BaseCardProps, 'onCardHover' | 'offer'>;

/**
 * Компонент карточки ближайшего предложения
 * Использует BaseCard с предустановленными стилями для секции "Other places in the neighbourhood"
 */
const NearPlaceCard = (props: NearPlaceCardProps) => (
  <BaseCard
    {...props}
    imageWrapperClassName="near-places__image-wrapper"
    imageSize={{ width: 260, height: 200 }}
    cardClassName="near-places__card"
  />
);

export default NearPlaceCard;
