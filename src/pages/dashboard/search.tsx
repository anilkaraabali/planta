import type { GetServerSideProps } from 'next';

import { DashboardSearchPageProps } from '@/features/dashboard/pages/search';
import { Product } from '@/features/product';
import { getSSRPageProps, promiseAllSettled } from '@/utils';

export const getServerSideProps = (async (ctx) => {
  const [productsResponse, ssrProps] = await promiseAllSettled([
    fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/products`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }),
    getSSRPageProps(ctx, ['Product', 'Search']),
  ]);

  if (!productsResponse.ok) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch products:', productsResponse.statusText);

    return {
      notFound: true,
    };
  }

  const products: Product[] = await productsResponse.json();
  const userProducts = ssrProps.user?.plants;
  const filteredProducts = products.filter(
    (product) =>
      !userProducts?.some((userProduct) => userProduct.id === product.id)
  );

  return {
    props: {
      products: filteredProducts,
      ...ssrProps,
    },
  };
}) satisfies GetServerSideProps<DashboardSearchPageProps>;

export { default } from '@/features/dashboard/pages/search';
