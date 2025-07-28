import { render, screen } from '@testing-library/react';
import type { CardListProps } from './CardList';
import { CardList } from './CardList';

const mockData: CardListProps = {
  cards: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: 'someLocation' },
      location: { name: 'Earth', url: 'someLocation' },
      image: 'someImageURL',
      episode: ['someEpisode1', 'someEpisode2'],
      url: 'someURL',
      created: '2017-11-04T18:48:46.250Z',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: 'someLocation' },
      location: { name: 'Earth', url: 'someLocation' },
      image: 'someImageURL2',
      episode: ['someEpisode1', 'someEpisode2'],
      url: 'someURL',
      created: '2017-11-04T18:50:21.651Z',
    },
  ],
  open: vi.fn(),
};

describe('CardList', () => {
  test('renders successfully CardList with all props', () => {
    render(<CardList {...mockData} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
