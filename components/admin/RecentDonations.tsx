'use client';

import { format } from 'date-fns';

const recentDonations = [
  {
    id: '1',
    donor: 'John Smith',
    amount: 500,
    type: 'One-time',
    date: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    donor: 'Sarah Johnson',
    amount: 100,
    type: 'Monthly',
    date: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    donor: 'Michael Chen',
    amount: 250,
    type: 'One-time',
    date: '2024-01-14T09:15:00Z',
  },
  {
    id: '4',
    donor: 'Rachel Thompson',
    amount: 75,
    type: 'Monthly',
    date: '2024-01-13T16:20:00Z',
  },
];

export default function RecentDonations() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Donor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recentDonations.map((donation) => (
            <tr key={donation.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {donation.donor}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${donation.amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {donation.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(donation.date), 'MMM d, yyyy h:mm a')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}