import { type JSX } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { CustomMain } from './components/CustomMain/CustomMain';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CustomHeader } from './components/CustomHeader/CustomHeader';
import { CardDetails } from './components/CardDetails/CardDetails';

const router = createBrowserRouter(
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
        ErrorBoundary={ErrorBoundary}
      >
        <Route path="/" element={<SearchPage />}>
          <Route path=":page/:detailsId" element={<CardDetails />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export function App(): JSX.Element {
  return <RouterProvider router={router} />;
}
