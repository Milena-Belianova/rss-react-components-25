import { Component } from 'react';
import SearchSection from './components/SearchSection';
import ContentSection from './components/ContentSection';
import { fetchPokemonListWithDetails, searchPokemon } from './api/pokemonApi';
import type { Pokemon } from './api/types';
import ErrorBoundary from './components/ErrorBoundary';

interface AppState {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    const savedTerm = localStorage.getItem('pokemonSearchTerm') || '';
    this.state = {
      pokemons: [],
      isLoading: false,
      error: null,
      searchTerm: savedTerm,
    };
  }

  componentDidMount() {
    if (this.state.searchTerm) {
      this.fetchPokemons(this.state.searchTerm);
    } else {
      this.fetchPokemons();
    }
  }

  fetchPokemons = async (searchTerm: string = '') => {
    this.setState({ isLoading: true, error: null });

    try {
      const pokemons = searchTerm
        ? await searchPokemon(searchTerm)
        : await fetchPokemonListWithDetails();

      this.setState({
        pokemons,
        searchTerm: searchTerm || '',
      });
    } catch (error) {
      this.setState({
        error:
          (error as { message: string }).message || 'Failed to fetch Pokemon',
        pokemons: [],
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = (term: string) => {
    const processedTerm = term.trim();
    if (processedTerm) {
      localStorage.setItem('pokemonSearchTerm', processedTerm);
      this.fetchPokemons(processedTerm);
    } else {
      localStorage.removeItem('pokemonSearchTerm');
      this.fetchPokemons();
    }
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="mx-auto px-4 max-w-7xl min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col justify-center py-8">
            <div className="flex flex-col max-w-3xl w-full mx-auto gap-10">
              <h1
                className="text-5xl font-bold mb-6 text-center 
               text-yellow text-stroke-blue
               tracking-wide"
              >
                Find your Pokemon
              </h1>
              <SearchSection
                onSearch={this.handleSearch}
                initialSearchTerm={this.state.searchTerm}
                isLoading={this.state.isLoading}
              />
            </div>
          </div>

          <div className="flex-2 pb-12 w-full">
            <ContentSection
              pokemons={this.state.pokemons}
              isLoading={this.state.isLoading}
              error={this.state.error}
            />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
