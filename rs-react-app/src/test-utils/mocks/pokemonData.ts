import type { Pokemon } from '../../api/types';

export const mockPokemons: Pokemon[] = [
  {
    name: 'charmander',
    url: 'https://pokeapi.co/api/v2/pokemon/4/',
    description:
      'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  },
  {
    name: 'squirtle',
    url: 'https://pokeapi.co/api/v2/pokemon/7/',
    description:
      'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
  },
];

export const mockPokemonListResponse = {
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    },
  ],
};

export const mockPokemonDetails = {
  name: 'charmander',
  sprites: {
    front_default: 'charmander-front.png',
    other: {
      'official-artwork': {
        front_default: 'charmander-artwork.png',
      },
    },
  },
};

export const mockPokemonSpecies = {
  flavor_text_entries: [
    {
      flavor_text:
        'A flame burns on the tip of its tail.\fIt is said to be born in volcanoes.',
      language: { name: 'en' },
    },
  ],
};
