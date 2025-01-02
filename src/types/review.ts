import { User } from './auth';

/** Отзыв */
export type Review = {
  /** Уникальный идентификатор */
  id: string;
  /** Дата отзыва */
  date: string;
  /** Пользователь */
  user: User;
  /** Текст комментария */
  comment: string;
  /** Рейтинг */
  rating: number;
};

/** Данные для отправки отзыва */
export type CommentData = {
  /** Текст комментария */
  comment: string;
  /** Рейтинг */
  rating: number;
};
