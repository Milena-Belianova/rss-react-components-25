import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';
import { mockPokemons } from '../test-utils/mocks/pokemonData';

describe('PokemonCard', () => {
  const mockPokemon = mockPokemons[0];

  afterEach(() => {
    cleanup();
  });

  it('should display charmander name', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('should display charmander description', () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    if (!mockPokemon.description) {
      throw new Error('Description is missing in test data');
    }

    expect(screen.getByText(mockPokemon.description)).toBeInTheDocument();
  });

  it('should handle missing description gracefully', () => {
    const noDescData = { ...mockPokemon, description: undefined };
    render(<PokemonCard pokemon={noDescData} />);
    expect(screen.getByText('charmander')).toBeInTheDocument();

    if (!mockPokemon.description) {
      throw new Error('Description is missing in test data');
    }

    expect(screen.queryByText(mockPokemon.description)).not.toBeInTheDocument();
  });

  it('should show charmander image correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const image = screen.getByAltText('charmander');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockPokemon.image);
    expect(image).toHaveClass('h-32 w-32 object-contain');
  });

  it('should handle missing image gracefully', () => {
    const noImageData = { ...mockPokemon, image: undefined };
    render(<PokemonCard pokemon={noImageData} />);
    expect(screen.queryByAltText('charmander')).not.toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('should apply loading styles when isLoading is true', () => {
    render(<PokemonCard pokemon={mockPokemon} isLoading={true} />);

    const card = screen.getByTestId('pokemon-card');
    expect(card).toHaveClass('opacity-50');
  });

  it('should not apply loading styles when isLoading is false', () => {
    render(<PokemonCard pokemon={mockPokemon} isLoading={false} />);

    const card = screen.getByTestId('pokemon-card');
    expect(card).not.toHaveClass('opacity-50');
  });
});
