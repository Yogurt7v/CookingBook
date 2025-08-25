'use client';

import { navItems } from '@/config/config';
import { usePathname } from 'next/navigation';

export default function Title() {
  const pathName = usePathname();

  const currentNavItem = navItems.find((item) => item.href === pathName);

  const pageTitle = currentNavItem ? currentNavItem.label : '';

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">{pageTitle}</h1>
    </div>
  );
}
