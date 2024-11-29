'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, Calendar, DollarSign, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/donations', label: 'Donations', icon: DollarSign },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-dark text-white">
      <div className="p-6">
        <h1 className="text-xl font-bold text-brand-gold">WSW Admin</h1>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center px-6 py-3 text-sm font-medium',
                pathname === item.href
                  ? 'bg-brand-teal text-white'
                  : 'text-gray-300 hover:bg-brand-teal/10 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 w-64 p-6">
        <button
          onClick={() => signOut()}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-brand-teal/10 rounded-md w-full"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}