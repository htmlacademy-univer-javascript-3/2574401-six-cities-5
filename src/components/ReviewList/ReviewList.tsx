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
}

/**
 * Компонент списка отзывов
 * Отображает список отзывов и форму для добавления нового отзыва
 */
const ReviewList = ({ reviews, onSubmit, isAuthorized }: ReviewListProps) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
    {isAuthorized && <CommentForm onSubmit={onSubmit} />}
  </section>
);

export default ReviewList;
