'use client';

import { Calendar, MapPin, Users } from 'lucide-react';

const recentEvents = [
  {
    id: '1',
    title: 'Night of Divine Encounter',
    date: '2024-02-15',
    location: 'Main Sanctuary',
    attendees: 245,
  },
  {
    id: '2',
    title: 'Gospel Praise Night',
    date: '2024-02-28',
    location: 'Community Hall',
    attendees: 180,
  },
  {
    id: '3',
    title: 'Worship Workshop',
    date: '2024-03-10',
    location: 'Fellowship Center',
    attendees: 120,
  },
];

export default function RecentEvents() {
  return (
    <div className="space-y-4">
      {recentEvents.map((event) => (
        <div
          key={event.id}
          className="flex items-center p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{event.title}</h3>
            <div className="mt-1 space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {event.date}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                {event.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                {event.attendees} attendees
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}