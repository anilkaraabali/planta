import { PageProps } from '@/types';
import { NextPage } from 'next';

interface DashboardPageProps extends PageProps {}

const DashboardPage: NextPage<DashboardPageProps> = () => (
  <main>dashboard</main>
);

export type { DashboardPageProps };
export default DashboardPage;
