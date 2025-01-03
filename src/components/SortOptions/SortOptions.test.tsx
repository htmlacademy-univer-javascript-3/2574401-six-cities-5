import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortOptions } from './SortOptions';
import { SortType } from './types';

describe('@/components/SortOptions', () => {
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
    expect(screen.getByTestId('sort-type')).toHaveTextContent(currentSort);
  });

  it('должен отображать список опций при клике', async () => {
    const currentSort = SortType.Popular;
    const handleSortChange = vi.fn();

    render(
      <SortOptions
        currentSort={currentSort}
        onSortChange={handleSortChange}
      />
    );

    const sortButton = screen.getByTestId('sort-type');
    await userEvent.click(sortButton);

    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');

    Object.values(SortType).forEach((sortType) => {
      expect(screen.getByTestId(`sort-option-${sortType}`)).toBeInTheDocument();
    });
  });

  it('должен вызывать onSortChange при выборе опции', async () => {
    const currentSort = SortType.Popular;
    const handleSortChange = vi.fn();

    render(
      <SortOptions
        currentSort={currentSort}
        onSortChange={handleSortChange}
      />
    );

    const sortButton = screen.getByTestId('sort-type');
    await userEvent.click(sortButton);

    const option = screen.getByTestId(`sort-option-${SortType.PriceHighToLow}`);
    await userEvent.click(option);

    expect(handleSortChange).toHaveBeenCalledWith(SortType.PriceHighToLow);
  });

  it('должен закрывать список опций при клике вне компонента', async () => {
    const currentSort = SortType.Popular;
    const handleSortChange = vi.fn();

    render(
      <>
        <div data-testid="outside">Outside</div>
        <SortOptions
          currentSort={currentSort}
          onSortChange={handleSortChange}
        />
      </>
    );

    const sortButton = screen.getByTestId('sort-type');
    await userEvent.click(sortButton);

    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');

    const outsideElement = screen.getByTestId('outside');
    await userEvent.click(outsideElement);

    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('должен обрабатывать клавишу Escape', async () => {
    const currentSort = SortType.Popular;
    const handleSortChange = vi.fn();

    render(
      <SortOptions
        currentSort={currentSort}
        onSortChange={handleSortChange}
      />
    );

    const sortButton = screen.getByTestId('sort-type');
    await userEvent.click(sortButton);

    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('должен быть доступным с клавиатуры', async () => {
    const currentSort = SortType.Popular;
    const handleSortChange = vi.fn();

    render(
      <SortOptions
        currentSort={currentSort}
        onSortChange={handleSortChange}
      />
    );

    const sortButton = screen.getByTestId('sort-type');
    await userEvent.tab();
    expect(sortButton).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');
  });
});
