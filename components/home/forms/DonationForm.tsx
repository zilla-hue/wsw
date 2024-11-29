'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const donationTypes = ['One-time', 'Monthly', 'Quarterly', 'Annually'];
const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

export default function DonationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    amount: '',
    customAmount: '',
    donationType: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      // Validate amount
      const amount = formData.customAmount || formData.amount;
      if (!amount) {
        throw new Error('Please select or enter a donation amount');
      }

      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          donationType: formData.donationType,
          customAmount: formData.customAmount ? parseFloat(formData.customAmount) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">
          {error}
        </div>
      )}

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
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Amount
        </label>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {suggestedAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setFormData({ ...formData, amount: amount.toString(), customAmount: '' })}
              className={`p-4 rounded-md border transition-colors ${
                formData.amount === amount.toString()
                  ? 'bg-brand-teal text-white border-brand-teal'
                  : 'border-brand-gold/20 text-gray-300 hover:border-brand-gold/40'
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>
        <div>
          <label htmlFor="customAmount" className="block text-sm font-medium text-gray-300 mb-2">
            Custom Amount
          </label>
          <input
            type="number"
            id="customAmount"
            min="1"
            step="0.01"
            value={formData.customAmount}
            onChange={(e) => setFormData({ ...formData, amount: '', customAmount: e.target.value })}
            className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
            placeholder="Enter custom amount"
          />
        </div>
      </div>

      <div>
        <label htmlFor="donationType" className="block text-sm font-medium text-gray-300 mb-2">
          Donation Frequency
        </label>
        <select
          id="donationType"
          value={formData.donationType}
          onChange={(e) => setFormData({ ...formData, donationType: e.target.value })}
          className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
          required
        >
          <option value="">Select frequency</option>
          {donationTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message (Optional)
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 bg-black/20 border border-brand-gold/20 rounded-md text-white"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-teal hover:bg-brand-teal-light text-white py-3 rounded-md font-semibold transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5 mr-2" />
        {isLoading ? 'Processing...' : 'Complete Donation'}
      </button>

      <p className="text-sm text-gray-400 text-center">
        Secure payment powered by Stripe
      </p>
    </form>
  );
}