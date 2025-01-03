import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SortOptions } from './SortOptions';
import { SortType } from './types';

describe('components/SortOptions', () => {
  it('должен корректно отрисовать компонент с текущей сортировкой', () => {
    const currentSort = SortType.Popular;
    const handleSortChange = vi.fn();

    render(
      <SortOptions
        currentSort={currentSort}
        onSortChange={handleSortChange}
      />
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();

    const currentSortElement = screen.getAllByText(currentSort)
      .find((element) => element.classList.contains('places__option--active'));
    expect(currentSortElement).toBeInTheDocument();

    // Проверяем наличие всех опций сортировки
    Object.values(SortType).forEach((sortType) => {
      const option = screen.getAllByText(sortType)
        .find((element) => element.classList.contains('places__option'));
      expect(option).toBeInTheDocument();
    });
  });

  it('должен отметить текущий тип сортировки как активный', () => {
    const currentSort = SortType.PriceHighToLow;
    const handleSortChange = vi.fn();

    render(
      <SortOptions
        currentSort={currentSort}
        onSortChange={handleSortChange}
      />
    );

    const activeOption = screen.getAllByText(currentSort)
      .find((element) => element.classList.contains('places__option'));
    expect(activeOption).toBeInTheDocument();
    expect(activeOption).toHaveClass('places__option--active');
  });
});
