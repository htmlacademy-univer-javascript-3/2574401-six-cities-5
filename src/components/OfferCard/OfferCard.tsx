import { BaseCard, BaseCardProps } from '@components/BaseCard/BaseCard';

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
  /** Координаты расположения предложения */
  location: {
    /** Широта */
    latitude: number;
    /** Долгота */
    longitude: number;
    /** Зум */
    zoom: number;
  };
  /** Рейтинг предложения */
  rating: number;
}

/**
 * Пропсы компонента OfferCard
 */
type OfferCardProps = Pick<BaseCardProps, 'onCardHover' | 'offer'>;

/**
 * Компонент карточки предложения
 * Отображает информацию о предложении, включая изображение, цену, название и тип
 *
 * @kind component
 */
const OfferCard = (props: OfferCardProps) => (
  <BaseCard
    {...props}
    imageWrapperClassName="cities__image-wrapper"
    imageSize={{ width: 260, height: 200 }}
    cardClassName="cities__card"
  />
);

export default OfferCard;
