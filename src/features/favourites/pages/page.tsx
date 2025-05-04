import { USER_FAVORITES_STORAGE_KEY } from '@/features/auth';
import { DashboardLayout } from '@/features/dashboard';
import { Product, ProductList } from '@/features/product';
import { NextPageWithLayout } from '@/pages/_app';
import { PageProps } from '@/types';
import { Skeleton } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { list } from 'radash';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { FavouritesEmptyState } from '../components/FavouritesEmptyState';
import { FavouritesSkeleton } from '../components/FavouritesSkeleton';

const fetcher = async (url: string): Promise<Product[]> => {
  const response = await fetch(url);

  return response.json();
};

const SKELETON_COUNT = 3;

interface FavouritesPageProps extends PageProps {}

const FavouritesPage = () => {
  const t = useTranslations('Favourites');
  const userFavs = useReadLocalStorage<string[]>(USER_FAVORITES_STORAGE_KEY);

  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, error, isLoading } = useSWR<Product[]>(
    shouldFetch ? '/api/plants' : null,
    fetcher
  );

  useEffect(() => {
    if (userFavs?.length) {
      setShouldFetch(true);
    }
  }, [userFavs]);

  useEffect(() => {
    if (data && userFavs?.length) {
      const filteredPlants = data.filter((plant) =>
        userFavs.some((fav) => fav === plant.id)
      );

      setProducts(filteredPlants);
    }
  }, [data, userFavs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <DashboardLayout>
      <h1 className='page-title'>{t('title')}</h1>
      {(() => {
        if (!isMounted) {
          return <FavouritesSkeleton />;
        }

        if (!userFavs?.length) {
          return <FavouritesEmptyState />;
        }

        if (isLoading || error || !data) {
          return (
            <ul className='product-list-grid'>
              {list(SKELETON_COUNT).map((_, index) => (
                <li key={index}>
                  <Skeleton className='aspect-2-3 w-full' />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <>
            <div className='mb-4 px-4'>
              <p className='uppercase'>
                {t('total', { count: products.length })}
              </p>
            </div>
            <ProductList products={products} />
          </>
        );
      })()}
    </DashboardLayout>
  );
};

export type { FavouritesPageProps };
export default FavouritesPage;

FavouritesPage.getLayout = (page: NextPageWithLayout) => <>{page}</>;
