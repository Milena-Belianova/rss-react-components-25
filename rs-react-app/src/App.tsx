import { Component } from 'react';
import ContentSection from './components/ContentSection';
import SearchSection from './components/SearchSection';

interface AppState {
  searchResult: string;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchResult: '',
    };
  }

  handleSearch = (term: string) => {
    this.setState({ searchResult: term });
  };

  render() {
    return (
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
            <SearchSection onSearch={this.handleSearch} />
          </div>
        </div>

        <div className="flex-2 pb-12 w-full">
          <ContentSection searchResult={this.state.searchResult} />
        </div>
      </div>
    );
  }
}

export default App;
