import { Link } from 'react-router-dom';
import { Offer } from 'src/types/offer';
import { FavoritesCard } from '../FavoritesCard/FavoritesCard';

/**
 * Тип для сгруппированных предложений по городам
 */
type GroupedOffers = Record<string, Offer[]>;

/**
 * Пропсы компонента FavoritesList
 */
interface FavoritesListProps {
  /** Массив избранных предложений */
  offers: Offer[];
}

/**
 * Компонент списка избранных предложений
 * Группирует и отображает избранные предложения по городам
 *
 * @kind component
 */
const FavoritesList = ({ offers }: FavoritesListProps) => {
  const groupedOffers = offers.reduce<GroupedOffers>((acc, offer) => {
    const { city } = offer;

    if (!acc[city.name]) {
      acc[city.name] = [];
    }

    acc[city.name].push(offer);

    return acc;
  }, {});

  if (!offers.length) {
    return (
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Нет избранных предложений</b>
      </div>
    );
  }

  return (
    <ul className="favorites__list" data-testid="favorites-list">
      {Object.entries(groupedOffers).map(([city, cityOffers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`/?city=${city}`}>
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((offer) => (
              <FavoritesCard
                key={offer.id}
                offer={offer}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FavoritesList;
