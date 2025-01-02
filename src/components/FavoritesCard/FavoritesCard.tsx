import { BaseCard } from '@components/BaseCard/BaseCard';
import { Offer } from 'src/types/offer';
/**
 * Интерфейс пропсов компонента FavoritesCard
 */
interface FavoritesCardProps {
  /** Объект предложения */
  offer: Offer;
}

/**
 * Компонент карточки избранного предложения
 * Отображает информацию о предложении в списке избранного
 *
 * @kind component
 */
export const FavoritesCard = ({ offer }: FavoritesCardProps) => (
  <BaseCard
    offer={offer}
    imageWrapperClassName="favorites__image-wrapper"
    imageSize={{ width: 150, height: 110 }}
    cardClassName="favorites__card"
  />
);
