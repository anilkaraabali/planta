import { Button } from '@heroui/react';
import clsx from 'clsx';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';

import { usePrevNextButtons } from './use-prev-next-buttons';
import { useSelectedSnapDisplay } from './use-selected-snap-display';

interface CarouselProps extends ComponentPropsWithRef<'section'> {
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  slides: ReactNode[];
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ options, plugins, slides, ...sectionProps }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

    const {
      nextBtnDisabled,
      onNextButtonClick,
      onPrevButtonClick,
      prevBtnDisabled,
    } = usePrevNextButtons(emblaApi);

    const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

    return (
      <section
        {...sectionProps}
        className={clsx('w-full', sectionProps.className)}
      >
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='ml-[-var(--slide-spacing)] flex touch-pan-y touch-pinch-zoom'>
            {slides.map((slide, index) => (
              <div
                className='min-w-0 flex-none'
                key={index}
                style={{
                  flexBasis: 'var(--slide-size)',
                  paddingLeft: 'var(--slide-spacing)',
                  transform: 'translate3d(0, 0, 0)',
                }}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        <div className='mt-4 grid grid-cols-[auto,1fr] justify-between gap-3'>
          <div className='grid grid-cols-2 items-center gap-2'>
            <Button
              color='primary'
              disabled={prevBtnDisabled}
              isIconOnly
              onPress={onPrevButtonClick}
              radius='full'
              size='sm'
              variant='flat'
            >
              <LiaAngleLeftSolid size={20} />
            </Button>
            <Button
              color='primary'
              disabled={nextBtnDisabled}
              isIconOnly
              onPress={onNextButtonClick}
              radius='full'
              size='sm'
              variant='flat'
            >
              <LiaAngleRightSolid size={20} />
            </Button>
          </div>

          <div className='place-self-end font-semibold'>
            {selectedSnap + 1} / {snapCount}
          </div>
        </div>
      </section>
    );
  }
);

export { Carousel };
export type { CarouselProps };
