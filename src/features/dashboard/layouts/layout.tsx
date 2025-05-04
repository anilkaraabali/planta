import { Logo } from '@/components/logo';
import { Button } from '@heroui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useMemo } from 'react';
import {
  LiaChartBarSolid,
  LiaHeart,
  LiaHomeSolid,
  LiaSearchSolid,
} from 'react-icons/lia';
import { PiPlantLight } from 'react-icons/pi';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const menuItems = useMemo(
    () => [
      { href: '/dashboard', icon: LiaHomeSolid, name: 'Home' },
      { href: '/dashboard/search', icon: LiaSearchSolid, name: 'Plants' },
      { href: '/dashboard/me', icon: PiPlantLight, name: 'My list' },
      { href: '/dashboard/stats', icon: LiaChartBarSolid, name: 'Stats' },
      { href: '/favorites', icon: LiaHeart, name: 'Favorites' },
    ],
    []
  );

  return (
    <>
      <header className='flex h-16 items-center justify-between border-b border-gray-100 px-4'>
        <Logo />
      </header>
      <aside className='fixed bottom-0 left-0 top-16 z-10 flex w-16 border-r border-gray-100'>
        <nav className='flex size-full flex-col items-center justify-start space-y-4 py-4'>
          {menuItems.map((item, index) => (
            <Button
              as={NextLink}
              color='primary'
              href={item.href}
              isIconOnly
              key={index}
              variant={router.pathname === item.href ? 'flat' : 'light'}
            >
              <item.icon size={24} />
            </Button>
          ))}
        </nav>
      </aside>
      <main className='ml-16 h-[calc(100vh-64px)] overflow-auto bg-white p-4'>
        <div className='space-y-4'>{children}</div>
      </main>
    </>
  );
};

export { DashboardLayout };
