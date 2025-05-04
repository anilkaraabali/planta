import clsx from 'clsx';
import { FC } from 'react';

import { Product } from '../model';
import { ProductCard, ProductCardProps } from './ProductCard';

interface ProductListProps {
  cardProps?: Omit<ProductCardProps, 'index' | 'product'>;
  classNames?: {
    card?: string;
    item?: string;
    list?: string;
  };
  products: Product[];
}

const ProductList: FC<ProductListProps> = ({
  cardProps,
  classNames,
  products,
}) => (
  <ul className={clsx('product-list-grid', classNames?.list)}>
    {products.map((product, index) => (
      <li className={classNames?.item} key={product.id}>
        <ProductCard
          className={classNames?.card}
          index={index}
          product={product}
          {...cardProps}
        />
      </li>
    ))}
  </ul>
);

export { ProductList };
export type { ProductListProps };
