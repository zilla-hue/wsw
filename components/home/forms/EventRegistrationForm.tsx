'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9+\s-]{10,}$/, 'Please enter a valid phone number'),
  sessionTime: z.enum(['morning', 'afternoon', 'evening'], {
    required_error: 'Please select a session time',
  }),
});

type FormData = z.infer<typeof formSchema>;

const sessionTimes = [
  { value: 'morning', label: 'Morning (9:00 AM - 12:00 PM)' },
  { value: 'afternoon', label: 'Afternoon (2:00 PM - 5:00 PM)' },
  { value: 'evening', label: 'Evening (6:00 PM - 9:00 PM)' },
];

export default function EventRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Replace with your actual API endpoint
      await fetch('/api/register-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">
          Full Name
        </label>
        <input
          {...register('fullName')}
          type="text"
          id="fullName"
          className="mt-1 block w-full rounded-md bg-brand-dark/50 border border-brand-gold/20 
                     text-gray-200 px-3 py-2 focus:border-brand-gold focus:ring-brand-gold"
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-1 text-sm text-red-500">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="mt-1 block w-full rounded-md bg-brand-dark/50 border border-brand-gold/20 
                     text-gray-200 px-3 py-2 focus:border-brand-gold focus:ring-brand-gold"
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
          Phone Number
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          className="mt-1 block w-full rounded-md bg-brand-dark/50 border border-brand-gold/20 
                     text-gray-200 px-3 py-2 focus:border-brand-gold focus:ring-brand-gold"
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="sessionTime" className="block text-sm font-medium text-gray-200">
          Preferred Session Time
        </label>
        <select
          {...register('sessionTime')}
          id="sessionTime"
          className="mt-1 block w-full rounded-md bg-brand-dark/50 border border-brand-gold/20 
                     text-gray-200 px-3 py-2 focus:border-brand-gold focus:ring-brand-gold"
          aria-describedby={errors.sessionTime ? 'sessionTime-error' : undefined}
        >
          <option value="">Select a session time</option>
          {sessionTimes.map((session) => (
            <option key={session.value} value={session.value}>
              {session.label}
            </option>
          ))}
        </select>
        {errors.sessionTime && (
          <p id="sessionTime-error" className="mt-1 text-sm text-red-500">
            {errors.sessionTime.message}
          </p>
        )}
      </div>

      {submitStatus === 'success' && (
        <div className="p-3 bg-green-500/20 border border-green-500 rounded-md text-green-200">
          Registration submitted successfully! We&apos;ll be in touch soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200">
          There was an error submitting your registration. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent 
                 rounded-md shadow-sm text-base font-medium text-black bg-brand-gold 
                 hover:bg-brand-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 
                 focus:ring-brand-gold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
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