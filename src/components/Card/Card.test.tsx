import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import type { CardProps } from './Card';

const mockData: CardProps = {
  id: 1,
  image: 'someURL',
  name: 'John',
  status: 'alive',
  species: 'human',
  gender: 'male',
  origin: { name: 'Earth', url: 'someURL' },
  location: { name: 'Earth', url: 'someURL' },
  openCardDetails: vi.fn(),
};

describe('Card', () => {
  test('renders card successfully with all props', () => {
    render(<Card {...mockData} />);
    const list = screen.getByRole('list');
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockData.image);
    expect(image).toHaveAttribute('alt', mockData.name);
    expect(
      screen.getByRole('heading', { name: mockData.name })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
    expect(list).toHaveTextContent(
      new RegExp(`Status: ${mockData.status}`, 'i')
    );
    expect(list).toHaveTextContent(
      new RegExp(`Species: ${mockData.species}`, 'i')
    );
    expect(list).toHaveTextContent(
      new RegExp(`Gender: ${mockData.gender}`, 'i')
    );
    expect(list).toHaveTextContent(
      new RegExp(`Origin: ${mockData.origin.name}`, 'i')
    );
    expect(list).toHaveTextContent(
      new RegExp(`Location: ${mockData.location.name}`, 'i')
    );
  });
});
