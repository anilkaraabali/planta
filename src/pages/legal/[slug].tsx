import type { GetServerSideProps } from 'next';

import { PdfPageProps } from '@/features/pdf/pages/page';
import { getSSRPageProps } from '@/utils';
import { camel } from 'radash';

export const getServerSideProps = (async (ctx) => {
  const { query } = ctx;
  const slug = Array.isArray(query.slug) ? query.slug[0] : query.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fileName: 'https://pdfobject.com/pdf/sample.pdf',
      title: camel(slug),
      ...(await getSSRPageProps(ctx, ['Home'])),
    },
  };
}) satisfies GetServerSideProps<PdfPageProps>;

export { default } from '@/features/pdf/pages/page';
