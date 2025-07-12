import apiClient from './apiClient';
import type {
  Pokemon,
  PokemonApiResponse,
  PokemonListResponse,
  PokemonSpecies,
  PokemonSprites,
} from './types';

const cleanText = (text: string): string => {
  return text
    .replace(/\f/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const getPokemonImage = (sprites: PokemonSprites): string | undefined => {
  return (
    sprites.other?.['official-artwork']?.front_default || sprites.front_default
  );
};

export const fetchPokemonListWithDetails = async (): Promise<Pokemon[]> => {
  const listResponse =
    await apiClient.get<PokemonListResponse>('/pokemon?limit=12');

  return Promise.all(
    listResponse.results.map(async (pokemon) => {
      try {
        const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
        const [details, species] = await Promise.all([
          apiClient.get<PokemonApiResponse>(
            pokemon.url.replace('https://pokeapi.co/api/v2', '')
          ),
          apiClient.get<PokemonSpecies>(`/pokemon-species/${pokemonId}/`),
        ]);

        const englishEntry = species.flavor_text_entries.find(
          (entry) => entry.language.name === 'en'
        );

        return {
          name: details.name,
          url: pokemon.url,
          image: getPokemonImage(details.sprites),
          description: englishEntry?.flavor_text
            ? cleanText(englishEntry.flavor_text)
            : 'No description available',
        };
      } catch (error) {
        console.error(`Failed to load details for ${pokemon.name}:`, error);
        return {
          ...pokemon,
          description: 'Failed to load description',
        };
      }
    })
  );
};

export const searchPokemon = async (term: string): Promise<Pokemon[]> => {
  try {
    const pokemonId = term.toLowerCase();
    const [details, species] = await Promise.all([
      apiClient.get<PokemonApiResponse>(`/pokemon/${pokemonId}`),
      apiClient.get<PokemonSpecies>(`/pokemon-species/${pokemonId}/`),
    ]);

    const englishEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === 'en'
    );

    return [
      {
        name: details.name,
        url: `/pokemon/${pokemonId}`,
        image: getPokemonImage(details.sprites),
        description: englishEntry?.flavor_text
          ? cleanText(englishEntry.flavor_text)
          : 'No description available',
      },
    ];
  } catch (error) {
    if ((error as { status?: number }).status === 404) {
      throw { message: `Pokemon "${term}" not found` };
    }
    throw { message: 'Failed to search Pokemon' };
  }
};
