import { useAuth } from '@/features/auth';
import { ProductList } from '@/features/product';
import { NextPageWithLayout } from '@/pages/_app';
import { PageProps } from '@/types';
import { Button } from '@heroui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { LiaArrowRightSolid } from 'react-icons/lia';

import { DashboardLayout } from '../layouts';

interface DashboardMePageProps extends PageProps {}

const DashboardMe = () => {
  const t = useTranslations('Product');
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {user?.plants.length ? (
        <ProductList products={user.plants} />
      ) : (
        <div className='px-4'>
          <h2 className='mb-4 font-bold uppercase'>{t('empty.title')}</h2>
          <p className='mb-12 pb-2 text-sm'>{t('empty.description')}</p>
          <Button
            as={NextLink}
            color='primary'
            href='/dashboard/search'
            size='lg'
            variant='ghost'
          >
            {t('empty.cta')} <LiaArrowRightSolid size={24} />
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
};

export type { DashboardMePageProps };
export default DashboardMe;

DashboardMe.getLayout = (page: NextPageWithLayout) => <>{page}</>;
