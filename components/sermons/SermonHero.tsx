'use client';

import { ArrowRight } from 'lucide-react';

export default function SermonHero() {
  return (
    <div className="relative bg-teal-800 dark:bg-teal-900">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Sermon Library
          </h1>
          <p className="mt-4 text-xl text-teal-100">
            Discover life-changing messages that inspire and transform
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-semibold text-teal-800 shadow-sm hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              Latest Sermons
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}