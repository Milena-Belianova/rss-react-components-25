import { Component } from 'react';

interface ContentSectionProps {
  searchResult: string;
}

class ContentSection extends Component<ContentSectionProps> {
  render() {
    return (
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
        {this.props.searchResult ? (
          <p>
            You searched for:{' '}
            <span className="font-bold">{this.props.searchResult}</span>
          </p>
        ) : (
          <p className="text-gray-500">No search results</p>
        )}
      </div>
    );
  }
}

export default ContentSection;
