'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSlide } from '@/types/hero';

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, slides.length]);

  useEffect(() => {
    const timer = setInterval(handleNextSlide, 5000);

    // Clear animation state if component unmounts during animation
    return () => {
      clearInterval(timer);
      setIsAnimating(false);
    };
  }, [handleNextSlide]);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const stompVariants = {
    initial: {
      scale: 1.1,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: [0.34, 1.56, 0.64, 1],
        times: [0, 0.35, 0.65, 0.85, 1],
        opacity: {
          duration: 1.5,
        }
      }
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] pt-16 pb-16">
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0 bg-black/30 z-[1]"></div>
            
            <div className="absolute inset-0 z-[2]">
              {slide.image && (
                <Image
                  src={slide.image}
                  alt={slide.alt || slide.title!}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  onError={(e) => {
                    console.error(`Failed to load image: ${slide.image}`);
                    // Optionally set a fallback image
                    // e.currentTarget.src = '/fallback-image.jpg';
                  }}
                />
              )}
              {slide.backgroundImage && !slide.image && (
                <Image
                  src={slide.backgroundImage}
                  alt={slide.alt || slide.title!}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  onError={(e) => {
                    console.error(`Failed to load background image: ${slide.backgroundImage}`);
                    // Optionally set a fallback image
                    // e.currentTarget.src = '/fallback-image.jpg';
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark" />
            </div>
            
            {slide.overlayImage && (
              <div 
                className="absolute inset-0 z-[3] w-full h-full"
                style={{
                  ...slide.overlayImage.styles,
                  position: slide.overlayImage.styles.position as 'relative' | 'absolute' | 'fixed' | 'static' | 'sticky'
                }}
              >
                <AnimatePresence mode="wait">
                  {currentSlide === index && (
                    <motion.div
                      className="absolute inset-0 w-full h-full"
                      initial="initial"
                      animate="animate"
                      variants={stompVariants}
                      key={`overlay-${index}`}
                    >
                      <Image
                        src={slide.overlayImage.src}
                        alt={slide.overlayImage.alt || "Slide overlay"}
                        fill
                        className="object-contain"
                        priority={index === 0}
                        onError={(e) => {
                          console.error(`Failed to load overlay image: ${slide.overlayImage?.src}`);
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center z-[4]">
              <div className={`max-w-xl transition-all duration-500 ${
                currentSlide === index ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}>
                <h2 className="text-4xl md:text-5xl font-bold text-brand-gold mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4 relative z-[5]">
                  {slide.primaryLink && (
                    <Link
                      href={slide.primaryLink}
                      className="bg-brand-gold text-brand-dark px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold/90 transition-colors"
                    >
                      {slide.primaryText}
                    </Link>
                  )}
                  {slide.secondaryLink && (
                    <Link
                      href={slide.secondaryLink}
                      className="bg-transparent border-2 border-brand-gold text-brand-gold px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold/10 transition-colors"
                    >
                      {slide.secondaryText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-[6]">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-brand-gold w-8'
                : 'bg-gray-400 hover:bg-brand-gold/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-[6]"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-[6]"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}