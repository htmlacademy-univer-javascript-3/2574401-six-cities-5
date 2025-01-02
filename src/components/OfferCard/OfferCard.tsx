import { BaseCard } from '@components/BaseCard/BaseCard';

/**
 * Тип данных предложения
 */
export type Offer = {
  /** Идентификатор предложения */
  id: number;
  /** URL изображения предложения */
  image: string;
  /** Цена предложения */
  price: number;
  /** Название предложения */
  name: string;
  /** Тип предложения */
  type: string;
  /** Флаг, указывающий, является ли предложение премиумом */
  isPremium: boolean;
  /** Флаг, указывающий, является ли предложение избранным */
  isFavorite: boolean;
  /** Город, в котором находится предложение */
  city: string;
}

/**
 * Пропсы компонента OfferCard
 */
interface OfferCardProps {
  /** Объект предложения */
  offer: Offer;
}

/**
 * Компонент карточки предложения
 * Отображает информацию о предложении, включая изображение, цену, название и тип
 *
 * @kind component
 */
const OfferCard = ({ offer }: OfferCardProps) => (
  <BaseCard
    offer={offer}
    imageWrapperClassName="cities__image-wrapper"
    imageSize={{ width: 260, height: 200 }}
    cardClassName="cities__card"
  />
);

export default OfferCard;
