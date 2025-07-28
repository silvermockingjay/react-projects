import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import { userSetUp } from '../../test-utils/test-utils';
import { screen } from '@testing-library/react';
import { CustomHeader } from './CustomHeader';
import { CustomMain } from '../CustomMain/CustomMain';
import { Outlet } from 'react-router';
import { AboutPage } from '../../pages/AboutPage';

describe('CustomHeader', () => {
  test('renders header successfully', async () => {
    const router = createMemoryRouter(
      createRoutesFromElements(
        <>
          <Route
            element={
              <div>
                <CustomHeader />
                <CustomMain>
                  <Outlet />
                </CustomMain>
              </div>
            }
          >
            <Route path="/" element={<div>Search Page</div>} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </>
      ),
      { initialEntries: ['/'] }
    );
    const { user } = userSetUp(<RouterProvider router={router} />);
    const link = screen.getByRole('link', { name: /about/i });
    await user.click(link);
    expect(await screen.findByTestId('about-page-content')).toBeInTheDocument();
  });
});
