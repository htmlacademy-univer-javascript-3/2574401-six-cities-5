import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/services/api';
import { Offer } from '@/types/offer';
import { Review } from '@/components/Review/types';

/**
 * Получение списка предложений
 */
export const fetchOffers = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);

/**
 * Получение отзывов для предложения
 */
export const fetchReviews = createAsyncThunk(
  'data/fetchReviews',
  async (offerId: string) => {
    const { data } = await api.get<Review[]>(`/offers/${offerId}/reviews`);
    return data;
  }
);

/**
 * Отправка нового отзыва
 */
export const postReview = createAsyncThunk(
  'data/postReview',
  async ({ offerId, comment, rating }: { offerId: string; comment: string; rating: number }) => {
    const { data } = await api.post<Review>(`/offers/${offerId}/reviews`, { comment, rating });
    return data;
  }
);
