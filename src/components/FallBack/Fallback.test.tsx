import { render, screen } from '@testing-library/react';
import { Fallback } from './Fallback';

describe('Fallback', () => {
  test('renders successfully with the prop', () => {
    render(<Fallback text="Mock text for fallback" />);
    expect(screen.getByText('Mock text for fallback')).toBeInTheDocument();
  });
});
