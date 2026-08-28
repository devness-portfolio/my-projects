const fallbackApiUrl = 'http://localhost:8080/api/v1';

export const environment = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? fallbackApiUrl,
} as const;

