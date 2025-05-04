import type { GetServerSideProps } from 'next';

import { DashboardMePageProps } from '@/features/dashboard/pages/me';
import { getSSRPageProps } from '@/utils';

export const getServerSideProps = (async (ctx) => ({
  props: {
    ...(await getSSRPageProps(ctx, ['Product'])),
  },
})) satisfies GetServerSideProps<DashboardMePageProps>;

export { default } from '@/features/dashboard/pages/me';
