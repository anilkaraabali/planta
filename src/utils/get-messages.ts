import { LocaleType } from '@/types';
import { pick } from 'radash';

const getMessages = async (locale: LocaleType = 'en', keys: string[] = []) =>
  pick((await import(`../../messages/${locale}.json`)).default, [
    'Common',
    'Footer',
    ...keys,
  ]);

export { getMessages };
