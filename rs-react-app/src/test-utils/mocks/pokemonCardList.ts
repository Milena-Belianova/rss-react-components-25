import { mockPokemons } from './pokemon';

export const PokemonCardListMocks = {
  default: {
    pokemons: mockPokemons,
    isLoading: false,
  },
  loading: {
    pokemons: mockPokemons,
    isLoading: true,
  },
};
