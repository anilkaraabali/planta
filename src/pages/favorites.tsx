import type { GetServerSideProps } from 'next';

import { FavouritesPageProps } from '@/features/favourites/pages/page';
import { getReferer, getSSRPageProps } from '@/utils';

export const getServerSideProps = (async (ctx) => {
  const pageProps = await getSSRPageProps(ctx, ['Favourites']);

  return {
    props: {
      ...pageProps,
      referer: getReferer({
        headers: ctx.req.headers,
        redirect: '/',
      }),
    },
  };
}) satisfies GetServerSideProps<FavouritesPageProps>;

export { default } from '@/features/favourites/pages/page';
