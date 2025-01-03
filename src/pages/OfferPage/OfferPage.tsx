import { Review } from '@components/Review/types';
import ReviewList from '@components/ReviewList/ReviewList';
import Map from '@components/Map/Map';
import { Offer } from 'src/types/offer';
import NearPlacesList from '@components/NearPlacesList/NearPlacesList';
import { useMapHover } from '@components/Map/hooks/useMapHover';
import { City } from '@components/Map/lib/types';

type OfferPageProps = {
  reviews: Review[];
  offers: Offer[];
};

/**
 * Компонент страницы предложения
 * Отображает информацию о предложении и отзывы
 *
 * @kind page
 */
const OfferPage = ({reviews, offers}: OfferPageProps) => {
  // Получаем текущее предложение (для примера берем первое)
  const currentOffer = offers[0];

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
  const points = offers.map((offer) => ({
    id: offer.id,
    location: offer.location
  }));

  const handleReviewSubmit = () => {
    // Здесь будет логика отправки отзыва
  };

  const { selectedPoint, handleOfferHover } = useMapHover();

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
            </div>
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            <div className="offer__mark">
              <span>Premium</span>
            </div>
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                Beautiful &amp; luxurious studio at great location
              </h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">4.8</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                Apartment
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                3 Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max 4 adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;120</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                <li className="offer__inside-item">
                  Wi-Fi
                </li>
                <li className="offer__inside-item">
                  Washing machine
                </li>
                <li className="offer__inside-item">
                  Towels
                </li>
                <li className="offer__inside-item">
                  Heating
                </li>
                <li className="offer__inside-item">
                  Coffee machine
                </li>
                <li className="offer__inside-item">
                  Baby seat
                </li>
                <li className="offer__inside-item">
                  Kitchen
                </li>
                <li className="offer__inside-item">
                  Dishwasher
                </li>
                <li className="offer__inside-item">
                  Cable TV
                </li>
                <li className="offer__inside-item">
                  Fridge
                </li>
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  Angelina
                </span>
                <span className="offer__user-status">
                  Pro
                </span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                </p>
                <p className="offer__text">
                  An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                </p>
              </div>
            </div>
            <ReviewList
              reviews={reviews}
              onSubmit={handleReviewSubmit}
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
            offers={offers.filter((offer) => offer.id !== currentOffer.id)}
            onOfferHover={handleOfferHover}
          />
        </section>
      </div>
    </main>
  );
};

export default OfferPage;
