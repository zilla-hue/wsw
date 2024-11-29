import { Metadata } from 'next';
import EventsTable from '@/components/admin/EventsTable';
import CreateEventButton from '@/components/admin/CreateEventButton';

export const metadata: Metadata = {
  title: 'Event Management | Admin Dashboard',
  description: 'Manage events and ticket sales',
};

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
        <CreateEventButton />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <EventsTable />
      </div>
    </div>
  );
}