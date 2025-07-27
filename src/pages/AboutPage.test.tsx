import { screen, render } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  test('about page renders successfully', () => {
    render(<AboutPage />);
    expect(screen.getByTestId('about-page-content')).toBeInTheDocument();
  });
});
