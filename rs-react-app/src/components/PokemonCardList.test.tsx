import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PokemonCardList from './PokemonCardList';
import { PokemonCardListMocks } from '../test-utils/mocks/pokemonCardList';

describe('PokemonCardList', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correct number of items when data is provided', () => {
    render(<PokemonCardList {...PokemonCardListMocks.default} />);
    expect(screen.getAllByTestId('pokemon-card')).toHaveLength(
      PokemonCardListMocks.default.pokemons.length
    );
  });

  it('should show loading state while fetching data', () => {
    render(<PokemonCardList {...PokemonCardListMocks.loading} />);
    const cards = screen.getAllByTestId('pokemon-card');
    cards.forEach((card) => {
      expect(card).toHaveClass('opacity-50');
    });
  });

  it('should correctly display pokemon names and descriptions', () => {
    render(<PokemonCardList {...PokemonCardListMocks.default} />);

    PokemonCardListMocks.default.pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();

      if (pokemon.description) {
        expect(screen.getByText(pokemon.description)).toBeInTheDocument();
      }
    });
  });

  it('should correctly display pokemon images', () => {
    render(<PokemonCardList {...PokemonCardListMocks.default} />);

    PokemonCardListMocks.default.pokemons.forEach((pokemon) => {
      const image = screen.getByAltText(pokemon.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', pokemon.image);
    });
  });
});
