import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageGalleryModalProps {
  images: { id: number; image: string; alt: string; }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export default function ImageGalleryModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}: ImageGalleryModalProps) {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onNavigate('prev');
        break;
      case 'ArrowRight':
        onNavigate('next');
        break;
    }
  }, [isOpen, onClose, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 text-white hover:text-brand-gold transition-colors z-50"
          onClick={onClose}
        >
          <X className="w-8 h-8" />
        </button>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 p-2 text-white hover:text-brand-gold transition-colors z-50"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('prev');
          }}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          className="absolute right-4 p-2 text-white hover:text-brand-gold transition-colors z-50"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('next');
          }}
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Image Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full h-full max-w-7xl max-h-[90vh] m-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex].image}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}