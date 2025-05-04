import { User } from '@/features/auth';
import { LocaleType, PageProps } from '@/types';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';

import { getMessages } from './get-messages';

const getSSRPageProps = async (
  ctx: GetServerSidePropsContext,
  tScopes: string[] = []
): Promise<PageProps> => {
  const locale = ctx.locale as LocaleType;

  const cookies = cookie.parse(ctx.req.headers.cookie || '');
  const userId = cookies.userId;

  let users: User[] = [];

  try {
    users = (await import('public/data/users.json')).default as User[];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching users data:', err);

    users = [];
  }

  const user = users.find((user) => user.id === userId) as User;

  return {
    messages: await getMessages(locale, tScopes),
    user: user || null,
  };
};

export { getSSRPageProps };
