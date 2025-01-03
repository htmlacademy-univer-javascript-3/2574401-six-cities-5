import { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import ReviewList from '@components/ReviewList/ReviewList';
import Map from '@components/Map/Map';
import NearPlacesList from '@components/NearPlacesList/NearPlacesList';
import { useMapHover } from '@components/Map/hooks/useMapHover';
import { City } from '@components/Map/lib/types';
import { fetchOffer, fetchNearbyOffers, fetchReviews, postReview, changeFavoriteStatus } from '@/store/api-actions';
import { selectCurrentOffer, selectNearbyOffers, selectReviews } from '@/store/slices/data';
import { AuthorizationStatus } from '@/store/slices/user';
import { Spinner } from '@/components/Spinner/Spinner';

/**
 * Компонент страницы предложения
 * Отображает детальную информацию о предложении аренды:
 * - Фотографии (до 6 штук)
 * - Основную информацию (заголовок, тип, рейтинг, особенности)
 * - Информацию о хозяине
 * - Отзывы пользователей
 * - Карту с ближайшими предложениями
 *
 * @component
 */
const OfferPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector(selectCurrentOffer);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const reviews = useAppSelector(selectReviews);
  const { isLoading } = useAppSelector((state) => state.data);
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadOfferData = useCallback(async (offerId: string) => {
    try {
      await Promise.all([
        dispatch(fetchOffer(offerId)).unwrap(),
        dispatch(fetchNearbyOffers(offerId)).unwrap(),
        dispatch(fetchReviews(offerId)).unwrap()
      ]);
    } catch {
      navigate('/404');
    }
  }, [dispatch, navigate]);

  const handleFavoriteClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    if (!currentOffer) {
      return;
    }

    dispatch(changeFavoriteStatus({
      id: currentOffer.id,
      status: currentOffer.isFavorite ? 0 : 1
    }));
  };

  useEffect(() => {
    if (!id) {
      navigate('/404');
      return;
    }

    if (!currentOffer || currentOffer.id !== id) {
      loadOfferData(id);
    }
  }, [id, currentOffer, loadOfferData, navigate]);

  const handleReviewSubmit = (comment: string, rating: number) => {
    if (id) {
      setIsSubmitting(true);
      dispatch(postReview({ offerId: id, comment, rating })).unwrap().then(() => {
        setIsSubmitting(false);
      });
    }
  };

  const { selectedPoint, handleOfferHover } = useMapHover();

  if (isLoading || !currentOffer) {
    return <Spinner />;
  }

  // Подготавливаем город для карты
  const city: City = {
    name: currentOffer.city.name,
    location: {
      latitude: currentOffer.location.latitude,
      longitude: currentOffer.location.longitude,
      zoom: currentOffer.city.location.zoom
    }
  };

  // Подготавливаем точки для карты (текущее предложение + ближайшие)
  const points = [
    currentOffer,
    ...nearbyOffers
  ].map((offer) => ({
    id: offer.id,
    location: offer.location
  }));

  const ratingWidth = `${(Math.round(currentOffer.rating) * 100) / 5}%`;

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentOffer.images.slice(0, 6).map((image) => (
              <div key={image} className="offer__image-wrapper">
                <img className="offer__image" src={image} alt={currentOffer.title} />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {currentOffer.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{currentOffer.title}</h1>
              <button
                className={`offer__bookmark-button button ${
                  currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''
                }`}
                type="button"
                onClick={handleFavoriteClick}
              >
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">
                  {currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                </span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: ratingWidth }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">
                {currentOffer.rating.toFixed(1)}
              </span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {currentOffer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {currentOffer.bedrooms} {currentOffer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {currentOffer.maxAdults} {currentOffer.maxAdults > 1 ? 'adults' : 'adult'}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentOffer.goods.map((item) => (
                  <li key={item} className="offer__inside-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={`offer__avatar-wrapper user__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                  <img
                    className="offer__avatar user__avatar"
                    src={currentOffer.host.avatarUrl}
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">
                  {currentOffer.host.name}
                </span>
                {currentOffer.host.isPro && (
                  <span className="offer__user-status">
                    Pro
                  </span>
                )}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {currentOffer.description}
                </p>
              </div>
            </div>
            <ReviewList
              reviews={reviews}
              onSubmit={handleReviewSubmit}
              isSubmitting={isSubmitting}
              isAuthorized={authStatus === AuthorizationStatus.Auth}
            />
          </div>
        </div>
        <Map
          city={city}
          points={points}
          selectedPoint={selectedPoint}
          className="offer__map"
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <NearPlacesList
            offers={nearbyOffers}
            onOfferHover={handleOfferHover}
          />
        </section>
      </div>
    </main>
  );
};

export default OfferPage;
