import { memo, useCallback, useMemo } from 'react';
import { City } from '@/types/state';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeCity, selectCity, selectCities } from '@/store/slices/app';
import cn from 'classnames';

/**
 * Компонент списка городов
 * Отображает список доступных городов из API и позволяет выбрать активный город
 */
const CityListComponent = memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(selectCity);
  const cities = useAppSelector(selectCities);

  const handleCityClick = useCallback((city: City) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  const cityItems = useMemo(() =>
    cities.map((city) => (
      <li key={city.name} className="locations__item">
        <a
          className={cn(
            'locations__item-link',
            'tabs__item',
            {'tabs__item--active': activeCity?.name === city.name}
          )}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleCityClick(city);
          }}
        >
          <span>{city.name}</span>
        </a>
      </li>
    )),
  [cities, activeCity, handleCityClick]
  );

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cityItems}
      </ul>
    </section>
  );
});

CityListComponent.displayName = 'CityList';

export default CityListComponent;
