import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offer } from 'src/types/offer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeFavoriteStatus } from '@/store/api-actions';
import { AuthorizationStatus } from '@/store/slices/user';

/**
 * Пропсы базового компонента карточки
 */
export interface BaseCardProps {
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
  onCardHover?: (offer: Offer | null) => void;
}

/**
 * Базовый компонент карточки предложения
 */
const BaseCardComponent = memo(({
  offer,
  imageWrapperClassName,
  imageSize,
  cardClassName,
  onCardHover
}: BaseCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);

  const handleMouseEnter = useCallback(() => {
    onCardHover?.(offer);
  }, [offer, onCardHover]);

  const handleMouseLeave = useCallback(() => {
    onCardHover?.(null);
  }, [onCardHover]);

  const handleFavoriteClick = useCallback(() => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    dispatch(changeFavoriteStatus({
      id: offer.id,
      status: offer.isFavorite ? 0 : 1
    }));
  }, [authStatus, dispatch, navigate, offer.id, offer.isFavorite]);

  // Округляем рейтинг до ближайшего целого и конвертируем в проценты
  const ratingWidth = `${(Math.round(offer.rating) * 100) / 5}%`;

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
            src={offer.previewImage}
            width={imageSize.width}
            height={imageSize.height}
            alt={offer.title}
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
            onClick={handleFavoriteClick}
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
            <span style={{ width: ratingWidth }} data-testid="rating-stars"></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
});

BaseCardComponent.displayName = 'BaseCard';

export const BaseCard = BaseCardComponent;

