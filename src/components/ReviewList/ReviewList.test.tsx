import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import ReviewList from './ReviewList';
import { Review as ReviewType } from '../Review/types';

describe('@/components/ReviewList', () => {
  const mockReviews: ReviewType[] = [
    {
      id: 1,
      date: '2024-01-02T10:00:00.000Z',
      user: {
        name: 'John',
        avatarUrl: 'john.jpg'
      },
      text: 'Great place!',
      rating: 5
    },
    {
      id: 2,
      date: '2024-01-01T10:00:00.000Z',
      user: {
        name: 'Jane',
        avatarUrl: 'jane.jpg'
      },
      text: 'Nice apartment',
      rating: 4
    }
  ];

  const mockStore = configureStore({
    reducer: {
      user: () => ({
        authorizationStatus: 'AUTH',
        userInfo: null
      })
    }
  });

  const renderWithProvider = (component: React.ReactNode) => render(
    <Provider store={mockStore}>
      <MemoryRouter>
        {component}
      </MemoryRouter>
    </Provider>
  );

  it('должен отображать список отзывов', () => {
    renderWithProvider(
      <ReviewList
        reviews={mockReviews}
        onSubmit={() => {}}
        isAuthorized={false}
      />
    );

    const reviewTexts = screen.getAllByTestId('review-text');
    expect(reviewTexts[0]).toHaveTextContent(/great place/i);
    expect(reviewTexts[1]).toHaveTextContent(/nice apartment/i);
    expect(screen.getByTestId('reviews-title')).toHaveTextContent('Reviews · 2');
  });

  it('должен сортировать отзывы по дате в обратном порядке', () => {
    renderWithProvider(
      <ReviewList
        reviews={mockReviews}
        onSubmit={() => {}}
        isAuthorized={false}
      />
    );

    const reviewTexts = screen.getAllByTestId('review-text');
    expect(reviewTexts[0]).toHaveTextContent(/great place/i);
    expect(reviewTexts[1]).toHaveTextContent(/nice apartment/i);
  });

  it('должен отображать форму комментария для авторизованных пользователей', () => {
    renderWithProvider(
      <ReviewList
        reviews={mockReviews}
        onSubmit={() => {}}
        isAuthorized
      />
    );

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('не должен отображать форму комментария для неавторизованных пользователей', () => {
    renderWithProvider(
      <ReviewList
        reviews={mockReviews}
        onSubmit={() => {}}
        isAuthorized={false}
      />
    );

    expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument();
  });

  it('должен вызывать onSubmit при отправке формы', async () => {
    const handleSubmit = vi.fn();
    renderWithProvider(
      <ReviewList
        reviews={mockReviews}
        onSubmit={handleSubmit}
        isAuthorized
      />
    );

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    const rating = screen.getByTitle('4 stars');

    await userEvent.type(textarea, 'Test comment');
    await userEvent.click(rating);
    fireEvent.submit(submitButton.closest('form')!);

    expect(handleSubmit).toHaveBeenCalledWith('Test comment', 4);
  });
});
