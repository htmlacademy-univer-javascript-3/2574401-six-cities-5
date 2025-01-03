import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { createAPI } from './api';

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() }
      }
    })),
  }
}));

type InterceptorFn = (config: Config) => Config;

type MockInterceptor = {
  use: jest.Mock;
  mock: { calls: Array<[InterceptorFn, unknown]> };
};

type Config = {
  headers: Record<string, string | undefined>;
};

type ResponseInterceptor = {
  use: jest.Mock;
  mock: { calls: Array<[unknown, (error: unknown) => Promise<unknown>]> };
};

describe('@/services/api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('должен создавать экземпляр axios с правильной конфигурацией', () => {
    createAPI();

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://14.design.htmlacademy.pro/six-cities',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  it('должен добавлять токен в заголовки при его наличии', () => {
    const mockToken = 'test-token';
    localStorage.setItem('six-cities-token', mockToken);

    const api = createAPI();
    const requestInterceptor = api.interceptors.request.use as unknown as MockInterceptor;
    const [successInterceptor] = requestInterceptor.mock.calls[0];

    const config: Config = {
      headers: {}
    };

    (successInterceptor)(config);

    expect(config.headers['X-Token']).toBe(mockToken);
  });

  it('не должен добавлять токен в заголовки при его отсутствии', () => {
    const api = createAPI();
    const requestInterceptor = api.interceptors.request.use as unknown as MockInterceptor;
    const [successInterceptor] = requestInterceptor.mock.calls[0];

    const config: Config = {
      headers: {}
    };

    (successInterceptor)(config);

    expect(config.headers['X-Token']).toBeUndefined();
  });

  it('должен обрабатывать ошибки ответа', () => {
    const api = createAPI();
    const responseInterceptor = api.interceptors.response.use as unknown as ResponseInterceptor;
    const [, errorInterceptor] = responseInterceptor.mock.calls[0];

    const errorWithResponse = {
      response: {
        data: { message: 'Test error' }
      }
    };

    expect(() => errorInterceptor(errorWithResponse))
      .rejects
      .toEqual({ message: 'Test error' });

    const errorWithoutResponse = new Error('Network error');
    expect(() => errorInterceptor(errorWithoutResponse))
      .rejects
      .toEqual(errorWithoutResponse);
  });
});
