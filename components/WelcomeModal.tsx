'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenModal) {
      setIsOpen(true);
      localStorage.setItem('hasSeenWelcomeModal', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRegister = () => {
    setIsOpen(false);
    router.push('/register');
  };

  const handleVolunteer = () => {
    setIsOpen(false);
    router.push('/volunteer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="relative bg-brand-dark max-w-lg w-full rounded-lg shadow-xl border border-brand-gold/20">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <div className="relative aspect-[16/9] mb-6">
            <Image
              src="/images/welcome-modal.jpeg"
              alt="Event Flyer"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <h2 className="text-2xl font-bold text-brand-gold mb-4">
            Join Us for a Night of Divine Encounter
          </h2>

          <p className="text-gray-300 mb-8">
            Experience an unforgettable night of worship and transformation. 
            Be part of this life-changing event by registering now or joining our volunteer team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRegister}
              className="flex-1 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Register for Event
            </button>
            <button
              onClick={handleVolunteer}
              className="flex-1 border border-brand-gold text-brand-gold hover:bg-brand-gold/10 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}