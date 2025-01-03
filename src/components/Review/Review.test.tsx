import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Review from './Review';

describe('@/components/Review', () => {
  const mockReview = {
    id: 1,
    user: {
      name: 'John Doe',
      avatarUrl: 'test-avatar.jpg',
      isPro: false
    },
    rating: 4,
    text: 'Great place to stay!',
    date: '2024-01-15T10:00:00.000Z'
  };

  it('должен корректно отрисовать отзыв', () => {
    render(<Review review={mockReview} />);

    // Проверяем отображение информации о пользователе
    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockReview.user.avatarUrl);

    // Проверяем отображение рейтинга
    const ratingStyle = screen.getByText('Rating').previousSibling as HTMLElement;
    expect(ratingStyle).toHaveStyle({ width: `${mockReview.rating * 20}%` });

    // Проверяем текст отзыва
    expect(screen.getByText(mockReview.text)).toBeInTheDocument();

    // Проверяем форматирование даты
    const expectedDate = new Date(mockReview.date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it('должен корректно отображать рейтинг 0', () => {
    const reviewWithZeroRating = {
      ...mockReview,
      rating: 0
    };

    render(<Review review={reviewWithZeroRating} />);

    const ratingStyle = screen.getByText('Rating').previousSibling as HTMLElement;
    expect(ratingStyle).toHaveStyle({ width: '0%' });
  });

  it('должен корректно отображать максимальный рейтинг', () => {
    const reviewWithMaxRating = {
      ...mockReview,
      rating: 5
    };

    render(<Review review={reviewWithMaxRating} />);

    const ratingStyle = screen.getByText('Rating').previousSibling as HTMLElement;
    expect(ratingStyle).toHaveStyle({ width: '100%' });
  });
});
