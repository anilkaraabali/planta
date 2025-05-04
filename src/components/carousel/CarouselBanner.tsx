import clsx from 'clsx';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image, { StaticImageData } from 'next/image';
import { ComponentPropsWithRef, forwardRef } from 'react';

interface CarouselBannerProps extends ComponentPropsWithRef<'div'> {
  images: StaticImageData[];
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
}

const CarouselBanner = forwardRef<HTMLDivElement, CarouselBannerProps>(
  ({ images, options, plugins = [], ...containerProps }, ref) => {
    const [emblaRef] = useEmblaCarousel(
      {
        dragFree: true,
        loop: true,
        ...options,
      },
      [
        AutoScroll({
          speed: 1,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
        Autoplay(),
        ...plugins,
      ]
    );

    return (
      <div className={clsx('w-full py-4', containerProps.className)} ref={ref}>
        <div className='relative size-full overflow-hidden' ref={emblaRef}>
          <ul className='absolute inset-0 flex size-full items-center gap-6'>
            {images.map((image, index) => (
              <li className='relative h-full min-w-0 flex-none' key={index}>
                <Image alt={`Slide ${index + 1}`} {...image} unoptimized />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

export { CarouselBanner };
export type { CarouselBannerProps };
