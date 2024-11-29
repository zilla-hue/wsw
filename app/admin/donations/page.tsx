import { Metadata } from 'next';
import DonationsTable from '@/components/admin/DonationsTable';
import DonationStats from '@/components/admin/DonationStats';

export const metadata: Metadata = {
  title: 'Donation Management | Admin Dashboard',
  description: 'Track and manage donations',
};

export default function DonationsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Donation Management</h1>
      
      <DonationStats />
      
      <div className="bg-white p-6 rounded-lg shadow">
        <DonationsTable />
      </div>
    </div>
  );
}