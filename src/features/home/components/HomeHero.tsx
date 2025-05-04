import { CarouselBanner } from '@/components/carousel';
import { Button } from '@heroui/react';
import Image, { StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';
import { list } from 'radash';
import { FC, useMemo } from 'react';
import { LiaUserFriendsSolid } from 'react-icons/lia';

const CAROUSEL_IMAGE_LOOP_COUNT = 3;

const HomeHero: FC = () => {
  const t = useTranslations();

  const carouselImages: StaticImageData[] = useMemo(() => {
    const images = [
      {
        alt: 'The New York Times',
        height: 80,
        src: '/news/the-new-york-times.svg',
        width: 230,
      },
      {
        alt: 'Martha Stewart',
        height: 23,
        src: '/news/martha-stewart.svg',
        width: 205,
      },
      {
        alt: 'Newsweek',
        height: 26,
        src: '/news/newsweek.svg',
        width: 164,
      },
      {
        alt: 'The Verge',
        height: 31,
        src: '/news/the-verge.svg',
        width: 136,
      },
      {
        alt: 'Mashable',
        height: 24,
        src: '/news/mashable.svg',
        width: 137,
      },
    ];

    return list(CAROUSEL_IMAGE_LOOP_COUNT).flatMap(() => images);
  }, []);

  return (
    <section
      className='relative overflow-hidden'
      id='hero'
      style={{
        height: 'calc(100svh - 64px)',
        maxHeight: '960px',
      }}
    >
      <video
        autoPlay
        className='absolute inset-0'
        controlsList='nodownload'
        disablePictureInPicture
        disableRemotePlayback
        loop
        muted
        onContextMenu={(e) => e.preventDefault()}
        src='/hero.webm'
      />
      <div className='relative z-10 mx-auto grid size-full max-w-7xl grid-rows-[1fr_300px] overflow-hidden px-4 md:grid-rows-[1fr_400px] lg:grid-cols-[1fr_500px] lg:grid-rows-1'>
        <div className='flex  max-w-3xl flex-col gap-6 self-center'>
          <h1 className='text-8xl font-bold text-primary'>
            {t('Home.hero.title')}
          </h1>
          <p>{t('Home.hero.description')}</p>

          <div className='flex items-center gap-4'>
            <Button color='primary' radius='full'>
              {t('Home.hero.primaryAction')}
            </Button>
            <Button color='secondary' radius='full'>
              {t('Home.hero.secondaryAction')}
            </Button>
          </div>

          <div className='mt-auto flex items-center gap-4 pt-16'>
            <div className='relative h-[64px] w-[130px] lg:w-[184px]'>
              <Image
                alt='App of the day'
                fill
                src='/icons/app-of-the-day.svg'
                unoptimized
              />
            </div>
            <div className='relative h-[64px] w-[130px] lg:w-[184px]'>
              <Image
                alt='Editor choice'
                fill
                src='/icons/editor-choice.svg'
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className='relative'>
          <div className='absolute left-0 top-20 z-10 flex h-16 translate-y-20 items-center justify-center gap-2 rounded-full bg-secondary-100 p-2 shadow-lg md:p-3'>
            <div className='flex size-10 items-center justify-center rounded-full bg-secondary text-primary'>
              <LiaUserFriendsSolid size={24} />
            </div>
            <p className='text-sm sm:text-base'>{t('Home.hero.socialProof')}</p>
          </div>
          <Image
            alt='Hero'
            className='!size-full'
            fill
            priority
            sizes='(min-width:1024px) 450px, (min-width:768px) 400px, 300px'
            src='/hero.webp'
            style={{
              objectFit: 'contain',
              objectPosition: 'center',
            }}
          />
        </div>
      </div>
      <CarouselBanner
        className='absolute bottom-0 left-0 z-10 h-16 bg-[#c5dfaa]'
        images={carouselImages}
      />
    </section>
  );
};

export { HomeHero };
