import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { CustomMain } from '../../components/CustomMain/CustomMain';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { ReduxProvider } from '../providers/ReduxProvider';
import { NextIntlClientProvider } from 'next-intl';
import '../styles/global.css';

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
        <ReduxProvider>
          <NextIntlClientProvider>
            <ErrorBoundary>
              <CustomHeader />
              <CustomMain>{children}</CustomMain>
            </ErrorBoundary>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
