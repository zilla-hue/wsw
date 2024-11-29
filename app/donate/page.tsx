import DonationForm from '@/components/DonationForm';

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-brand-gold mb-6 text-center">Support Our Ministry</h1>
        <p className="text-gray-300 text-center mb-12 text-lg">
          Your generous donations help us continue our mission of transforming lives through worship.
        </p>
        <DonationForm />
      </div>
    </div>
  );
}