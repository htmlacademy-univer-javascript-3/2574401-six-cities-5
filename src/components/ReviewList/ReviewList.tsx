import { memo, useMemo } from 'react';
import { Review as ReviewType } from '../Review/types';
import Review from '../Review/Review';
import CommentForm from '../CommentForm/CommentForm';

/**
 * Пропсы компонента ReviewList
 */
interface ReviewListProps {
  /** Массив отзывов */
  reviews: ReviewType[];
  /** Обработчик отправки нового отзыва */
  onSubmit: (comment: string, rating: number) => void;
  /** Флаг авторизации пользователя */
  isAuthorized: boolean;
  /** Флаг отправки формы */
  isSubmitting?: boolean;
  /** Сообщение об ошибке */
  submitError?: string;
}

/**
 * Компонент списка отзывов
 * Отображает список отзывов (не более 10) и форму для добавления нового отзыва
 * Отзывы отсортированы от новых к старым
 */
const ReviewListComponent = memo(({ reviews, onSubmit, isAuthorized, isSubmitting, submitError }: ReviewListProps) => {
  const sortedReviews = useMemo(() =>
    [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10), // Ограничиваем количество отзывов до 10
  [reviews]
  );

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title" data-testid="reviews-title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
      {isAuthorized && (
        <CommentForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          error={submitError}
        />
      )}
    </section>
  );
});

ReviewListComponent.displayName = 'ReviewList';

export default ReviewListComponent;

