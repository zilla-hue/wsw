import Logo from '@/components/shared/Logo';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-gold/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo className="h-12 mb-4" />
            <p className="text-gray-400">Email: info@whensinnersworship.org</p>
            {/* <p className="text-gray-400">Phone: (+234) 803-972-2204</p> */}
          </div>
          <div>
            <h3 className="text-brand-gold font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-brand-gold transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/events" className="text-gray-400 hover:text-brand-gold transition-colors">
                  Events
                </a>
              </li>
              {/* <li>
                <a href="/gallery" className="text-gray-400 hover:text-brand-gold transition-colors">
                  Gallery
                </a>
              </li> */}
              <li>
                <a href="/contact" className="text-gray-400 hover:text-brand-gold transition-colors">
                  Contact
                </a>
              </li>
              {/* <li>
                <a href="/donate" className="text-gray-400 hover:text-brand-gold transition-colors">
                  Donate
                </a>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-brand-gold font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://web.facebook.com/profile.php?id=61566942944526" className="text-gray-400 hover:text-brand-gold transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://www.instagram.com/when_sinners_worship/" className="text-gray-400 hover:text-brand-gold transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.youtube.com/@WhenSinnersWorship" className="text-gray-400 hover:text-brand-gold transition-colors">
                <Youtube size={24} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-brand-gold/20 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} When Sinners Worship. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}