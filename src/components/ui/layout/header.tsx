'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@heroui/react';
import { Logo } from '../logo';
import { usePathname } from 'next/navigation';
import { navItems, siteConfig } from '@/config/config';
import RegistrationModal from '../modals/registration.modal';
import LoginModal from '../modals/login.modal';
import { useState } from 'react';
import signOutFunc from '@/actions/sign-out';
import { useAuthStore } from '@/store/auth-store';

export default function Header() {
  const pathName = usePathname();
  const { isAuth, session, status, setAuthState } = useAuthStore();

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.log(error);
    }
    setAuthState('unauthenticated', null);
  };

  const getNavItems = () => {
    return navItems.map((item) => {
      const isActive = item.href === pathName;
      return (
        <NavbarItem key={item.href}>
          <Link
            href={item.href}
            className={`
              ${isActive ? 'text-primary' : 'text-inherit'}
              hover:text-blue-300
              hover:border-blue-300
              hover:duration-200`}
          >
            {item.label}
          </Link>
        </NavbarItem>
      );
    });
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="flex gap-2">
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.title}</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {getNavItems()}
      </NavbarContent>
      <NavbarContent justify="end">
        {isAuth && <p>Здравствуй, {session?.user?.email} </p>}
        {status === 'loading' ? (
          <p>Загрузка</p>
        ) : !isAuth ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                color="secondary"
                variant="flat"
                onPress={() => setIsLoginOpen(true)}
              >
                Логин
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                variant="flat"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Зарегистрироваться
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} color="secondary" variant="flat" onPress={handleSignOut}>
              Выйти
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  );
}
