'use client';

import { useState } from 'react';

type DonationType = 'one-time' | 'monthly' | 'quarterly' | 'annually';

export default function DonationForm() {
  const [amount, setAmount] = useState('');
  const [donationType, setDonationType] = useState<DonationType>('one-time');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with payment processor
    console.log('Processing donation:', {
      amount,
      donationType,
      name,
      email,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-dark/50 p-8 rounded-lg border border-brand-gold/20">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-brand-gold mb-4">Donation Amount</h3>
        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 rounded-md bg-black/20 border border-brand-gold/20 text-white"
            min="1"
            required
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-brand-gold mb-4">Donation Frequency</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['one-time', 'monthly', 'quarterly', 'annually'] as DonationType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setDonationType(type)}
              className={`p-3 rounded-md border ${
                donationType === type
                  ? 'bg-brand-teal text-white border-brand-teal'
                  : 'border-brand-gold/20 text-gray-300 hover:border-brand-gold/40'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-brand-gold mb-4">Your Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-md bg-black/20 border border-brand-gold/20 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md bg-black/20 border border-brand-gold/20 text-white"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-brand-teal hover:bg-brand-teal-light text-white py-4 rounded-md font-semibold transition-colors"
      >
        Complete Donation
      </button>

      <p className="mt-4 text-sm text-gray-400 text-center">
        Your donation is secure and encrypted. You will receive a confirmation email for your records.
      </p>
    </form>
  );
}