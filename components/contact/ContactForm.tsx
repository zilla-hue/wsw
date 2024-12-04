'use client';

import { useState } from 'react';
import { useSubmitForm } from '@/lib/firebase/hooks/useSubmitForm';
import { contactSchema } from '@/lib/firebase/schemas';
import { COLLECTIONS } from '@/lib/firebase/collections';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { submitForm, isLoading, error } = useSubmitForm({
    collectionName: COLLECTIONS.CONTACT,
    schema: contactSchema,
    onSuccess: () => {
      setFormData({ name: '', email: '', message: '' });
    },
    successMessage: 'Message sent successfully! We will get back to you soon.',
    errorMessage: 'Failed to send message. Please try again.'
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
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md bg-black/20 border border-brand-gold/20 text-white px-3 py-2"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md bg-black/20 border border-brand-gold/20 text-white px-3 py-2"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          required
          rows={4}
          className="mt-1 block w-full rounded-md bg-black/20 border border-brand-gold/20 text-white px-3 py-2"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-brand-teal hover:bg-brand-teal-light text-white py-3 rounded-md font-semibold transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <Send className="w-5 h-5 mr-2" />
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}