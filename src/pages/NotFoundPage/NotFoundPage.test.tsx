import { screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';
import { userSetUp } from '../../test-utils/test-utils';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import { SearchPage } from '../SearchPage/SearchPage';

describe('NotFoundPage', () => {
  test('renders successfully and back home button redirects to the main page', async () => {
    const router = createMemoryRouter(
      createRoutesFromElements(
        <>
          <Route path="/invalid-route" element={<NotFoundPage />} />
          <Route path="/" element={<SearchPage />} />
        </>
      ),
      { initialEntries: ['/invalid-route'] }
    );

    const { user } = userSetUp(<RouterProvider router={router} />);
    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
    const backHomeBtn = screen.getByRole('button', { name: /back to home/i });
    expect(backHomeBtn).toBeInTheDocument();
    await user.click(backHomeBtn);
    expect(await screen.findByRole('textbox')).toBeInTheDocument();
  });
});
