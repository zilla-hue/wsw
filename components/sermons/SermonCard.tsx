'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { format } from 'date-fns';
import { SermonType } from '@/types/sermon';

interface SermonCardProps {
  sermon: SermonType;
}

export default function SermonCard({ sermon }: SermonCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={sermon.thumbnail}
          alt={sermon.title}
          fill
          className="object-cover"
        />
        <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-opacity">
          <Play className="w-12 h-12 text-white" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{sermon.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {sermon.speaker} • {format(new Date(sermon.date), 'MMMM d, yyyy')}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 px-2 py-1 rounded">
            {sermon.category}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {sermon.duration}
          </span>
        </div>
      </div>
    </div>
  );
}