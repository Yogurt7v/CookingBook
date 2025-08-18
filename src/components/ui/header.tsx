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

export default function Header() {
  const navItems = [
    { href: '/', label: 'Рецепты' },
    { href: '/ingredients', label: 'Ингредиенты' },
    { href: '/about', label: 'О проекте' },
  ];

  const pathName = usePathname();

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="flex gap-2">
          <Logo />
          <p className="font-bold text-inherit">Cooking Book</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item) => {
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
        })}
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
