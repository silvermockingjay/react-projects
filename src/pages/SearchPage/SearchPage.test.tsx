import { screen } from '@testing-library/react';
import { customRender } from '../../test-utils/test-utils';
import { useGetCharactersQuery } from '../../services/RickAndMortyAPI/rickAndMorty';
import type { SearchResults } from '../../services/interfaces/interfaces';
import { SearchPage } from './SearchPage';
import { userSetUp } from '../../test-utils/test-utils';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';

vi.mock(
  import('../../services/RickAndMortyAPI/rickAndMorty'),
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useGetCharactersQuery: vi.fn(),
    };
  }
);

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
      origin: { name: 'Earth', url: 'LinkToSomeLocation' },
      location: { name: 'Earth', url: 'LinkToSomeLocation' },
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
      origin: { name: 'Earth', url: 'LinkToSomeLocation' },
      location: { name: 'Earth', url: 'LinkToSomeLocation' },
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
      origin: { name: 'unknown', url: 'LinkToSomeLocation' },
      location: { name: 'Citadel of Ricks', url: 'LinkToSomeLocation' },
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
      origin: { name: 'Earth', url: 'LinkToSomeLocation' },
      location: { name: 'Earth', url: 'LinkToSomeLocation' },
      image: 'someImageURL2',
      episode: ['someEpisode1', 'someEpisode2'],
      url: 'someURL',
      created: '2017-11-04T18:50:21.651Z',
    },
  ],
};

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('search page initially renders with the empty query because local storage is empty', async () => {
    const mockedGetCharacters = vi.mocked(useGetCharactersQuery);
    mockedGetCharacters.mockReturnValue({
      data: searchResultsEmptyQuery,
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
      status: 'fulfilled',
    });

    const router = createMemoryRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<SearchPage />} />
        </>
      ),
      { initialEntries: ['/'] }
    );

    const getItemSpy = vi
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockReturnValue('');

    customRender(<RouterProvider router={router} />);
    expect(getItemSpy).toHaveBeenCalledWith('query');
    expect(mockedGetCharacters).toHaveBeenCalledWith({ name: '', page: 1 });
    expect(
      await screen.findAllByRole('region', { name: /character card/i })
    ).toHaveLength(2);
    getItemSpy.mockRestore();
  });

  test('search page shows results when user searches for the character', async () => {
    const mockedGetCharacters = vi.mocked(useGetCharactersQuery);
    mockedGetCharacters.mockReturnValue({
      data: searchResultsQuery,
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
      status: 'fulfilled',
    });

    const router = createMemoryRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<SearchPage />} />
        </>
      ),
      { initialEntries: ['/'] }
    );

    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem');
    const { user } = userSetUp(<RouterProvider router={router} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Morty');
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    expect(setItemSpy).toHaveBeenCalledWith('query', 'Morty');
    expect(mockedGetCharacters).toHaveBeenCalledWith({
      name: 'Morty',
      page: 1,
    });
    expect(await screen.findAllByText(/Morty Smith|Alien Morty/)).toHaveLength(
      2
    );
    setItemSpy.mockRestore();
  });
});
