import { Metadata } from 'next';
import SermonList from '@/components/sermons/SermonList';
import SermonHero from '@/components/sermons/SermonHero';

export const metadata: Metadata = {
  title: 'Sermons | When Sinners Worship',
  description: 'Watch and listen to our collection of inspiring sermons from When Sinners Worship ministry.',
};

export default function SermonsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SermonHero />
      <main className="container mx-auto px-4 py-12">
        <SermonList />
      </main>
    </div>
  );
}