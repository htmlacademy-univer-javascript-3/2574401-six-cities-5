import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ActivePin } from './ActivePin';

describe('@/components/Map/icons/ActivePin', () => {
  it('должен корректно рендерить SVG', () => {
    const { container } = render(<ActivePin />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '27');
    expect(svg).toHaveAttribute('height', '39');
  });
});
