import { Product } from '@/features/product/model';

interface User {
  createdAt: string;
  email: string;
  emailVerified: boolean;
  id: string;
  image: null | string;
  name: null | string;
  plants: Product[];
  provider: 'apple' | 'credentials' | 'google';
  providerId: string;
  updatedAt: null | string;
}

export type { User };
