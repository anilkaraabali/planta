import type { GetServerSideProps } from 'next';

import { DashboardStatsPageProps } from '@/features/dashboard/pages/stats';
import { getSSRPageProps } from '@/utils';

export const getServerSideProps = (async (ctx) => ({
  props: {
    ...(await getSSRPageProps(ctx, ['Dashboard'])),
  },
})) satisfies GetServerSideProps<DashboardStatsPageProps>;

export { default } from '@/features/dashboard/pages/stats';
