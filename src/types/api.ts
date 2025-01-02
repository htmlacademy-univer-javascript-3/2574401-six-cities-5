import { AxiosError } from 'axios';

/**
 * Тип ошибки API
 */
export interface ApiError {
  message: string;
  code: string;
}

/**
 * Расширенный тип ошибки axios
 */
export type ExtendedAxiosError = AxiosError<ApiError>;

/**
 * Тип ответа API
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
}

/**
 * Тип для деталей ошибки валидации
 */
export interface ValidationErrorDetail {
  messages: string[];
}

/**
 * Тип ошибки валидации
 */
export interface ValidationError extends ApiError {
  details: ValidationErrorDetail[];
}

/**
 * Тип для нового комментария
 */
export interface NewComment {
  comment: string;
  rating: number;
}
