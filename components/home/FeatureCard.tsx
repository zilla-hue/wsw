import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  backgroundImage: string;
}

export function FeatureCard({ icon: Icon, title, description, backgroundImage }: FeatureCardProps) {
  return (
    <div 
      className="text-center p-6 rounded-lg border border-brand-gold/20 relative overflow-hidden group"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-dark/80 group-hover:bg-brand-dark/70 transition-colors duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <Icon className="w-8 h-8 text-brand-gold mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-brand-gold mb-4">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
} 