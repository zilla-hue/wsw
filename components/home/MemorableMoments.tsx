'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ImageGalleryModal from './ImageGalleryModal';
import { Loader2, Play } from 'lucide-react';

// Import all images
const concertMoments = Array.from({ length: 36 }, (_, i) => {
  // Using dynamic import for images
  const imageNumber = i + 1;
  return {
    id: imageNumber,
    // Adjust the path according to your actual image location
    image: `/images/concert-${imageNumber}.JPG`,
    alt: `Concert Moment ${imageNumber}`,
  };
});

// Add video data structure
const videoMoments = [
  {
    id: 1,
    videoId: 'p2Or6eUkzcw',
    title: 'Peter Okopi\'s WSW Lokoja performance'
  },

  {
    id: 2,
    videoId: '4ze3WKKuRf0?si',
    title: 'Mag Psalm\'s WSW Lokoja performance'
  },

  {
    id: 3,
    videoId: 'mRBfQ9LVoNA?si',
    title: 'WSW Lokoja'
  },

  {
    id: 4,
    videoId: '5bCv3gdCBpA?si',
    title: 'Interview session with Abraham Peters for When Sinners Worship'
  }

];


const galleryVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function MemorableMoments() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Add this state for fallback thumbnails
  const [thumbnailError, setThumbnailError] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    setSelectedImageIndex((current) => {
      if (direction === 'prev') {
        return current === 0 ? concertMoments.length - 1 : current - 1;
      }
      return current === concertMoments.length - 1 ? 0 : current + 1;
    });
  };

  const handleVideoClick = (index: number) => {
    setSelectedVideoIndex(index);
    setIsVideoModalOpen(true);
  };

  return (
    <section className="py-16 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-brand-gold text-center mb-12">
          MEMORABLE MOMENTS FROM WSW
        </h2>

        {/* Video Banner */}
        <div className="relative h-[400px] mb-12 rounded-lg overflow-hidden group">
          {/* Thumbnail Image */}
          <div className="absolute inset-0 z-10">
            <Image
              src="/images/wsw-lokoja-moments.jpg"
              alt={videoMoments[selectedVideoIndex]?.title || "WSW Lokoja Performance Video"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-brand-gold rounded-full p-4">
                <Play className="w-12 h-12 text-black" />
              </div>
            </div>

            {/* Title Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
              <p className="text-white text-xl font-medium">
                {videoMoments[0].title}
              </p>
            </div>
          </div>

          {/* Click Handler */}
          <div 
            className="absolute inset-0 z-20 cursor-pointer"
            onClick={() => handleVideoClick(0)}
          />
        </div>

        {/* Grid Gallery */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={galleryVariants}
        >
          {concertMoments.map((moment, index) => (
            <motion.div
              key={moment.id}
              variants={imageVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={moment.image}
                alt={moment.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                quality={75}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ImageGalleryModal
        images={concertMoments}
        currentIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Updated Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 pointer-events-auto">
          <div className="relative w-full max-w-6xl mx-4">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-brand-gold z-50 flex items-center gap-2 transition-colors duration-200"
            >
              <span className="text-lg font-medium">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative pt-[56.25%]">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
                </div>
              )}
              <iframe
                src={`https://www.youtube.com/embed/${videoMoments[selectedVideoIndex].videoId}?autoplay=1`}
                title={videoMoments[selectedVideoIndex].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-lg"
                onLoad={() => setIsLoading(false)}
              />
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-50">
              <button
                onClick={() => setSelectedVideoIndex(prev => 
                  prev === 0 ? videoMoments.length - 1 : prev - 1
                )}
                className="bg-brand-gold hover:bg-brand-gold/80 rounded-full p-3 text-black transition-all duration-200 transform hover:scale-105"
                aria-label="Previous video"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
              </button>
              <button
                onClick={() => setSelectedVideoIndex(prev => 
                  prev === videoMoments.length - 1 ? 0 : prev + 1
                )}
                className="bg-brand-gold hover:bg-brand-gold/80 rounded-full p-3 text-black transition-all duration-200 transform hover:scale-105"
                aria-label="Next video"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}