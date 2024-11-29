'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import Logo from '@/components/shared/Logo';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  // { href: '/sermons', label: 'Sermons' },
  // { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-brand-dark border-b border-brand-gold/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo className="h-8" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'text-gray-300 hover:text-brand-gold transition-colors',
                  'px-3 py-2 rounded-md text-sm font-medium'
                )}
              >
                {item.label}
              </Link>
            ))}
            {/* <Link
              href="/donate"
              className={clsx(
                'bg-brand-gold hover:bg-brand-gold/90 text-brand-dark',
                'px-6 py-2 rounded-full text-sm font-semibold',
                'transform transition-all duration-200 hover:scale-105',
                'shadow-lg hover:shadow-brand-gold/20',
                'border-2 border-transparent hover:border-brand-gold/20',
                'flex items-center justify-center'
              )}
            >
              Donate Now
            </Link> */}
          </div>

          <div className="md:hidden flex items-center">
          {/* <Link
              href="/donate"
              className={clsx(
                'bg-brand-gold hover:bg-brand-gold/90 text-brand-dark',
                'px-4 py-1.5 rounded-full text-sm font-semibold',
                'transform transition-all duration-200 hover:scale-105',
                'shadow-lg hover:shadow-brand-gold/20',
                'border-2 border-transparent hover:border-brand-gold/20'
              )}
            >
              Donate
            </Link> */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-brand-gold p-2"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'text-gray-300 hover:text-brand-gold transition-colors',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}