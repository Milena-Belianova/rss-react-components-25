import type { ApiError } from './types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

async function fetchApi<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`);

  if (!response.ok) {
    const error: ApiError = {
      message: `HTTP error! status: ${response.status}`,
      status: response.status,
    };
    throw error;
  }

  return response.json();
}

export default {
  get: <T>(url: string) => fetchApi<T>(url),
};
