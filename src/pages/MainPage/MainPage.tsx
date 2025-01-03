import Map from '../../components/Map/Map';
import OfferList from '@components/OfferList/OfferList';
import { useMapHover } from '@components/Map/hooks/useMapHover';
import CityList from '@components/CityList/CityList';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { selectCity, selectFilteredOffers, selectSortType, changeSortType } from '../../store/slices/app';
import { useMemo } from 'react';
import { SortOptions } from '@components/SortOptions';
import { SortType } from '@components/SortOptions/types';
import CitiesEmpty from '@components/CitiesEmpty/CitiesEmpty';

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

  const handleSortChange = (sort: SortType) => {
    dispatch(changeSortType(sort));
  };

  if (!city) {
    return null;
  }

  const isEmpty = filteredOffers.length === 0;

  return (
    <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`} data-testid="main-page">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CityList />
      </div>
      <div className="cities">
        <div className={`cities__places-container ${isEmpty ? 'cities__places-container--empty' : ''} container`} data-testid="places-container">
          {isEmpty ? (
            <CitiesEmpty cityName={city.name} />
          ) : (
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {city.name}</b>
              <SortOptions
                currentSort={sortType}
                onSortChange={handleSortChange}
              />
              <OfferList
                offers={filteredOffers}
                onOfferHover={handleOfferHover}
              />
            </section>
          )}
          <div className="cities__right-section">
            {!isEmpty && (
              <Map
                city={city}
                points={points}
                selectedPoint={selectedPoint}
                className="cities__map map"
                isFulfilledContainer
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
