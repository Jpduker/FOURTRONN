'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Battery, Sun, Droplets, CheckCircle, TrendingUp, Users, Package } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';
import { categories, dummyProducts } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function HomePage() {
  const { language, t } = useLanguageStore();
  const featuredProducts = dummyProducts.filter((p) => p.featured).slice(0, 4);

  const getCategoryIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Zap,
      Battery,
      Sun,
      Droplets,
    };
    return icons[iconName];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {language === 'en' 
                  ? 'Power Your Life with Fourtronn Energy Systems'
                  : 'ஃபோர்ட்ரான் எனர்ஜி சிஸ்டம்ஸுடன் உங்கள் வாழ்க்கையை சக்தியாக்குங்கள்'
                }
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                {language === 'en'
                  ? 'Salem\'s Most Trusted Energy Solutions Provider Since 1996 - Fourtronn UPS, PRIYA Batteries, Fourtronn Solar & Water Purifiers'
                  : '1996 முதல் சேலத்தின் மிகவும் நம்பகமான ஆற்றல் தீர்வுகள் வழங்குநர் - ஃபோர்ட்ரான் UPS, பிரியா பேட்டரிகள், ஃபோர்ட்ரான் சோலார் மற்றும் நீர் சுத்திகரிப்பு'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {t('shopNow')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/service"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  {t('serviceBooking')}
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 absolute"></div>
                <div className="relative z-10 grid grid-cols-2 gap-4 p-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
                    <Battery className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">UPS Systems</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
                    <Zap className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Batteries</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
                    <Sun className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Solar</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
                    <Droplets className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Water Purifiers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('whyChooseUs')}
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              {t('whyChooseUsSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('qualityProducts')}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {t('qualityProductsDesc')}
              </p>
            </div>
            <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('expertSupport')}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {t('expertSupportDesc')}
              </p>
            </div>
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('trustedBusiness')}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {t('trustedBusinessDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('categories')}
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              {t('browseCategories')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category.icon);
              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center overflow-hidden hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <IconComponent className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {language === 'en' ? category.name_en : category.name_ta}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {language === 'en' ? category.description_en : category.description_ta}
                    </p>
                    <span className="inline-flex items-center text-blue-600 font-semibold text-lg group-hover:text-blue-700">
                      {t('shopNow')}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('featuredProducts')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('discoverBest')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('viewAllProducts')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Package className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t('needMaintenance')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('maintenanceSubtitle')}
            </p>
            <Link
              href="/service"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('bookService')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
