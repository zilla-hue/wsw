'use client';

import { useState } from 'react';
import EventCard from './EventCard';
import TicketModal from './TicketModal';
import { EventType } from '@/types/event';

interface EventListProps {
  events: EventType[];
}

export default function EventList({ events }: EventListProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTicketPurchase = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onTicketPurchase={() => handleTicketPurchase(event)}
          />
        ))}
      </div>
      
      {selectedEvent && (
        <TicketModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}