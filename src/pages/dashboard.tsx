import type { GetServerSideProps } from 'next';

import { DashboardPageProps } from '@/features/dashboard/pages/page';
import { getSSRPageProps } from '@/utils';

export const getServerSideProps = (async (ctx) => ({
  props: {
    ...(await getSSRPageProps(ctx, ['Home'])),
  },
})) satisfies GetServerSideProps<DashboardPageProps>;

export { default } from '@/features/dashboard/pages/page';
