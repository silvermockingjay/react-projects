import { render, screen } from '@testing-library/react';
import { getCharacters } from '../services/APIRequests/getCharacters';
import type { MockedFunction } from 'vitest';
import type { SearchResults } from '../services/interfaces/interfaces';
import { SearchPage } from './SearchPage';
import { userSetUp } from '../test-utils/test-utils';

const searchResultsEmptyQuery: SearchResults = {
  info: { count: 2, pages: 1, next: 'urlOfTheNextPage', prev: null },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', location: 'someLocation' },
      location: { name: 'Earth', location: 'someLocation' },
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
      origin: { name: 'Earth', location: 'someLocation' },
      location: { name: 'Earth', location: 'someLocation' },
      image: 'someImageURL2',
      episode: ['someEpisode1', 'someEpisode2'],
      url: 'someURL',
      created: '2017-11-04T18:50:21.651Z',
    },
  ],
};

const searchResultsQuery: SearchResults = {
  info: { count: 2, pages: 1, next: 'urlOfTheNextPage', prev: null },
  results: [
    {
      id: 1,
      name: 'Alien Morty',
      status: 'unknown',
      species: 'Alien',
      type: '',
      gender: 'Male',
      origin: { name: 'unknown', location: 'someLocation' },
      location: { name: 'Citadel of Ricks', location: 'someLocation' },
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
      origin: { name: 'Earth', location: 'someLocation' },
      location: { name: 'Earth', location: 'someLocation' },
      image: 'someImageURL2',
      episode: ['someEpisode1', 'someEpisode2'],
      url: 'someURL',
      created: '2017-11-04T18:50:21.651Z',
    },
  ],
};

vi.mock('../services/APIRequests/getCharacters', () => ({
  getCharacters: vi.fn(),
}));

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('search page initially renders with the empty query because local storage is empty', async () => {
    const localStorageSpy = vi
      .spyOn(window.localStorage, 'getItem')
      .mockReturnValue('');
    (getCharacters as MockedFunction<typeof getCharacters>).mockResolvedValue(
      searchResultsEmptyQuery
    );
    render(<SearchPage />);
    expect(getCharacters).toHaveBeenCalledWith('');
    expect(await screen.findAllByRole('list')).toHaveLength(2);
    localStorageSpy.mockRestore();
  });

  test('search page shows results when user searches for the character', async () => {
    const { user } = userSetUp(<SearchPage />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Morty');
    const localStorageSpy = vi
      .spyOn(window.localStorage, 'getItem')
      .mockReturnValue('Morty');
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    (getCharacters as MockedFunction<typeof getCharacters>).mockResolvedValue(
      searchResultsQuery
    );
    expect(await screen.findAllByRole('list')).toHaveLength(2);
    localStorageSpy.mockRestore();
  });
});
