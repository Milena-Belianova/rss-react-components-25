import { Component } from 'react';

interface SearchSectionProps {
  onSearch: (term: string) => void;
}

interface SearchSectionState {
  searchTerm: string;
}

class SearchSection extends Component<SearchSectionProps, SearchSectionState> {
  constructor(props: SearchSectionProps) {
    super(props);
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedTerm,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    localStorage.setItem('searchTerm', searchTerm);
    this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <div className="bg-gray-100 p-6 rounded-xl shadow-md">
        <div className="flex gap-3">
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            placeholder="Enter search term..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <button
            onClick={this.handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchSection;
