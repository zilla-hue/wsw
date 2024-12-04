'use client';

import { motion } from 'framer-motion';
import { FeatureCard } from '@/components/home/FeatureCard';
import { LucideIcon } from 'lucide-react';

interface MinistrySectionProps {
  features: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
    backgroundImage: string;
    alt: string;
  }>;
}

export default function MinistrySection({ features }: MinistrySectionProps) {
  return (
    <motion.section 
      className="py-16 bg-brand-dark"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-gold text-center mb-12">
            OUR MINISTRY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                backgroundImage={feature.backgroundImage}
                alt={feature.alt}
              />
            ))}
          </div>
        </div>
    </motion.section>
  );
} 