import { Component } from 'react';
import type { Pokemon } from '../api/types';

interface PokemonCardProps {
  pokemon: Pokemon;
  isLoading?: boolean;
}

class PokemonCard extends Component<PokemonCardProps> {
  render() {
    const { pokemon, isLoading = false } = this.props;

    return (
      <div
        className={`bg-gray-100 p-6 rounded-lg hover:shadow-md transition-shadow flex flex-col ${
          isLoading ? 'opacity-50' : ''
        }`}
      >
        {pokemon.image && (
          <div className="flex justify-center mb-4 flex-shrink-0">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="h-32 w-32 object-contain"
            />
          </div>
        )}
        <h3 className="text-xl font-bold capitalize mb-2 text-center text-blue-600">
          {pokemon.name}
        </h3>
        {pokemon.description && (
          <p className="text-gray-700 text-sm">{pokemon.description}</p>
        )}
      </div>
    );
  }
}

export default PokemonCard;
