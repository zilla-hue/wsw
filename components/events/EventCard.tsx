'use client';

import { format } from 'date-fns';
import { EventType } from '@/types/event';
import { useRouter } from 'next/navigation';

interface EventCardProps {
  event: EventType;
  onTicketPurchase: () => void;
}

export default function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  const formattedDate = format(new Date(event.date), 'MMMM d, yyyy');

  const handleJoinUs = () => {
    // Store the form type in sessionStorage to be read by ShareExperience
    sessionStorage.setItem('selectedFormType', 'register');
    // Navigate to home page and scroll to registration form
    router.push('/#share-experience');
  };

  return (
    <div className="bg-brand-dark/50 rounded-lg overflow-hidden border border-brand-gold/20 hover:border-brand-gold/40 transition-colors">
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-brand-gold mb-2">{event.title}</h3>
        <div className="space-y-2 mb-4">
          <p className="text-gray-300">
            <span className="font-medium">Date:</span> {formattedDate}
          </p>
          <p className="text-gray-300">
            <span className="font-medium">Time:</span> {event.time}
          </p>
          <p className="text-gray-300">
            <span className="font-medium">Location:</span> {event.location}
          </p>
        </div>
        <p className="text-gray-400 mb-6">{event.description}</p>
        <button
          onClick={handleJoinUs}
          className="w-full bg-brand-teal hover:bg-brand-teal-light text-white py-3 rounded-md font-semibold transition-colors"
        >
          Join Us
        </button>
      </div>
    </div>
  );
}