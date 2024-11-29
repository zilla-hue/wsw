'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

const teams = ['Hospitality', 'Security', 'Technical', 'Media'];

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    team: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Volunteer form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="team" className="block text-sm font-medium text-gray-300 mb-2">
          Preferred Team
        </label>
        <select
          id="team"
          value={formData.team}
          onChange={(e) => setFormData({ ...formData, team: e.target.value })}
          className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
          required
        >
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-brand-teal hover:bg-brand-teal-light text-white py-3 rounded-md font-semibold transition-colors flex items-center justify-center"
      >
        <Send className="w-5 h-5 mr-2" />
        Submit Application
      </button>
    </form>
  );
}