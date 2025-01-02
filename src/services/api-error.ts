import axios, { AxiosError } from 'axios';
import { ApiError, ValidationError } from '../types/api';

/**
 * Проверяет, является ли ошибка ошибкой API
 */
export const isApiError = (error: unknown): error is AxiosError<ApiError> =>
  axios.isAxiosError(error) &&
  error.response !== undefined &&
  'errorType' in (error.response.data || {});

/**
 * Проверяет, является ли ошибка ошибкой валидации
 */
export const isValidationError = (error: unknown): error is AxiosError<ValidationError> =>
  isApiError(error) &&
  error.response !== undefined &&
  'details' in (error.response.data || {});

/**
 * Получает текст ошибки из ответа API
 */
export const getErrorMessage = (error: unknown): string => {
  if (isValidationError(error)) {
    return error.response?.data.details
      .map((detail) => detail.messages.join('. '))
      .join('\n') || 'Ошибка валидации';
  }

  if (isApiError(error)) {
    return error.response?.data.message || 'Неизвестная ошибка';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Неизвестная ошибка';
};
