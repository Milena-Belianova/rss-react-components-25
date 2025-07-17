import type { Pokemon } from '../../../api/types';

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
