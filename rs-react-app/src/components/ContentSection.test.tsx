import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockPokemons } from '../test-utils/mocks/pokemon';
import ContentSection from './ContentSection';
import userEvent from '@testing-library/user-event';

describe('ContentSection', () => {
  const defaultProps = {
    pokemons: mockPokemons,
    isLoading: false,
    error: null,
  };

  afterEach(() => {
    cleanup();
  });

  it('should render correctly with pokemons', () => {
    render(<ContentSection {...defaultProps} />);
    expect(screen.getByText('Pokemon Details')).toBeInTheDocument();
    expect(screen.getByText('Test Error Boundary')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
  });

  it('should show loading spinner when isLoading is true', () => {
    render(<ContentSection {...defaultProps} isLoading={true} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toHaveClass('animate-spin');
  });

  it('should show empty state when no pokemons', () => {
    render(<ContentSection {...defaultProps} pokemons={[]} />);
    expect(screen.getByText('No Pokemon found')).toBeInTheDocument();
    expect(screen.queryByText('squirtle')).not.toBeInTheDocument();
  });

  it('should display error message when error exists', () => {
    const errorMessage = 'Failed to fetch data';
    render(<ContentSection {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(
      screen.getByText('Please try a different search term')
    ).toBeInTheDocument();
  });

  it('should throw error when test error button is clicked', async () => {
    const user = userEvent.setup();

    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<ContentSection {...defaultProps} />);

    const errorButton = screen.getByRole('button', {
      name: 'Test Error Boundary',
    });

    await expect(async () => {
      await user.click(errorButton);
    }).rejects.toThrow('This is a test error for ErrorBoundary');

    consoleErrorMock.mockRestore();
  });

  it('should render PokemonCardList when pokemons exist', () => {
    render(<ContentSection {...defaultProps} />);
    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument();
  });
});
