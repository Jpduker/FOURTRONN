'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart, Check, Zap, Shield, Award, Truck } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';
import { useCartStore } from '@/store/cartStore';
import { dummyProducts } from '@/data/products';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguageStore();
  const { addItem } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = dummyProducts.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Product Not Found' : 'தயாரிப்பு காணப்படவில்லை'}
          </h1>
          <button
            onClick={() => router.push('/products')}
            className="text-blue-600 hover:underline flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Products' : 'தயாரிப்புகளுக்கு திரும்பு'}
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(
      language === 'en'
        ? `${quantity} item(s) added to cart!`
        : `${quantity} பொருள்(கள்) கார்ட்டில் சேர்க்கப்பட்டது!`,
      { duration: 3000 }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {language === 'en' ? 'Back' : 'திரும்பு'}
        </button>

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-lg p-8">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={language === 'en' ? product.name_en : product.name_ta}
                fill
                className="object-contain p-4"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.inStock ? (
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-4">
                <Check className="w-4 h-4 mr-1" />
                {language === 'en' ? 'In Stock' : 'இருப்பில் உள்ளது'}
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full mb-4">
                {language === 'en' ? 'Out of Stock' : 'கையிருப்பு இல்லை'}
              </span>
            )}

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? product.name_en : product.name_ta}
            </h1>

            <div className="text-3xl font-bold text-blue-600 mb-6">
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {language === 'en' ? product.description_en : product.description_ta}
            </p>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Specifications' : 'விவரக்குறிப்புகள்'}
              </h2>
              <dl className="space-y-3">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="font-semibold text-gray-900">
                      {language === 'en' ? spec.key_en : spec.key_ta}
                    </dt>
                    <dd className="text-gray-700">
                      {language === 'en' ? spec.value_en : spec.value_ta}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {language === 'en' ? 'Warranty' : 'உத்தரவாதம்'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Manufacturer warranty' : 'உற்பத்தியாளர் உத்தரவாதம்'}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {language === 'en' ? 'Genuine' : 'உண்மையான'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? '100% original' : '100% அசல்'}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {language === 'en' ? 'Installation' : 'நிறுவல்'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Free installation' : 'இலவச நிறுவல்'}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {language === 'en' ? 'Support' : 'ஆதரவு'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? '24/7 customer care' : '24/7 வாடிக்கையாளர் பராமரிப்பு'}
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100 transition"
                >
                  −
                </button>
                <span className="px-6 py-3 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{language === 'en' ? 'Add to Cart' : 'கூடையில் சேர்'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
