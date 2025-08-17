import { Provider } from 'react-redux';
import { store } from './store';
import { CustomHeader } from '../components/CustomHeader/CustomHeader';
import { CustomMain } from '../components/CustomMain/CustomMain';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <CustomHeader />
          <CustomMain>{children}</CustomMain>
        </Provider>
      </body>
    </html>
  );
}
