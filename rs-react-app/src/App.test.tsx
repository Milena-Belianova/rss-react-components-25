import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import {
  mockApiDelayedResponse,
  mockApiError,
  mockFetchPokemonListWithDetails,
  mockSearchPokemon,
} from './test-utils/mocks/api/pokemonApi';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { setupTests } from './test-utils/setupTests';
import userEvent from '@testing-library/user-event';
import { mockPokemons } from './test-utils/mocks/pokemonData';
import { localStorageMock } from './test-utils/mocks/localStorage';

setupTests();

vi.mock('./api/pokemonApi', () => ({
  fetchPokemonListWithDetails: mockFetchPokemonListWithDetails,
  searchPokemon: mockSearchPokemon,
}));

describe('App Component', () => {
  describe('Initialization Tests', () => {
    it('should make initial API call on mount without search term', async () => {
      render(<App />);

      await waitFor(() => {
        expect(mockFetchPokemonListWithDetails).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(screen.getByText('charmander')).toBeInTheDocument();
      });
    });

    it('should handle search term from localStorage on initial load', async () => {
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'pokemonSearchTerm') return 'pika';
        return null;
      });
      mockSearchPokemon.mockResolvedValue([mockPokemons[0]]);

      render(<App />);

      await waitFor(() => {
        expect(mockSearchPokemon).toHaveBeenCalledWith('pika');
      });
    });

    it('should show loading state during initial API call', async () => {
      mockApiDelayedResponse(500);
      render(<App />);

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    it('should perform search and update results', async () => {
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'pokemonSearchTerm') return null;
        return null;
      });

      const user = userEvent.setup();
      render(<App />);

      const input = screen.getByPlaceholderText('Enter Pokemon name...');
      const button = screen.getByRole('button', { name: /search/i });

      await waitFor(() => {
        expect(input).toBeEnabled();
      });
      await user.type(input, 'char');
      expect(input).toHaveValue('char');
      await user.click(button);

      await waitFor(() => {
        expect(mockFetchPokemonListWithDetails).toHaveBeenCalledTimes(1);
        expect(mockSearchPokemon).toHaveBeenCalledTimes(1);
        expect(mockSearchPokemon).toHaveBeenCalledWith('char');
        expect(screen.getByText('charmander')).toBeInTheDocument();

        expect(localStorage.setItem).toHaveBeenCalledWith(
          'pokemonSearchTerm',
          'char'
        );
      });
    });

    it('should clear search term when empty search is submitted', async () => {
      const user = userEvent.setup();
      render(<App />);

      const input = screen.getByPlaceholderText('Enter Pokemon name...');

      await waitFor(() => {
        expect(input).toBeEnabled();
      });
      await user.type(input, '  ');
      await user.click(screen.getByRole('button', { name: /search/i }));

      await waitFor(() => {
        expect(localStorageMock.removeItem).toHaveBeenCalledWith(
          'pokemonSearchTerm'
        );
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API error response', async () => {
      mockApiError('Network Error');
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Network Error')).toBeInTheDocument();
      });
    });
  });
});
