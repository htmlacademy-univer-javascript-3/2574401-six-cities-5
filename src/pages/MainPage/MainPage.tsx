import Map from '../../components/Map/Map';
import OfferList from '@components/OfferList/OfferList';
import { useMapHover } from '@components/Map/hooks/useMapHover';
import { CITIES } from '../../mocks/cities';
import CityList from '@components/CityList/CityList';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { selectCity, selectFilteredOffers, selectSortType, changeSortType } from '../../store/slices/app';
import { useMemo } from 'react';
import { SortOptions } from '@components/SortOptions';
import { SortType } from '@components/SortOptions/types';

/**
 * Компонент главной страницы приложения
 * Отображает список предложений и карту
 *
 * @kind page
 */
const MainPage = () => {
  const dispatch = useAppDispatch();
  const city = useAppSelector(selectCity);
  const sortType = useAppSelector(selectSortType);
  const filteredOffers = useAppSelector(selectFilteredOffers);
  const { selectedPoint, handleOfferHover } = useMapHover();

  const points = useMemo(() => filteredOffers.map((offer) => ({
    id: offer.id,
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude
    }
  })), [filteredOffers]);

  if (!city) {
    return null; // или показать лоадер/заглушку
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList cities={CITIES} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {city.name}</b>
              <SortOptions
                currentSort={sortType}
                onSortChange={(sort: SortType) => dispatch(changeSortType(sort))}
              />
              <OfferList
                offers={filteredOffers}
                onOfferHover={handleOfferHover}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={city}
                points={points}
                selectedPoint={selectedPoint}
                className="cities__map map"
                isFulfilledContainer
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
