import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PokemonCardList from './PokemonCardList';
import { mockPokemons } from '../test-utils/mocks/data/pokemon';

describe('PokemonCardList', () => {
  const defaultProps = {
    pokemons: mockPokemons,
    isLoading: false,
  };

  afterEach(() => {
    cleanup();
  });

  it('should render correct number of items when data is provided', () => {
    render(<PokemonCardList {...defaultProps} />);
    expect(screen.getAllByTestId('pokemon-card')).toHaveLength(
      defaultProps.pokemons.length
    );
  });

  it('should show loading state while fetching data', () => {
    render(<PokemonCardList {...defaultProps} isLoading={true} />);
    const cards = screen.getAllByTestId('pokemon-card');
    cards.forEach((card) => {
      expect(card).toHaveClass('opacity-50');
    });
  });

  it('should correctly display pokemon names and descriptions', () => {
    render(<PokemonCardList {...defaultProps} />);

    defaultProps.pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();

      if (pokemon.description) {
        expect(screen.getByText(pokemon.description)).toBeInTheDocument();
      }
    });
  });

  it('should correctly display pokemon images', () => {
    render(<PokemonCardList {...defaultProps} />);

    defaultProps.pokemons.forEach((pokemon) => {
      const image = screen.getByAltText(pokemon.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', pokemon.image);
    });
  });
});
