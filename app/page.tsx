import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Music, Users, Heart } from 'lucide-react';
import HeroSlider from '@/components/hero/HeroSlider';
import { heroSlides } from '@/data/heroSlides';
import CountdownTimer from '@/components/CountdownTimer';
import ShareExperience from '@/components/home/ShareExperience';
import MemorableMoments from '@/components/home/MemorableMoments';
import { FeatureCard } from '@/components/home/FeatureCard';

const features = [
  {
    icon: Calendar,
    title: "Night Vigils",
    description: "Experience powerful nights of worship and prayer.",
    backgroundImage: "/images/night-vigil.jpg"
  },
  {
    icon: Music,
    title: "Gospel Concerts",
    description: "Join us for uplifting musical celebrations.",
    backgroundImage: "/images/gospel-concert.jpg"
  },
  {
    icon: Users,
    title: "Community",
    description: "Be part of our growing family of believers.",
    backgroundImage: "/images/community.jpg"
  },
  {
    icon: Heart,
    title: "Outreach",
    description: "Serving our community with love and compassion.",
    backgroundImage: "/images/outreach.JPG"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

       {/* Countdown Timer */}
       <CountdownTimer 
        targetDate={new Date('2024-12-13T18:00:00')} 
        eventName="Abuja Reckoning"
      />


      {/* Memorable Moments */}
      <MemorableMoments />

      {/* Share Experience */}
      <ShareExperience />


      {/* Ministry Section */}
      <section className="py-16 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-gold text-center mb-12">
            Our Ministry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                backgroundImage={feature.backgroundImage}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="py-16 bg-brand-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Experience the power of worship and be part of our growing family
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-brand-teal px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/events"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}