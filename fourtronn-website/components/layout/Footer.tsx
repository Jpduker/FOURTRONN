'use client';

import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';

export default function Footer() {
  const { language, t } = useLanguageStore();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.about')}</h3>
            <p className="text-gray-400 text-sm">
              {language === 'en'
                ? 'Leading provider of UPS, Batteries, Solar Solutions & Water Purifiers in Salem. Serving customers across India with quality products and excellent service.'
                : 'சேலத்தில் UPS, பேட்டரிகள், சூரிய தீர்வுகள் மற்றும் நீர் சுத்திகரிப்பு அமைப்புகளின் முன்னணி வழங்குநர். தரமான தயாரிப்புகள் மற்றும் சிறந்த சேவையுடன் இந்தியா முழுவதும் வாடிக்கையாளர்களுக்கு சேவை செய்கிறோம்.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  {language === 'en' ? 'Salem, Tamil Nadu, India' : 'சேலம், தமிழ்நாடு, இந்தியா'}
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+919047223355" className="text-gray-400 hover:text-white transition">
                  +91 90472 23355
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href="mailto:leninups@gmail.com"
                  className="text-gray-400 hover:text-white transition"
                >
                  leninups@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.followUs')}</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100065163482312"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/fourtronn_energy_system/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Fourtronn Energy Systems. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
