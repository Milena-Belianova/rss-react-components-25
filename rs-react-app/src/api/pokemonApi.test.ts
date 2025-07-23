import { mockApiClient } from '../test-utils/mocks/api/apiClient';
import { fetchPokemonListWithDetails, searchPokemon } from './pokemonApi';
import {
  mockPokemonListResponse,
  mockPokemonDetails,
  mockPokemonSpecies,
} from '../test-utils/mocks/pokemonData';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { setupTests } from '../test-utils/setupTests';

setupTests();

vi.mock('./apiClient', () => ({
  default: mockApiClient,
}));

describe('pokemonApi', () => {
  beforeEach(() => {
    mockApiClient.get.mockReset();
  });

  describe('fetchPokemonListWithDetails', () => {
    it('should fetch and transform pokemon list with details', async () => {
      mockApiClient.get
        .mockResolvedValueOnce(mockPokemonListResponse)
        .mockResolvedValueOnce(mockPokemonDetails)
        .mockResolvedValueOnce(mockPokemonSpecies)
        .mockResolvedValueOnce(mockPokemonDetails)
        .mockResolvedValueOnce(mockPokemonSpecies);

      const result = await fetchPokemonListWithDetails();

      expect(mockApiClient.get).toHaveBeenCalledTimes(5);
      expect(result).toEqual([
        {
          name: 'charmander',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
          image: 'charmander-artwork.png',
          description:
            'A flame burns on the tip of its tail. It is said to be born in volcanoes.',
        },
        {
          name: 'charmander',
          url: 'https://pokeapi.co/api/v2/pokemon/4/',
          image: 'charmander-artwork.png',
          description:
            'A flame burns on the tip of its tail. It is said to be born in volcanoes.',
        },
      ]);
    });

    it('should handle errors for individual pokemon', async () => {
      const originalConsoleError = console.error;
      console.error = vi.fn();

      try {
        mockApiClient.get
          .mockResolvedValueOnce(mockPokemonListResponse)
          .mockResolvedValueOnce(mockPokemonDetails)
          .mockRejectedValueOnce(new Error('Network error'))
          .mockResolvedValueOnce(mockPokemonDetails)
          .mockResolvedValueOnce(mockPokemonSpecies);

        const result = await fetchPokemonListWithDetails();

        expect(console.error).toHaveBeenCalledWith(
          'Failed to load details for bulbasaur:',
          expect.any(Error)
        );

        expect(result).toEqual([
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
            description: 'Failed to load description',
          },
          {
            name: 'charmander',
            url: 'https://pokeapi.co/api/v2/pokemon/4/',
            image: 'charmander-artwork.png',
            description:
              'A flame burns on the tip of its tail. It is said to be born in volcanoes.',
          },
        ]);
      } finally {
        console.error = originalConsoleError;
      }
    });
  });

  describe('searchPokemon', () => {
    it('should search and return pokemon details', async () => {
      mockApiClient.get
        .mockResolvedValueOnce(mockPokemonDetails)
        .mockResolvedValueOnce(mockPokemonSpecies);

      const result = await searchPokemon('charmander');

      expect(mockApiClient.get).toHaveBeenCalledWith('/pokemon/charmander');
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/pokemon-species/charmander/'
      );
      expect(result).toEqual([
        {
          name: 'charmander',
          url: '/pokemon/charmander',
          image: 'charmander-artwork.png',
          description:
            'A flame burns on the tip of its tail. It is said to be born in volcanoes.',
        },
      ]);
    });

    it('should handle 404 error for non-existent pokemon', async () => {
      mockApiClient.get.mockRejectedValueOnce({ status: 404 });

      await expect(searchPokemon('unknown')).rejects.toEqual({
        message: 'Pokemon "unknown" not found',
      });
    });

    it('should handle other API errors', async () => {
      mockApiClient.get.mockRejectedValueOnce(new Error('Server error'));

      await expect(searchPokemon('charmander')).rejects.toEqual({
        message: 'Failed to search Pokemon',
      });
    });

    it('should handle missing english description', async () => {
      const speciesWithoutEnglish = {
        ...mockPokemonSpecies,
        flavor_text_entries: [
          {
            flavor_text: 'Japanese text',
            language: { name: 'jp' },
          },
        ],
      };

      mockApiClient.get
        .mockResolvedValueOnce(mockPokemonDetails)
        .mockResolvedValueOnce(speciesWithoutEnglish);

      const result = await searchPokemon('charmander');

      expect(result[0].description).toBe('No description available');
    });
  });
});
