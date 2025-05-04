interface User {
  createdAt: string;
  email: string;
  emailVerified: boolean;
  id: string;
  image: null | string;
  name: null | string;
  provider: 'apple' | 'credentials' | 'google';
  providerId: string;
  updatedAt: null | string;
}

export type { User };
