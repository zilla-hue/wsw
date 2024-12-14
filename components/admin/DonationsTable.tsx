'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Search, Download } from 'lucide-react';
import ExportButton from './ExportButton';

interface Donation {
  id: string;
  donor: string;
  email: string;
  amount: number;
  type: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const donations: Donation[] = [
  {
    id: '1',
    donor: 'John Smith',
    email: 'john@example.com',
    amount: 500,
    type: 'One-time',
    date: '2024-01-15T10:30:00Z',
    status: 'completed',
  },
  {
    id: '2',
    donor: 'Sarah Johnson',
    email: 'sarah@example.com',
    amount: 100,
    type: 'Monthly',
    date: '2024-01-14T15:45:00Z',
    status: 'completed',
  },
  // Add more donations as needed
];

export default function DonationsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Donation>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const exportHeaders = [
    'id',
    'donor',
    'email',
    'amount',
    'type',
    'date',
    'status',
  ];
  
  const handleSort = (field: keyof Donation) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredDonations = donations
    .filter(donation =>
      donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  // const exportData = () => {
  //   // TODO: Implement CSV export
  //   console.log('Exporting data...');
  // };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <ExportButton
          collectionName="donations"
          filename="donations"
          headers={exportHeaders}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('donor')}
              >
                Donor
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                Amount
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('type')}
              >
                Type
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Date
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDonations.map((donation) => (
              <tr key={donation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {donation.donor}
                  </div>
                  <div className="text-sm text-gray-500">{donation.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${donation.amount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{donation.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(donation.date), 'MMM d, yyyy h:mm a')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${donation.status === 'completed' ? 'bg-green-100 text-green-800' :
                      donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}
                  >
                    {donation.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}