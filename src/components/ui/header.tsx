'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@heroui/react';
import { Logo } from './logo';
import { usePathname } from 'next/navigation';
import { navItems, siteConfig } from '@/config/config';

export default function Header() {
  const pathName = usePathname();

  const getNavItems = () => {
    return navItems.map((item) => {
      const isActive = item.href === pathName;
      return (
        <NavbarItem key={item.href}>
          <Link
            href={item.href}
            className={`${
              isActive ? 'text-primary' : 'text-inherit'
            } hover:text-blue-300 hover:border-blue-300 hover:duration-200`}
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
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Логин</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Зарегистрироваться
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
