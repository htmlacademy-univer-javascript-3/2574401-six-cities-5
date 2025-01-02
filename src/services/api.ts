import axios, { AxiosResponse, AxiosError } from 'axios';

/** Базовый URL API */
const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';

/** Таймаут запроса в миллисекундах */
const REQUEST_TIMEOUT = 5000;

/**
 * Создание экземпляра axios с базовой конфигурацией
 */
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Обработчик ошибок запросов
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);
