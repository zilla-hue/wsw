"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { Search } from 'lucide-react';
import { useTableData } from '@/lib/firebase/hooks/useTableData';
import TableSkeleton from './TableSkeleton';
import TableError from './TableError';
import ExportButton from '../ExportButton';

interface Registration {
  id: string;
  email: string;
  fullName: string
  location: string;
  phone: string
  timestamp: any;
}

export default function RegistrationsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useTableData<Registration>({
    collectionName: 'eventRegistrations'
  });
  console.log("Fetched data:", data);  // Log to check data received

  const filteredData = data.filter(registration =>
    registration.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    registration.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('Filtered data:', data);

  const exportHeaders = ['id', 'fullName', 'email', 'location', 'phone', 'timestamp'];

  if (isLoading) return <TableSkeleton />;
  if (error) return <TableError message={error} />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search registrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <ExportButton
          collectionName="eventRegistrations"
          filename="registrations"
          headers={exportHeaders}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-500">
  {filteredData.length > 0 ? (
    filteredData.map((registration) => (
      <tr key={registration.id}>
        <td>{registration.fullName}</td>
        <td>{registration.email}</td>
        <td>{registration.location}</td>
        <td>{registration.phone}</td>
        <td>{registration.timestamp ? format(registration.timestamp.toDate(), 'MMM d, yyyy h:mm a') : "N/A"}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5} className="text-center text-gray-500 py-4">
        No registrations found.
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>
    </div>
  );
}