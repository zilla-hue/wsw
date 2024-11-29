import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <Mail className="w-6 h-6 text-brand-gold flex-shrink-0" />
        <div>
          <h3 className="text-lg font-medium text-brand-gold">Email</h3>
          <p className="text-gray-300">info@whensinnersworship.org</p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <Phone className="w-6 h-6 text-brand-gold flex-shrink-0" />
        <div>
          <h3 className="text-lg font-medium text-brand-gold">Phone</h3>
          <p className="text-gray-300">(+234) 803-972-2204</p>
        
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <MapPin className="w-6 h-6 text-brand-gold flex-shrink-0" />
        <div>
          <h3 className="text-lg font-medium text-brand-gold">Location</h3>
          <p className="text-gray-300">The Purple Place, Abuja,</p>
          <p className="text-gray-300"> Federal Capital Territory, 900110, Nigeria</p>
        </div>
      </div>
    </div>
  );
}