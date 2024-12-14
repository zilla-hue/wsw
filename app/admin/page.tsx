import { Metadata } from 'next';
import DashboardStats from '@/components/admin/DashboardStats';
import DonationChart from '@/components/admin/DonationChart';
import RecentEvents from '@/components/admin/RecentEvents';
import RecentDonations from '@/components/admin/RecentDonations';
import RegistrationsTable from '@/components/admin/tables/RegistrationTable';
import VolunteersTable from '@/components/admin/tables/VolunteerTable';

export const metadata: Metadata = {
  title: 'Admin Dashboard | When Sinners Worship',
  description: 'Admin dashboard for managing events and donations',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Donation Trends</h2>
          <DonationChart />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
          <RecentEvents />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
        <RecentDonations />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Registrations</h2>
        <RegistrationsTable />
     </div>

     <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Volunteers</h2>
        <VolunteersTable />
     </div>
    </div>
  );
}