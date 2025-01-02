import { Link } from 'react-router-dom';
import type { Offer } from '@components/OfferCard/OfferCard';

/**
 * Пропсы базового компонента карточки
 */
interface BaseCardProps {
  /** Объект предложения */
  offer: Offer;
  /** Дополнительные CSS классы для обертки изображения */
  imageWrapperClassName: string;
  /** Размеры изображения */
  imageSize: {
    width: number;
    height: number;
  };
  /** Дополнительные CSS классы для карточки */
  cardClassName: string;
  /** Обработчик наведения на карточку */
  onCardHover?: (offerId: number | null) => void;
}

/**
 * Базовый компонент карточки предложения
 * Содержит общую структуру и функциональность для всех типов карточек
 *
 * @kind component
 */
export const BaseCard = ({
  offer,
  imageWrapperClassName,
  imageSize,
  cardClassName,
  onCardHover
}: BaseCardProps) => {

  const handleMouseEnter = () => {
    onCardHover?.(offer.id);
  };

  const handleMouseLeave = () => {
    onCardHover?.(null);
  };

  return (
    <article
      className={`place-card ${cardClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="place-card"
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper ${imageWrapperClassName}`}>
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.image}
            width={imageSize.width}
            height={imageSize.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.name}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

