import { Metadata } from 'next';
import VolunteerForm from '@/components/home/forms/VolunteerForm';

export const metadata: Metadata = {
  title: 'Volunteer | When Sinners Worship',
  description: 'Join our volunteer team and be part of transforming lives through worship.',
};

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-brand-gold mb-6 text-center">
          Join Our Volunteer Team
        </h1>
        <p className="text-gray-300 text-center mb-12 text-lg">
          Use your gifts and talents to serve others in our ministry
        </p>
        <VolunteerForm />
      </div>
    </div>
  );
}