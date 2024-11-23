import { type Review } from '@components/Review/types';

/**
 * Моковые данные отзывов
 */
export const reviews: Review[] = [
  {
    id: 1,
    text: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    rating: 4,
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    date: '2019-04-24'
  }
] as const;
