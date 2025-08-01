import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const BuggyComponent = () => {
    throw new Error('Rendering error');
  };

  test('logs an error to console', () => {
    const getConsoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(getConsoleErrorSpy).toBeCalled();
    getConsoleErrorSpy.mockRestore();
  });

  test('renders fallback UI when rendering error happens', async () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );
    expect(
      await screen.findByText('Something went wrong. Please refresh the page.')
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /search/i })
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
