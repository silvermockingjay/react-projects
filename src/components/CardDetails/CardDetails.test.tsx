vi.mock('../../services/APIRequests/getCharacter', () => ({
  getCharacter: vi.fn(),
}));

import { render, screen } from '@testing-library/react';
import { CardDetails } from './CardDetails';
import { MemoryRouter } from 'react-router';
import { getCharacter } from '../../services/APIRequests/getCharacter';
import type { MockedFunction } from 'vitest';
import type { Character } from '../../services/interfaces/interfaces';

const mockData: Character = {
  id: 1,
  image: 'someURL',
  name: 'John',
  status: 'alive',
  species: 'human',
  type: 'type',
  gender: 'male',
  origin: { name: 'Earth', url: 'someURL' },
  location: { name: 'Earth', url: 'someURL' },
  episode: ['episode1', 'episode2'],
  url: 'urlOfRequest',
  created: 'dateOfCreation',
};

describe('CardDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders card successfully with all props', async () => {
    const mockedGetCharacter = vi.mocked(
      getCharacter as unknown as MockedFunction<typeof getCharacter>
    );
    mockedGetCharacter.mockResolvedValue(mockData);

    render(
      <MemoryRouter initialEntries={['/details?detailsId=1']}>
        <CardDetails />
      </MemoryRouter>
    );

    const list = await screen.findByRole('list');
    const image = await screen.findByRole('img');
    expect(image).toHaveAttribute('src', mockData.image);
    expect(image).toHaveAttribute('alt', mockData.name);
    expect(
      await screen.findByRole('heading', { name: mockData.name })
    ).toBeInTheDocument();
    expect(await screen.findAllByRole('listitem')).toHaveLength(5);
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
