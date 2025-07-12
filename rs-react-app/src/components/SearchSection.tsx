import { Component, type KeyboardEvent } from 'react';

interface SearchSectionProps {
  onSearch: (term: string) => void;
  initialSearchTerm?: string;
  isLoading: boolean;
}

interface SearchSectionState {
  searchTerm: string;
}

class SearchSection extends Component<SearchSectionProps, SearchSectionState> {
  constructor(props: SearchSectionProps) {
    super(props);
    this.state = {
      searchTerm: props.initialSearchTerm || '',
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: e.target.value });
  };

  handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      this.triggerSearch();
    }
  };

  triggerSearch = (): void => {
    const processedTerm = this.state.searchTerm.trim();
    this.props.onSearch(processedTerm);
  };

  render() {
    return (
      <div className="bg-gray-100 p-6 rounded-xl shadow-md">
        <div className="flex gap-3">
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Enter Pokemon name..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            disabled={this.props.isLoading}
          />
          <button
            onClick={this.triggerSearch}
            disabled={this.props.isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {this.props.isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    );
  }
}

export default SearchSection;
