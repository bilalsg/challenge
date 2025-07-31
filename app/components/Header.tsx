'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Rendez-vous', href: '/rendez-vous' },
  { label: 'Dossier médical', href: '/dossier' },
  { label: 'Recommandations', href: '/recommandations' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Portail Patient</h1>
        <nav className="space-x-4">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`hover:underline ${
                pathname === href ? 'font-bold underline' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
