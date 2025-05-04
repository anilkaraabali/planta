import type { AppProps } from 'next/app';

import { fontMono, fontSans } from '@/config/fonts';
import { AuthProvider } from '@/features/auth';
import { ErrorBoundary } from '@/features/error';
import { DefaultLayout, Head } from '@/layouts';
import '@/styles/globals.css';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export type NextPageWithLayout<P = object, IP = P> = {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
} & NextPage<P, IP>;

type AppPropsWithLayout = {
  Component: NextPageWithLayout;
} & AppProps;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  const router = useRouter();

  return (
    <HeroUIProvider labelPlacement='inside' navigate={router.push}>
      <NextThemesProvider>
        <ErrorBoundary>
          <NextIntlClientProvider
            locale={router.locale}
            messages={pageProps.messages}
            timeZone='Europe/Istanbul'
          >
            <GoogleReCaptchaProvider
              container={{
                parameters: {
                  badge: 'bottomright',
                  theme: 'light',
                },
              }}
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              scriptProps={{
                appendTo: 'head',
                async: true,
                defer: true,
                id: 'recaptcha-script',
              }}
            >
              <Head />
              <ToastProvider placement='bottom-center' />
              <AuthProvider user={pageProps.user}>
                {getLayout(<Component {...pageProps} />)}
              </AuthProvider>
            </GoogleReCaptchaProvider>
          </NextIntlClientProvider>
        </ErrorBoundary>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export const fonts = {
  mono: fontMono.style.fontFamily,
  sans: fontSans.style.fontFamily,
};
