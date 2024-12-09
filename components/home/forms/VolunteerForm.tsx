'use client';

import { useState } from 'react';
import { useSubmitForm } from '@/lib/firebase/hooks/useSubmitForm';
import { volunteerSchema } from '@/lib/firebase/schemas';
import { COLLECTIONS } from '@/lib/firebase/collections';
import { Send } from 'lucide-react';

const teams = ['Hospitality', 'Security', 'Technical', 'Media'];

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    team: ''
  });

  const { submitForm, isLoading, error } = useSubmitForm({
    collectionName: COLLECTIONS.VOLUNTEER,
    schema: volunteerSchema,
    onSuccess: () => {
      setFormData({ name: '', email: '', phone: '', team: '' });
    },
    successMessage: 'Application submitted successfully! We will contact you soon.',
    errorMessage: 'Failed to submit application. Please try again.'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md bg-black/20 border border-brand-gold/20 text-white px-3 py-2"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="mt-1 block w-full rounded-md bg-black/20 border border-brand-gold/20 text-white px-3 py-2"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="mt-1 block w-full rounded-md bg-black/20 border border-brand-gold/20 text-white px-3 py-2"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="team" className="block text-sm font-medium text-gray-300">
          Preferred Team
        </label>
        <select
          id="team"
          value={formData.team}
          onChange={(e) => setFormData(prev => ({ ...prev, team: e.target.value }))}
          className="mt-1 block w-full rounded-md bg-black/20 border border-brand-gold/20 text-white px-3 py-2"
          required
          disabled={isLoading}
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
        className="w-full bg-brand-teal hover:bg-brand-teal-light text-white py-3 rounded-md font-semibold transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <Send className="w-5 h-5 mr-2" />
        {isLoading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}