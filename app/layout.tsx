import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'When Sinners Worship',
  description: 'A ministry focused on night vigils and gospel concerts',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-dark text-gray-100`}>
        <Navigation />
        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}