import { getCharacters } from './getCharacters';

const mockData = {
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

describe('getCharacters', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('fetches character cards', async () => {
    const controller = new AbortController();
    const mockedFetch = vi.mocked(globalThis.fetch as unknown as typeof fetch);
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);

    const results = await getCharacters('Morty', 1, controller.signal);
    expect(results).toEqual(mockData);
  });

  test('throws on Error', async () => {
    const controller = new AbortController();
    const mockedFetch = vi.mocked(globalThis.fetch as unknown as typeof fetch);
    mockedFetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => {
        return { error: 'Not Found' };
      },
    } as unknown as Response);

    await expect(getCharacters('Beth', 1, controller.signal)).rejects.toThrow(
      /No results found, try one more time/i
    );
  });
});
