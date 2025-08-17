import { Provider } from 'react-redux';
import { store } from './store';
import { CustomHeader } from '../components/CustomHeader/CustomHeader';
import { CustomMain } from '../components/CustomMain/CustomMain';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ErrorBoundary>
            <CustomHeader />
            <CustomMain>{children}</CustomMain>
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}
