import { useState, useCallback, memo, useMemo, useEffect, useRef } from 'react';
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
const SortOptionsComponent = memo(({ currentSort, onSortChange }: SortOptionsProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const componentRef = useRef<HTMLFormElement>(null);

  const handleTypeClick = useCallback((type: SortType) => {
    onSortChange(type);
    setIsOpened(false);
  }, [onSortChange]);

  const handleToggleOpen = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpened(false);
    }
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setIsOpened(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleKeyDown, handleClickOutside]);

  const sortOptionsList = useMemo(() =>
    Object.values(SortType).map((type) => (
      <li
        key={type}
        className={cn(
          'places__option',
          {'places__option--active': type === currentSort}
        )}
        tabIndex={0}
        onClick={() => handleTypeClick(type)}
        data-testid={`sort-option-${type}`}
      >
        {type}
      </li>
    )), [currentSort, handleTypeClick]);

  return (
    <form className="places__sorting" action="#" method="get" ref={componentRef}>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggleOpen}
        onKeyDown={(e) => e.key === 'Enter' && handleToggleOpen()}
        data-testid="sort-type"
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
        {sortOptionsList}
      </ul>
    </form>
  );
});

SortOptionsComponent.displayName = 'SortOptions';

export const SortOptions = SortOptionsComponent;

