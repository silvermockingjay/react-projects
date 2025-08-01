import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import type { CardProps } from './Card';

const mockData: CardProps = {
  id: 1,
  image: 'someURL',
  name: 'John',
  openCardDetails: vi.fn(),
};

describe('Card', () => {
  test('renders card successfully with all props', () => {
    render(<Card {...mockData} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockData.image);
    expect(image).toHaveAttribute('alt', mockData.name);
    expect(
      screen.getByRole('heading', { name: mockData.name })
    ).toBeInTheDocument();
  });
});
