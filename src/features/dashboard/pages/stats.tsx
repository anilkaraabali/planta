import { NextPageWithLayout } from '@/pages/_app';
import { PageProps } from '@/types';

import { DashboardLayout } from '../layouts';

interface DashboardStatsPageProps extends PageProps {}

const DashboardStatsPage = () => (
  <DashboardLayout>
    <h1 className='text-2xl'>Stats</h1>
  </DashboardLayout>
);

export type { DashboardStatsPageProps };
export default DashboardStatsPage;

DashboardStatsPage.getLayout = (page: NextPageWithLayout) => <>{page}</>;
