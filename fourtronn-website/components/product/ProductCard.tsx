'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useLanguageStore } from '@/store/languageStore';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguageStore();
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    toast.success(
      language === 'en'
        ? 'Added to cart!'
        : 'வண்டியில் சேர்க்கப்பட்டது!',
      { duration: 2000 }
    );
  };

  const productName = language === 'en' ? product.name_en : product.name_ta;

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Image
          src={product.images[0]}
          alt={productName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              {t('product.outOfStock')}
            </span>
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {language === 'en' ? 'Featured' : 'சிறப்பு'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
          {productName}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">{t('product.price')}</p>
            <p className="text-2xl font-bold text-blue-600">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              product.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {product.inStock ? t('product.inStock') : t('product.outOfStock')}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition flex items-center justify-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>{language === 'en' ? 'View' : 'காண்க'}</span>
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{language === 'en' ? 'Add' : 'சேர்'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
