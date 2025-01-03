import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DefaultPin } from './DefaultPin';

describe('@/components/Map/icons/DefaultPin', () => {
  it('должен корректно рендерить SVG', () => {
    const { container } = render(<DefaultPin />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '27');
    expect(svg).toHaveAttribute('height', '39');
  });
});
