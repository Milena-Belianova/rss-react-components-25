import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, vi, it, expect, afterEach } from 'vitest';
import { mockPokemons } from '../test-utils/mocks/pokemonData';
import ContentSection from './ContentSection';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary with ContentSection', () => {
  const defaultProps = {
    pokemons: mockPokemons,
    isLoading: false,
    error: null,
  };

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('should catch error thrown by ContentSection', async () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ContentSection {...defaultProps} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Pokemon Details')).toBeInTheDocument();

    const errorButton = screen.getByRole('button', {
      name: 'Test Error Boundary',
    });
    await user.click(errorButton);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test error for ErrorBoundary')
    ).toBeInTheDocument();

    expect(consoleErrorMock).toHaveBeenCalled();
    consoleErrorMock.mockRestore();
  });

  it('should reset error state when Try Again is clicked', async () => {
    const user = userEvent.setup();
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { rerender } = render(
      <ErrorBoundary>
        <ContentSection {...defaultProps} />
      </ErrorBoundary>
    );

    await user.click(
      screen.getByRole('button', { name: 'Test Error Boundary' })
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Try Again' }));

    rerender(
      <ErrorBoundary>
        <ContentSection {...defaultProps} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Pokemon Details')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });

  it('should not show error UI when no error occurs', () => {
    render(
      <ErrorBoundary>
        <ContentSection {...defaultProps} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Pokemon Details')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('should log error details to console', async () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ContentSection {...defaultProps} />
      </ErrorBoundary>
    );

    await user.click(
      screen.getByRole('button', { name: 'Test Error Boundary' })
    );

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error caught:',
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.stringContaining('at ContentSection'),
      })
    );

    consoleErrorMock.mockRestore();
  });
});
