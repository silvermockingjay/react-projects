vi.mock('../../services/APIRequests/getCharacter', () => ({
  getCharacter: vi.fn(),
}));

import { render, screen, waitFor } from '@testing-library/react';
import { CardDetails } from './CardDetails';
import {
  createMemoryRouter,
  createRoutesFromElements,
  MemoryRouter,
  Route,
  RouterProvider,
} from 'react-router';
import { getCharacter } from '../../services/APIRequests/getCharacter';
import type { MockedFunction } from 'vitest';
import type { Character } from '../../services/interfaces/interfaces';
import { SearchPage } from '../../pages/SearchPage/SearchPage';
import { userSetUp } from '../../test-utils/test-utils';

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
    mockedGetCharacter.mockResolvedValueOnce(mockData);

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
  test('shows fallback when getCharacter returns 404', async () => {
    const mockedGetCharacter = vi.mocked(
      getCharacter as unknown as MockedFunction<typeof getCharacter>
    );
    mockedGetCharacter.mockRejectedValueOnce(
      new Error('Failed to load resource: 404')
    );

    render(
      <MemoryRouter initialEntries={['/details?detailsId=1']}>
        <CardDetails />
      </MemoryRouter>
    );
    expect(await screen.findByTestId('fallback-text')).toBeInTheDocument();
  });

  test('close card details when clicked on x', async () => {
    const mockedGetCharacter = vi.mocked(
      getCharacter as unknown as MockedFunction<typeof getCharacter>
    );
    mockedGetCharacter.mockResolvedValueOnce(mockData);

    const router = createMemoryRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<SearchPage />}>
            <Route path="details" element={<CardDetails />} />
          </Route>
        </>
      )
    );
    const { user } = userSetUp(<RouterProvider router={router} />);
    const closeBtn = await screen.findByRole('button', { name: /x/i });
    await user.click(closeBtn);
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/');
    });
  });
});
