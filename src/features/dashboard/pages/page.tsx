import { useAuth } from '@/features/auth';
import { NextPageWithLayout } from '@/pages/_app';
import { PageProps } from '@/types';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { DashboardLayout } from '../layouts';

interface DashboardPageProps extends PageProps {}

const DashboardPage = () => {
  const t = useTranslations('Dashboard');
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-semibold'>
          {t('title', { name: user?.name })}
        </h1>
        <div className='text-sm'>
          {dayjs(Date.now()).format('dddd, MMMM D')}
        </div>
      </div>
    </DashboardLayout>
  );
};

export type { DashboardPageProps };
export default DashboardPage;

DashboardPage.getLayout = (page: NextPageWithLayout) => <>{page}</>;
