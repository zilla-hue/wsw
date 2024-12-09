'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleImageClick = () => {
    setIsOpen(false);
    router.push('/register');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="relative bg-brand-dark max-w-4xl w-full rounded-lg shadow-2xl border border-brand-gold/20">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 pb-0">
          <div 
            onClick={handleImageClick}
            className="relative w-full aspect-video cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Image
              src="/images/welcome-modal.jpeg"
              alt="Click to Register"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}