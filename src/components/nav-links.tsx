"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  {
    href: '/explore',
    name: 'Explorar',
    label: 'Inicio',
  },
  {
    href: '/categories',
    name: 'Categorías',
    label: 'Categorías',
  },
  {
    href: '/us',
    name: 'Nosotros',
    label: 'Nosotros',
  },
  {
    href: '/contact',
    name: 'Contacto',
    label: 'Contacto',
  },
  {
    href: '/your-learning',
    name: 'Tu aprendizaje',
    label: 'Tu aprendizaje',
  },
  {
    href: '/be-instructor',
    name: 'Ser instructor',
    label: 'Ser instructor',
  },
  {
    href: '/profile',
    name: 'Tu perfil',
    label: 'Perfil',
  }
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'block p-3 hover:text-[--principal-blue] md:flex-none',
              {
                'text-[--principal-red]': pathname === link.href,
              },
            )}
          >
            <p className="hidden sm:block text-base">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
