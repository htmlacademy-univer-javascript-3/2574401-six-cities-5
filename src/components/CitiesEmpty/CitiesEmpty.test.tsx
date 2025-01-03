import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CitiesEmpty from './CitiesEmpty';

describe('components/CitiesEmpty', () => {
  it('должен корректно отрисовать компонент с названием города', () => {
    const cityName = 'Amsterdam';

    render(<CitiesEmpty cityName={cityName} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${cityName}`))
      .toBeInTheDocument();
  });
});
