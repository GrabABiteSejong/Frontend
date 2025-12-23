import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '@config/env';

const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    if (env.enableDebug) {
      console.log('[HTTP Request]', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    if (env.enableDebug) {
      console.error('[HTTP Request Error]', error);
    }
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (env.enableDebug) {
      console.log('[HTTP Response]', response.status, response.config.url);
    }
    return response;
  },
  (error: AxiosError) => {
    if (env.enableDebug) {
      console.error('[HTTP Response Error]', error.response?.status, error.config?.url);
    }

    if (error.response?.status === 401) {
      console.warn('Unauthorized access - consider implementing auth redirect');
    }

    return Promise.reject(error);
  }
);

export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    httpClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    httpClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    httpClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    httpClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    httpClient.delete<T>(url, config).then((res) => res.data),
};

export default httpClient;
