import { User } from '@/features/auth';
import { AbstractIntlMessages } from 'next-intl';

interface PageProps {
  messages: AbstractIntlMessages;
  user: User | null;
}

export type { PageProps };
