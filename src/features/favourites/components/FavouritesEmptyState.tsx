import { Button } from '@heroui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { LiaArrowRightSolid } from 'react-icons/lia';

const FavouritesEmptyState = () => {
  const t = useTranslations('Favourites');

  return (
    <div className='px-4'>
      <h2 className='mb-4 font-bold uppercase'>{t('empty.title')}</h2>
      <p className='mb-12 pb-2 text-sm'>{t('empty.description')}</p>
      <Button
        as={NextLink}
        color='primary'
        href='/dashboard/search'
        size='lg'
        variant='ghost'
      >
        {t('empty.cta')} <LiaArrowRightSolid size={24} />
      </Button>
    </div>
  );
};

export { FavouritesEmptyState };
