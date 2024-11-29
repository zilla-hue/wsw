import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | When Sinners Worship',
  description: 'View moments from our worship services, events, and community gatherings.',
};

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    alt: 'Night of Worship',
    caption: 'Night of Divine Encounter 2023'
  },
  {
    src: 'https://images.unsplash.com/photo-1470019693664-1d202d2c0907',
    alt: 'Gospel Concert',
    caption: 'Annual Gospel Concert'
  },
  {
    src: 'https://images.unsplash.com/photo-1508695666381-69deeaa78ccb',
    alt: 'Community Worship',
    caption: 'Community Worship Service'
  },
  {
    src: 'https://images.unsplash.com/photo-1493804714600-6edb1cd93080',
    alt: 'Prayer Session',
    caption: 'Morning Prayer Session'
  },
  {
    src: 'https://images.unsplash.com/photo-1519744346361-7a029b427a59',
    alt: 'Youth Service',
    caption: 'Youth Worship Night'
  },
  {
    src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
    alt: 'Choir Performance',
    caption: 'WSW Choir Performance'
  }
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-gold mb-4">Our Gallery</h1>
          <p className="text-gray-300 text-lg">Capturing moments of worship and fellowship</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-lg border border-brand-gold/20 hover:border-brand-gold/40 transition-colors"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}