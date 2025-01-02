import { City } from '@/types/state';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeCity, selectCity, selectCities } from '@/store/slices/app';
import cn from 'classnames';

/**
 * Компонент списка городов
 * Отображает список доступных городов из API и позволяет выбрать активный город
 */
const CityList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(selectCity);
  const cities = useAppSelector(selectCities);

  const handleCityClick = (city: City) => {
    dispatch(changeCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
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
        ))}
      </ul>
    </section>
  );
};

export default CityList;
