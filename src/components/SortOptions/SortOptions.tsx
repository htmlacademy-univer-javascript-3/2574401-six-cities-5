import { useState, useCallback } from 'react';
import cn from 'classnames';
import { SortType } from './types';

/**
 * Пропсы компонента SortOptions
 */
interface SortOptionsProps {
  /** Текущий тип сортировки */
  currentSort: SortType;
  /** Обработчик изменения типа сортировки */
  onSortChange: (sort: SortType) => void;
}

/**
 * Компонент для отображения опций сортировки
 */
export const SortOptions = ({ currentSort, onSortChange }: SortOptionsProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleTypeClick = useCallback((type: SortType) => {
    onSortChange(type);
    setIsOpened(false);
  }, [onSortChange]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn(
        'places__options',
        'places__options--custom',
        {'places__options--opened': isOpened}
      )}
      >
        {Object.values(SortType).map((type) => (
          <li
            key={type}
            className={cn(
              'places__option',
              {'places__option--active': type === currentSort}
            )}
            tabIndex={0}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
};

