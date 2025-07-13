import { Component } from 'react';
import type { Pokemon } from '../api/types';
import PokemonCardList from './PokemonCardList';

interface ContentSectionProps {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

class ContentSection extends Component<ContentSectionProps> {
  throwTestError = () => {
    this.setState({}, () => {
      throw new Error('This is a test error for ErrorBoundary');
    });
  };

  render() {
    const { pokemons, isLoading, error } = this.props;

    return (
      <div className="p-8 bg-white rounded-xl shadow-md min-h-[400px] w-full relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold mb-6">Pokemon Details</h2>
            <button
              onClick={this.throwTestError}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Test Error Boundary
            </button>
          </div>

          {error ? (
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <p className="text-red-600 text-lg">{error}</p>
              <p className="text-red-500 mt-2">
                Please try a different search term
              </p>
            </div>
          ) : pokemons.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-500 text-lg">No Pokemon found</p>
            </div>
          ) : (
            <PokemonCardList pokemons={pokemons} isLoading={isLoading} />
          )}
        </div>
      </div>
    );
  }
}

export default ContentSection;
