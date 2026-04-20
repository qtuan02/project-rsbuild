import { z } from 'zod';

const FALLBACK_API_BASE_URL = 'http://localhost:3000';

const trimEndSlash = (value: string) => value.replace(/\/+$/, '');

const publicEnvSchema = z.object({
  PUBLIC_API_BASE_URL: z.string().optional(),
});

const parsed = publicEnvSchema.safeParse({
  PUBLIC_API_BASE_URL: import.meta.env.PUBLIC_API_BASE_URL,
});

const rawUrl =
  parsed.success && parsed.data.PUBLIC_API_BASE_URL
    ? trimEndSlash(parsed.data.PUBLIC_API_BASE_URL.trim())
    : '';

const urlResult = z
  .string()
  .url()
  .safeParse(rawUrl || FALLBACK_API_BASE_URL);

export const env = {
  apiBaseUrl: urlResult.success ? urlResult.data : FALLBACK_API_BASE_URL,
} as const;
