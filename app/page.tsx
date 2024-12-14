'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Music, Users, Heart } from 'lucide-react';
import HeroSlider from '@/components/hero/HeroSlider';
import { heroSlides } from '@/data/heroSlides';
import CountdownTimer from '@/components/CountdownTimer';
import ShareExperience from '@/components/home/ShareExperience';
import MemorableMoments from '@/components/home/MemorableMoments';
// import { FeatureCard } from '@/components/home/FeatureCard';
import MinistrySection from '@/components/home/MinistrySection';
import CTASection from '@/components/home/CTASection';
import VideoSection from '@/components/home/VideoSection';

const features = [
  {
    icon: Calendar,
    title: "Night Vigils",
    description: "Experience powerful nights of worship and prayer.",
    backgroundImage: "/images/night-vigil.jpg",
    alt: "Night vigil worship service"
  },
  {
    icon: Music,
    title: "Gospel Concerts",
    description: "Join us for uplifting musical celebrations.",
    backgroundImage: "/images/gospel-concert.JPG",
    alt: "Gospel concert performance"
  },
  {
    icon: Users,
    title: "Community",
    description: "Be part of our growing family of believers.",
    backgroundImage: "/images/community.JPG",
    alt: "Community gathering"
  },
  {
    icon: Heart,
    title: "Outreach",
    description: "Serving our community with love and compassion.",
    backgroundImage: "/images/outreach.JPG",
    alt: "Community outreach program"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

       {/* Countdown Timer */}
       <CountdownTimer 
        targetDate={new Date('2024-12-13T19:00:00')} 
        eventName="ABUJA RECKONING"
      />

      {/* Add the VideoSection here */}
      <VideoSection />

      {/* Memorable Moments */}
      <MemorableMoments />

      {/* Share Experience */}
      <ShareExperience />


      {/* Ministry Section */}
      <MinistrySection features={features} />


      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
}