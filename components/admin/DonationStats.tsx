'use client';

import { DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';

const stats = [
  {
    label: 'Total Donations',
    value: '$45,678',
    change: '+8.2%',
    changeType: 'increase',
    icon: DollarSign,
  },
  {
    label: 'Monthly Growth',
    value: '23%',
    change: '+4.6%',
    changeType: 'increase',
    icon: TrendingUp,
  },
  {
    label: 'Total Donors',
    value: '1,234',
    change: '+12.3%',
    changeType: 'increase',
    icon: Users,
  },
  {
    label: 'Recurring Donations',
    value: '456',
    change: '+2.4%',
    changeType: 'increase',
    icon: Calendar,
  },
];

export default function DonationStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-lg shadow"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-brand-teal/10 text-brand-teal">
                <Icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <span className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}