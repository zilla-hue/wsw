'use client';

import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { useSubmitForm } from '@/lib/firebase/hooks/useSubmitForm';
import { COLLECTIONS } from '@/lib/firebase/collections';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9+\s-]{10,}$/, 'Please enter a valid phone number'),
  location: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EventRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
  });

  const { submitForm, isLoading, error } = useSubmitForm({
    collectionName: COLLECTIONS.EVENT_REGISTRATIONS,
    schema: formSchema,
    onSuccess: () => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
      });
    },
    successMessage: 'Registration successful! Check your email for confirmation.',
    errorMessage: 'Registration failed. Please try again.'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
          className="mt-1 block w-full rounded-md bg-brand-dark/50 border border-brand-gold/20 
                     text-gray-200 px-3 py-2 focus:border-brand-gold focus:ring-brand-gold"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="mt-1 block w-full rounded-md bg-brand-dark/50 border border-brand-gold/20 
                     text-gray-200 px-3 py-2 focus:border-brand-gold focus:ring-brand-gold"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="mt-1 block w-full rounded-md bg-brand-dark/50 border border-brand-gold/20 
                     text-gray-200 px-3 py-2 focus:border-brand-gold focus:ring-brand-gold"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-200">
          Location
        </label>
      </div>
      <input
        type="text"
        id="location"
        value={formData.location}
        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
        className="mt-1 block w-full rounded-md bg-brand-dark/50 border border-brand-gold/20 
                   text-gray-200 px-3 py-2 focus:border-brand-gold focus:ring-brand-gold"
        disabled={isLoading}
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent 
                 rounded-md shadow-sm text-base font-medium text-black bg-brand-gold 
                 hover:bg-brand-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 
                 focus:ring-brand-gold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
            Submitting...
          </>
        ) : (
          'Register Now'
        )}
      </button>
    </form>
  );
} 