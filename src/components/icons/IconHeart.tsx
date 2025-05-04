import { FC } from 'react';

import { IconProps } from './types';

const IconHeart: FC<IconProps> = (props) => (
  <svg
    aria-hidden='true'
    focusable='false'
    height='16'
    role='img'
    viewBox='0 0 16 16'
    width='16'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='m8 13.99 6.217-6.217a3.528 3.528 0 0 0-4.99-4.99L8.001 4.01 6.773 2.784a3.528 3.528 0 1 0-4.99 4.99L8 13.988Z'
      fill='currentColor'
    />
    <path d='M8.697 2.253a4.278 4.278 0 0 1 6.05 6.05L8 15.05 1.253 8.304a4.278 4.278 0 0 1 6.05-6.05L8 2.948l.696-.696Zm4.99 1.06a2.778 2.778 0 0 0-3.93 0L8.003 5.07 6.243 3.315a2.779 2.779 0 0 0-3.93 3.928L8 12.928l5.686-5.686a2.778 2.778 0 0 0 0-3.928Z' />
  </svg>
);

export { IconHeart };
