import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact Us | When Sinners Worship',
  description: 'Get in touch with When Sinners Worship ministry for inquiries, prayer requests, or general information.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-gold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">We&apos;d love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-brand-dark/50 p-8 rounded-lg border border-brand-gold/20">
            <h2 className="text-2xl font-semibold text-brand-gold mb-6">Send us a Message</h2>
            <ContactForm />
          </div>

          <div className="bg-brand-dark/50 p-8 rounded-lg border border-brand-gold/20">
            <h2 className="text-2xl font-semibold text-brand-gold mb-6">Get in Touch</h2>
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}