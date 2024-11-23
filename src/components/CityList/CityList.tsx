import { City } from '../../types/state';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeCity, selectCity } from '../../store/slices/app';
import cn from 'classnames';

/**
 * Пропсы для компонента списка городов
 * @interface CityListProps
 * @property cities - Массив городов для отображения
 */
interface CityListProps {
  cities: City[];
}

/**
 * Компонент списка городов
 * Отображает список доступных городов и позволяет выбрать активный город
 *
 * @component
 * @param props - Пропсы компонента
 * @returns Отрендеренный компонент списка городов
 */
const CityList = ({ cities }: CityListProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(selectCity);

  /**
   * Обработчик клика по городу
   * @param city - Выбранный город
   */
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
