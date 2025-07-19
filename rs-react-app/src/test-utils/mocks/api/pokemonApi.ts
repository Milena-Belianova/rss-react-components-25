import { vi } from 'vitest';
import type { Pokemon } from '../../../api/types';
import { mockPokemons } from '../pokemonData';

export const mockFetchPokemonListWithDetails = vi.fn(
  (): Promise<Pokemon[]> => Promise.resolve(mockPokemons)
);

export const mockSearchPokemon = vi.fn(
  (term: string): Promise<Pokemon[]> =>
    Promise.resolve(mockPokemons.filter((p) => p.name === term.trim()))
);

export const mockApiError = (message = 'API Error') => {
  mockFetchPokemonListWithDetails.mockRejectedValueOnce(new Error(message));
  mockSearchPokemon.mockRejectedValueOnce(new Error(message));
};

export const mockApiDelayedResponse = (delay = 1000) => {
  mockFetchPokemonListWithDetails.mockImplementationOnce(
    () =>
      new Promise((resolve) => setTimeout(() => resolve(mockPokemons), delay))
  );
};
