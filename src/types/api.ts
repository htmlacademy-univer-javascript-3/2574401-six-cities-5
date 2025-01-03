import { AxiosError } from 'axios';

/**
 * Тип ошибки API
 */
export interface ApiError {
  errorType: 'COMMON_ERROR' | 'VALIDATION_ERROR';
  message: string;
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
  errorType: 'VALIDATION_ERROR';
  details: {
    field: string;
    messages: string[];
  }[];
}

/**
 * Тип для нового комментария
 */
export interface NewComment {
  comment: string;
  rating: number;
}
