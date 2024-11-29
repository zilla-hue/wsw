'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import EventForm from './EventForm';

export default function CreateEventButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-teal hover:bg-brand-teal-light"
      >
        <Plus className="h-5 w-5 mr-2" />
        Create Event
      </button>

      {isModalOpen && (
        <EventForm onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}