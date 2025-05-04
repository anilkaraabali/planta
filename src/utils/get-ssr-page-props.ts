import { LocaleType, PageProps } from '@/types';
import { GetServerSidePropsContext } from 'next';

import { getMessages } from './get-messages';

const getSSRPageProps = async (
  ctx: GetServerSidePropsContext,
  tScopes: string[] = []
): Promise<PageProps> => {
  const locale = ctx.locale as LocaleType;

  return {
    messages: await getMessages(locale, tScopes),
    user: null,
  };
};

export { getSSRPageProps };
