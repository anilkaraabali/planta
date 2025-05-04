import { IconHeart } from '@/components/icons';
import { USER_FAVORITES_STORAGE_KEY, useAuth } from '@/features/auth';
import { Button, addToast } from '@heroui/react';
import clsx from 'clsx';
import Image from 'next/image';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { dash } from 'radash';
import { FC, useCallback, useEffect, useState } from 'react';
import { FaHandHoldingWater } from 'react-icons/fa';
import { LiaPlusSolid } from 'react-icons/lia';
import { WiHumidity } from 'react-icons/wi';
import { useLocalStorage } from 'usehooks-ts';

import { Product } from '../model';

interface ProductCardProps {
  className?: string;
  index: number;
  product: Product;
  showAddToList?: boolean;
}

const MAX_PRIORITY = 4;

const ProductCard: FC<ProductCardProps> = ({
  className,
  index,
  product,
  showAddToList,
}) => {
  const t = useTranslations('Product');
  const { user } = useAuth();
  const [userFavorites, setUserFavorites] = useLocalStorage<string[]>(
    USER_FAVORITES_STORAGE_KEY,
    []
  );

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = useCallback(() => {
    setUserFavorites((prevFavorites) => {
      if (prevFavorites.includes(product.id)) {
        return prevFavorites.filter((id) => id !== product.id);
      }

      return [...prevFavorites, product.id];
    });
  }, [setUserFavorites, product.id]);

  const addToList = async () => {
    const response = await fetch('/api/product/add-to-list', {
      body: JSON.stringify({
        id: product.id,
        userId: user?.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to add product to list');
    }

    addToast({
      color: 'success',
      shouldShowTimeoutProgress: true,
      timeout: 3000,
      title: 'Product added to list',
    });
  };

  useEffect(() => {
    if (userFavorites.includes(product.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [userFavorites, product.id]);

  return (
    <article
      className={clsx(
        'relative flex select-none flex-col items-start gap-4 overflow-hidden',
        className
      )}
    >
      <div className='aspect-2-3 relative w-full overflow-hidden rounded-lg'>
        <button
          className='absolute right-0 top-0 z-[1] flex size-12 items-center justify-center'
          data-testid='product-card-favorite'
          onClick={toggleFavorite}
          title={isFavorite ? t('removeFromFavourites') : t('addToFavourites')}
        >
          <IconHeart
            className={clsx('fill-black text-white', {
              '!fill-red-500 !text-red-500': isFavorite,
            })}
          />
        </button>
        <picture className='absolute inset-0'>
          <Image
            alt={product.name}
            fill
            priority={index < MAX_PRIORITY}
            sizes='(min-width: 1024px) 214px, (min-width: 1280px) 280px, (min-width: 1440px) 380px, 100vw'
            src={product.coverImage}
          />
        </picture>
        {showAddToList && (
          <Button
            className='absolute bottom-2 left-2 z-[1] gap-1'
            onPress={addToList}
            radius='full'
            size='sm'
          >
            <LiaPlusSolid />
            {t('addToList')}
          </Button>
        )}
        <NextLink
          className='absolute inset-0'
          data-testid='product-card-image-link'
          href={`/dashboard/plants/${dash(product.name)}`}
          title={product.name}
        />
      </div>

      <div className='flex w-full flex-col gap-2'>
        <div>
          <h3 className='text-lg font-semibold'>
            <NextLink
              className='relative z-[1]'
              href={`/dashboard/plants/${dash(product.name)}`}
              title={product.name}
            >
              {product.name}
            </NextLink>
          </h3>
          <p className='text-sm text-gray-500'>{product.type}</p>
        </div>
        <ul className='flex items-center gap-2'>
          <li
            aria-label='Expected humidity'
            className='flex	items-center gap-1 rounded-full bg-primary-50 px-2 py-1 text-primary-500'
          >
            <WiHumidity size={20} />
            <span className='text-xs'>{product.expectedHumidity}%</span>
          </li>
          <li
            aria-label='Weekly water need'
            className='flex	items-center gap-1 rounded-full bg-primary-50 px-2 py-1 text-primary-500'
          >
            <FaHandHoldingWater size={20} />
            <span className='text-xs'>{product.weeklyWaterNeed} L</span>
          </li>
        </ul>
      </div>
    </article>
  );
};

export { ProductCard };
export type { ProductCardProps };
