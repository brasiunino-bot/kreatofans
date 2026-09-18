'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Feed', href: '/feed' },
    { label: 'Populares', href: '/populares' },
    { label: 'Tienda', href: '/tienda' },
    { label: 'Mensajes', href: '/mensajes' },
    { label: 'Perfil', href: '/perfil' },
    { label: 'Ganancias', href: '/ganancias' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 py-3 px-2 flex justify-around items-center z-50 max-w-2xl mx-auto">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-[10px] font-semibold transition ${
              isActive ? 'text-yellow-500 font-bold scale-105' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
