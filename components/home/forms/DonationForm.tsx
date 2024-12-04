'use client';

import { useState } from 'react';
import { useSubmitForm } from '@/lib/firebase/hooks/useSubmitForm';
import { COLLECTIONS } from '@/lib/firebase/collections';
import { z } from 'zod';

const donationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  amount: z.number().min(1, 'Minimum donation amount is $1'),
  donationType: z.enum(['One-time', 'Monthly', 'Quarterly', 'Annually']),
  message: z.string().optional(),
});

export default function DonationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { submitForm, error } = useSubmitForm({
    collectionName: COLLECTIONS.DONATIONS,
    schema: donationSchema,
    successMessage: 'Thank you for your donation!',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      amount: Number(formData.get('amount')),
      donationType: formData.get('donationType') as string,
      message: formData.get('message') as string,
    };

    await submitForm(data);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
          required
          disabled={isLoading}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
          required
          disabled={isLoading}
        />

        <input
          type="number"
          name="amount"
          placeholder="Donation Amount"
          min="1"
          className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
          required
          disabled={isLoading}
        />

        <select
          name="donationType"
          className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
          required
          disabled={isLoading}
        >
          <option value="">Select Donation Type</option>
          <option value="One-time">One-time</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Annually">Annually</option>
        </select>

        <textarea
          name="message"
          placeholder="Message (Optional)"
          className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-gold hover:bg-brand-gold/90 text-black font-semibold py-3 rounded-md transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Submit Donation'}
      </button>
    </form>
  );
}