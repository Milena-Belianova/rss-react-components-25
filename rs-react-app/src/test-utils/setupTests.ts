import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import {
  mockFetchPokemonListWithDetails,
  mockSearchPokemon,
} from './mocks/api/pokemonApi';
import { localStorageMock } from './mocks/localStorage';

export const setupTests = () => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });

  beforeEach(() => {
    localStorageMock.mockReset();
    vi.clearAllMocks();

    vi.doMock('../../../api/pokemonApi', () => ({
      mockFetchPokemonListWithDetails,
      mockSearchPokemon,
    }));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });
};
