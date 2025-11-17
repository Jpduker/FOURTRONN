'use client';

import { useState } from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { categories, dummyProducts } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function ProductsPage() {
  const { language, t } = useLanguageStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? dummyProducts
      : dummyProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Our Products' : 'எங்கள் தயாரிப்புகள்'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Explore our complete range of Fourtronn UPS, PRIYA Batteries, Prakash Solar Solutions, and Nishanth Water Purifiers'
              : 'ஃபோர்ட்ரான் UPS, பிரியா பேட்டரிகள், பிரகாஷ் சூரிய தீர்வுகள் மற்றும் நிஷாந்த் நீர் சுத்திகரிப்பு அமைப்புகளின் முழுமையான வரம்பை ஆராயுங்கள்'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {language === 'en' ? 'All Products' : 'அனைத்து தயாரிப்புகள்'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {language === 'en' ? cat.name_en : cat.name_ta}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === 'en'
                ? 'No products found in this category.'
                : 'இந்த வகையில் தயாரிப்புகள் இல்லை.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
