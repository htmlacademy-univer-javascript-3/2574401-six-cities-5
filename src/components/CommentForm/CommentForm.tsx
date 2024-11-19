import { Fragment, useState, ChangeEvent, FormEvent } from 'react';

/**
 * Интерфейс для пропсов компонента CommentForm
 */
interface CommentFormProps {
  /** Обработчик отправки комментария */
  onSubmit: (comment: string, rating: number) => void;
}

const MIN_COMMENT_LENGTH = 50;
const STARS = [5, 4, 3, 2, 1];

/**
 * Компонент формы отправки комментария
 * Позволяет пользователю оставить отзыв и оценку
 *
 * @kind component
 */
const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit(comment, rating);
    setComment('');
    setRating(0);
  };

  const isSubmitDisabled = comment.length < MIN_COMMENT_LENGTH || rating === 0;

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {STARS.map((star) => (
          <Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={rating === star}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={`${star} stars`}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
