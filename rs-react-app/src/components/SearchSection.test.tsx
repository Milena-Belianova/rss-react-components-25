import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import SearchSection from './SearchSection';
import userEvent from '@testing-library/user-event';

describe('SearchSection', () => {
  const mockOnSearch = vi.fn();
  const defaultProps = {
    onSearch: mockOnSearch,
    isLoading: false,
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should render search input and search button', () => {
    render(<SearchSection {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should display initial search term from props', () => {
    render(<SearchSection {...defaultProps} initialSearchTerm="pikachu" />);
    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
  });

  it('should show empty input when no saved term exists', () => {
    render(<SearchSection {...defaultProps} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toHaveValue('');
  });

  it('should update input value when user types', async () => {
    const user = userEvent.setup();
    render(<SearchSection {...defaultProps} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'charmander');
    expect(input).toHaveValue('charmander');
  });

  it('should trim whitespace from search input before triggering search', async () => {
    const user = userEvent.setup();
    render(<SearchSection {...defaultProps} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, '   mew   ');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('mew');
  });

  it('should trigger search callback with correct parameters', async () => {
    const user = userEvent.setup();
    render(<SearchSection {...defaultProps} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'squirtle');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('squirtle');
  });

  it('should disable input and button when isLoading is true', () => {
    render(<SearchSection {...defaultProps} isLoading={true} />);

    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent('Searching...');
  });

  it('should show normal button text when not loading', () => {
    render(<SearchSection {...defaultProps} isLoading={false} />);
    expect(screen.getByRole('button')).toHaveTextContent('Search');
  });

  it('should trigger search when Enter is pressed', async () => {
    const user = userEvent.setup();
    render(<SearchSection {...defaultProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'bulbasaur{enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('bulbasaur');
  });

  it('should not trigger search on other key presses', async () => {
    const user = userEvent.setup();
    render(<SearchSection {...defaultProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'squirtle{escape}');

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
