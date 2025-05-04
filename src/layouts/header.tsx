import { Logo } from '@/components/logo';
import { useAuth } from '@/features/auth';
import {
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@heroui/navbar';
import { Button } from '@heroui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const Header = () => {
  const t = useTranslations();
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUINavbar
      isMenuOpen={isMenuOpen}
      maxWidth='xl'
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='md:hidden'
        />
        <NavbarBrand>
          <Logo className='text-[#234823]' />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify='end'>
        <Button
          as={NextLink}
          color='primary'
          href={user ? '/account' : '/inbox'}
          radius='full'
          variant='shadow'
        >
          {user ? t('Common.cta.account') : t('Common.cta.signIn')}
        </Button>
      </NavbarContent>
      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>menu</div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

export { Header };
