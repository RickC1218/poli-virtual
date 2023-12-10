"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface NavLink {
  href: string;
  name: string;
  label: string;
}

const isClient = typeof window !== 'undefined';

const NavLinks = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Verificar el sessionStorage para determinar si hay una sesión activa
    const isSessionActive = isClient && sessionStorage.getItem('currentUser') !== null;
    setSessionActive(isSessionActive);
  }, []);

  const links: NavLink[] = sessionActive
    ? [
        /* Enlaces para usuarios autenticados */
      {
        href: '/common/explore',
        name: 'Explorar',
        label: 'Inicio',
      },
      {
        href: '/common/categories',
        name: 'Categorías',
        label: 'Categorías',
      },
      {
        href: '/common/your-learning',
        name: 'Tu aprendizaje',
        label: 'Tu aprendizaje',
      },
      {
        href: '/common/be-instructor',
        name: 'Ser instructor',
        label: 'Ser instructor',
      },
      {
        href: '/common/profile',
        name: 'Tu perfil',
        label: 'Perfil',
      }
    ]
    : [
        /* Enlaces para usuarios no autenticados */
      {
        href: '/common/explore',
        name: 'Explorar',
        label: 'Explorar',
      },
      {
        href: '/common/categories',
        name: 'Categorías',
        label: 'Categorías',
      },
      {
        href: '/common/us',
        name: 'Nosotros',
        label: 'Nosotros',
      },
      {
        href: '/common/contact',
        name: 'Contacto',
        label: 'Contacto',
      }
    ];

  const renderLink = (link: NavLink) => (
    <Link
      key={link.name}
      href={link.href}
      className={clsx(
        'block p-3 cursor-pointer hover:text-[--principal-blue] hover:drop-shadow md:flex-none',
        {
          'drop-shadow text-[--principal-red]': pathname === link.href,
        },
      )}
    >
      <p className="block text-base">{link.name}</p>
    </Link>
  );

  return <>{links.map((link) => renderLink(link))}</>;
};

export default NavLinks;