import { screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { App } from '../../App';
import { userSetUp } from '../../test-utils/test-utils';

describe('ErrorBoundary', () => {
  test('logs an error to console', async () => {
    const getConsoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { user } = userSetUp(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    await user.click(screen.getByRole('button', { name: /error button/i }));
    expect(getConsoleErrorSpy).toBeCalled();
    getConsoleErrorSpy.mockRestore();
  });

  test('renders fallback UI when error button click triggers error', async () => {
    const { user } = userSetUp(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    await user.click(screen.getByRole('button', { name: /error button/i }));
    expect(
      await screen.findByText('Something went wrong. Please refresh the page.')
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /error button/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /search/i })
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
