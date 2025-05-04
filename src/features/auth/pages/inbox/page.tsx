import { LanguageSwitch } from '@/components/language-switch';
import { Logo } from '@/components/logo';
import { NextPageWithLayout } from '@/pages/_app';
import { AbstractIntlMessages, useTranslations } from 'next-intl';
import { list } from 'radash';
import { useCallback, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { AuthConfirm } from '../../components/AuthConfirm';
import { AuthEmailForm } from '../../components/AuthEmailForm';
import { AuthSocials } from '../../components/AuthSocials';
import { AuthProvider } from '../../components/types';

interface InboxPageProps {
  messages: AbstractIntlMessages;
  referer: string;
}

const VIDEO_START_INDEX = 1;
const VIDEO_END_INDEX = 3;

const InboxPage = (_: InboxPageProps) => {
  const t = useTranslations('Auth');

  const [email, setEmail] = useState('');
  const [provider, setProvider] = useState<AuthProvider | null>(null);

  const Body = useCallback(() => {
    switch (provider) {
      case 'email':
        return (
          <AuthEmailForm
            onCancel={() => setProvider(null)}
            setEmail={setEmail}
            setStep={setProvider}
          />
        );
      case 'confirm':
        return (
          <AuthConfirm email={email} onBack={() => setProvider('email')} />
        );
      default:
        return (
          <>
            <Logo />
            <div className='mx-auto flex max-w-52 flex-col gap-3'>
              <h1
                className='text-center text-4xl font-bold'
                dangerouslySetInnerHTML={{ __html: t.raw('title') }}
              />
              <p className='text-center text-sm text-default-500'>
                {t('description')}
              </p>
            </div>
            <AuthSocials onClick={setProvider} />
          </>
        );
    }
  }, [provider]);

  return (
    <div className='flex h-screen w-screen'>
      <div className='hidden w-full items-center p-8 md:flex md:basis-1/2 lg:grow lg:basis-full'>
        <Carousel
          autoPlay
          infiniteLoop
          interval={20000}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
        >
          {list(VIDEO_START_INDEX, VIDEO_END_INDEX).map((index) => (
            <div className='relative w-full' key={index}>
              <video
                autoPlay
                className='w-full'
                controlsList='nodownload'
                disablePictureInPicture
                disableRemotePlayback
                loop
                muted
                playsInline
              >
                <source
                  src={`/videos/auth/video-${index}.mp4`}
                  type='video/mp4'
                />
              </video>
              <div className='pointer-events-none absolute inset-0 bg-black/40' />
            </div>
          ))}
        </Carousel>
      </div>
      <div className='flex basis-full flex-col items-start justify-between bg-content2 p-6 py-2 md:basis-6/12 dark:bg-content1'>
        <LanguageSwitch
          triggerButtonProps={{
            size: 'sm',
          }}
        />
        <div className='mx-auto flex max-w-xs flex-col items-center gap-8 text-center'>
          <Body />
        </div>
        <div className='h-8 w-32' />
      </div>
    </div>
  );
};

export type { InboxPageProps };
export default InboxPage;

InboxPage.getLayout = (page: NextPageWithLayout) => page;
