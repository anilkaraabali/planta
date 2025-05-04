import { Product, ProductList } from '@/features/product';
import { NextPageWithLayout } from '@/pages/_app';
import { PageProps } from '@/types';
import { Button, useDisclosure } from '@heroui/react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { LiaPlusSolid } from 'react-icons/lia';

import { DashboardLayout } from '../layouts';

interface DashboardSearchPageProps extends PageProps {
  products: Product[];
}

const LazyProductAddForm = dynamic(
  () =>
    import('@/features/product/components/ProductAddForm').then(
      (mod) => mod.ProductAddForm
    ),
  { ssr: false }
);

const DashboardSearchPage = ({ products }: DashboardSearchPageProps) => {
  const t = useTranslations('Search');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <DashboardLayout>
      <div className='dashboard-headline'>
        <h1 className='dashboard-title'>{t('title')}</h1>
        <div className='flex w-full items-center justify-between gap-6'>
          <p className='uppercase'>{t('total', { count: products.length })}</p>
          <Button color='primary' onPress={onOpen} variant='light'>
            <LiaPlusSolid size={24} />
            {t('cta.add')}
          </Button>
        </div>
      </div>

      {products.length && (
        <ProductList
          cardProps={{
            showAddToList: true,
          }}
          products={products}
        />
      )}
      {isOpen && (
        <LazyProductAddForm isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
    </DashboardLayout>
  );
};

export type { DashboardSearchPageProps };
export default DashboardSearchPage;

DashboardSearchPage.getLayout = (page: NextPageWithLayout) => <>{page}</>;
