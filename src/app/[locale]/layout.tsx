import { Provider } from 'react-redux';
import { store } from '../store';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { CustomMain } from '../../components/CustomMain/CustomMain';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <Provider store={store}>
          <NextIntlClientProvider>
            <ErrorBoundary>
              <CustomHeader />
              <CustomMain>{children}</CustomMain>
            </ErrorBoundary>
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
}
