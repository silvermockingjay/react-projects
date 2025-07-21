import { render, screen } from '@testing-library/react';
import { FallBack } from './FallBack';

describe('FallBack', () => {
  test('renders successfully with the prop', () => {
    render(<FallBack text="Mock text for fallback" />);
    expect(screen.getByText('Mock text for fallback')).toBeInTheDocument();
  });
});
