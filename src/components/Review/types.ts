/**
 * Интерфейс для отзыва
 */
export interface Review {
  /** ID отзыва */
  id: number;
  /** Текст отзыва */
  text: string;
  /** Рейтинг */
  rating: number;
  /** Информация о пользователе */
  user: {
    /** Имя пользователя */
    name: string;
    /** URL аватара */
    avatarUrl: string;
  };
  /** Дата отзыва */
  date: string;
}
