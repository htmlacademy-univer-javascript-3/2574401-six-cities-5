import { User } from './auth';
import { City } from './state';
import { Location } from './state';
/** Тип жилья */
export type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

/** Базовое предложение */
export type BaseOffer = {
  /** Уникальный идентификатор */
  id: string;
  /** Заголовок предложения */
  title: string;
  /** Тип жилья */
  type: OfferType;
  /** Стоимость за ночь */
  price: number;
  /** Город */
  city: City;
  /** Местоположение */
  location: Location;
  /** Флаг избранного */
  isFavorite: boolean;
  /** Флаг премиального предложения */
  isPremium: boolean;
  /** Рейтинг */
  rating: number;
  /** Превью изображения */
  previewImage: string;
};

/** Полное предложение */
export type Offer = BaseOffer & {
  /** Описание */
  description: string;
  /** Количество спален */
  bedrooms: number;
  /** Доступные удобства */
  goods: string[];
  /** Информация о хозяине */
  host: User;
  /** Изображения жилья */
  images: string[];
  /** Максимальное количество гостей */
  maxAdults: number;
};
