export interface Pokemon {
  name: string;
  url: string;
  description?: string;
  image?: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonSprites {
  front_default?: string;
  other?: {
    'official-artwork'?: {
      front_default?: string;
    };
  };
}

export interface PokemonApiResponse {
  name: string;
  sprites: PokemonSprites;
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}
