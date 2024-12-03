import EventList from '@/components/events/EventList';
import { EventType } from '@/types/event';

const upcomingEvents: EventType[] = [
  {
    id: '1',
    title: 'Abuja Reckoning',
    date: '2024-12-13',
    time: '6:00 PM',
    location: 'University of Abuja Main Campus',
    description: 'Join us for a powerful night of worship and spiritual transformation.',
    imageUrl: '/images/abuja-reckoning.jpg',
    alt: "Abuja Reckoning 2024 Event Banner",
    ticketTypes: [
      { id: '1', name: 'General Admission', price: 0, available: true },
      { id: '2', name: 'VIP Seating', price: 50, available: true },
    ],
  },
  // {
  //   id: '2',
  //   title: 'Gospel Praise Night',
  //   date: '2024-02-28',
  //   time: '19:00',
  //   location: 'Community Hall',
  //   description: 'An evening of uplifting gospel music and fellowship.',
  //   imageUrl: 'https://images.unsplash.com/photo-1470019693664-1d202d2c0907',
  //   ticketTypes: [
  //     { id: '3', name: 'Standard Entry', price: 25, available: true },
  //     { id: '4', name: 'Premium Package', price: 75, available: true },
  //   ],
  // },
  // {
  //   id: '3',
  //   title: 'Worship Workshop',
  //   date: '2024-03-10',
  //   time: '14:00',
  //   location: 'Fellowship Center',
  //   description: 'Learn and grow in worship with experienced leaders.',
  //   imageUrl: 'https://images.unsplash.com/photo-1508695666381-69deeaa78ccb',
  //   ticketTypes: [
  //     { id: '5', name: 'Workshop Pass', price: 35, available: true },
  //     { id: '6', name: 'Workshop + Materials', price: 60, available: true },
  //   ],
  // },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-gold mb-4">Upcoming Events</h1>
          <p className="text-gray-300 text-lg">Join us for transformative worship experiences</p>
        </div>
        <EventList events={upcomingEvents} />
      </div>
    </div>
  );
}