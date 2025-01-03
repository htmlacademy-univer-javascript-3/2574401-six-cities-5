import { describe, it, expect } from 'vitest';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { isApiError, isValidationError, getErrorMessage } from './api-error';
import { ApiError, ValidationError } from '@/types/api';

describe('@/services/api-error', () => {
  it('должен определять ошибку API', () => {
    const apiError: AxiosError<ApiError> = {
      response: {
        data: {
          errorType: 'COMMON_ERROR',
          message: 'Тестовая ошибка'
        },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: {} as unknown as InternalAxiosRequestConfig
      },
      isAxiosError: true,
      name: 'AxiosError',
      message: 'Request failed',
      config: {} as unknown as InternalAxiosRequestConfig,
      toJSON: () => ({})
    };

    expect(isApiError(apiError)).toBe(true);
    expect(isApiError(new Error('test'))).toBe(false);
  });

  it('должен определять ошибку валидации', () => {
    const validationError: AxiosError<ValidationError> = {
      response: {
        data: {
          errorType: 'VALIDATION_ERROR',
          details: [{ field: 'email', messages: ['Неверный формат'] }],
          message: ''
        },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: {} as unknown as InternalAxiosRequestConfig,
      },
      isAxiosError: true,
      name: 'AxiosError',
      message: 'Request failed',
      config: {} as unknown as InternalAxiosRequestConfig,
      toJSON: () => ({})
    };

    expect(isValidationError(validationError)).toBe(true);
    expect(isValidationError(new Error('test'))).toBe(false);
  });

  it('должен возвращать сообщение об ошибке валидации', () => {
    const validationError: AxiosError<ValidationError> = {
      response: {
        data: {
          errorType: 'VALIDATION_ERROR',
          details: [
            { field: 'email', messages: ['Неверный формат'] },
            { field: 'password', messages: ['Слишком короткий', 'Нужны цифры'] }
          ],
          message: ''
        },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: {} as unknown as InternalAxiosRequestConfig
      },
      isAxiosError: true,
      name: 'AxiosError',
      message: 'Request failed',
      config: {} as unknown as InternalAxiosRequestConfig,
      toJSON: () => ({})
    };

    expect(getErrorMessage(validationError)).toBe('Неверный формат\nСлишком короткий. Нужны цифры');
  });

  it('должен возвращать сообщение об ошибке API', () => {
    const apiError: AxiosError<ApiError> = {
      response: {
        data: {
          errorType: 'COMMON_ERROR',
          message: 'Тестовая ошибка'
        },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: {} as unknown as InternalAxiosRequestConfig
      },
      isAxiosError: true,
      name: 'AxiosError',
      message: 'Request failed',
      config: {} as unknown as InternalAxiosRequestConfig,
      toJSON: () => ({})
    };

    expect(getErrorMessage(apiError)).toBe('Тестовая ошибка');
  });

  it('должен возвращать сообщение для обычной ошибки', () => {
    const error = new Error('Тестовая ошибка');
    expect(getErrorMessage(error)).toBe('Тестовая ошибка');
  });

  it('должен возвращать "Неизвестная ошибка" для неизвестного типа', () => {
    expect(getErrorMessage(null)).toBe('Неизвестная ошибка');
    expect(getErrorMessage(undefined)).toBe('Неизвестная ошибка');
    expect(getErrorMessage({})).toBe('Неизвестная ошибка');
  });
});
