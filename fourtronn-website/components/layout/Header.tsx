'use client';

import Link from 'next/link';
import { ShoppingCart, Globe, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useLanguageStore, Language } from '@/store/languageStore';
import { useState, useEffect } from 'react';

export default function Header() {
  const { items, getTotalItems } = useCartStore();
  const { language, setLanguage, t } = useLanguageStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = getTotalItems();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">
                {language === 'en' ? 'Fourtronn Energy Systems' : 'ஃபோர்ட்ரான் எனர்ஜி'}
              </h1>
              <p className="text-xs text-gray-600">
                {language === 'en' ? 'Salem' : 'சேலம்'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              {t('nav.home')}
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
              {t('nav.products')}
            </Link>
            <Link href="/service" className="text-gray-700 hover:text-blue-600 transition">
              {language === 'en' ? 'Service' : 'சேவை'}
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              {language === 'en' ? 'About Us' : 'எங்களைப் பற்றி'}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
              {language === 'en' ? 'Contact' : 'தொடர்பு'}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle Language"
            >
              <Globe className="w-5 h-5 text-gray-700" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {language === 'en' ? 'தமிழ்' : 'EN'}
              </span>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.products')}
              </Link>
              <Link
                href="/service"
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {language === 'en' ? 'Service' : 'சேவை'}
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
