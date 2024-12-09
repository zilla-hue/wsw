import { Metadata } from 'next';
import RegistrationForm from '@/components/home/forms/EventRegistrationForm';

export const metadata: Metadata = {
  title: 'Register | When Sinners Worship',
  description: 'Register for our upcoming events and be part of the worship experience.',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-brand-gold mb-6 text-center">
          Event Registration
        </h1>
        <p className="text-gray-300 text-center mb-12 text-lg">
          Secure your spot for our upcoming night of worship and transformation
        </p>
        <RegistrationForm />
      </div>
    </div>
  );
}