import axios from 'axios';

import { env } from '@/config/env';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const message =
      error.response?.data && typeof error.response.data === 'object'
        ? String(
            (error.response.data as { message?: string }).message ??
              error.message,
          )
        : error.message;

    return Promise.reject(new Error(message));
  },
);
