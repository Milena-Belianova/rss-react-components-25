import { Component } from 'react';
import type { Pokemon } from '../api/types';
import PokemonCard from './PokemonCard';

interface PokemonCardListProps {
  pokemons: Pokemon[];
  isLoading?: boolean;
}

class PokemonCardList extends Component<PokemonCardListProps> {
  render() {
    const { pokemons, isLoading = false } = this.props;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            isLoading={isLoading}
          />
        ))}
      </div>
    );
  }
}

export default PokemonCardList;
