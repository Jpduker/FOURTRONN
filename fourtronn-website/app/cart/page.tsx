'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error(
        language === 'en' ? 'Your cart is empty!' : 'உங்கள் கார்ட் காலியாக உள்ளது!'
      );
      return;
    }

    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      router.push('/order');
      setIsProcessing(false);
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Your Cart is Empty' : 'உங்கள் கார்ட் காலியாக உள்ளது'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {language === 'en'
                ? 'Add some products to get started!'
                : 'தொடங்க சில தயாரிப்புகளைச் சேர்க்கவும்!'}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              {language === 'en' ? 'Browse Products' : 'தயாரிப்புகளை உலாவவும்'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {language === 'en' ? 'Shopping Cart' : 'வாங்கும் கார்ட்'}
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-6"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={language === 'en' ? item.product.name_en : item.product.name_ta}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {language === 'en' ? item.product.name_en : item.product.name_ta}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {language === 'en'
                        ? item.product.description_en.substring(0, 60) + '...'
                        : item.product.description_ta.substring(0, 60) + '...'}
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        removeItem(item.product.id);
                        toast.success(
                          language === 'en'
                            ? 'Item removed from cart'
                            : 'பொருள் கார்ட்டில் இருந்து அகற்றப்பட்டது'
                        );
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  clearCart();
                  toast.success(
                    language === 'en' ? 'Cart cleared' : 'கார்ட் அழிக்கப்பட்டது'
                  );
                }}
                className="text-red-600 hover:text-red-700 font-medium flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Clear Cart' : 'கார்ட்டை அழி'}
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'en' ? 'Order Summary' : 'ஆர்டர் சுருக்கம்'}
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>{language === 'en' ? 'Subtotal' : 'துணை மொத்தம்'}</span>
                    <span className="font-semibold">
                      ₹{getTotalPrice().toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>{language === 'en' ? 'Shipping' : 'கப்பல்'}</span>
                    <span className="font-semibold text-green-600">
                      {language === 'en' ? 'FREE' : 'இலவசம்'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>{language === 'en' ? 'Tax (18% GST)' : 'வரி (18% GST)'}</span>
                    <span className="font-semibold">
                      ₹{Math.round(getTotalPrice() * 0.18).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>{language === 'en' ? 'Total' : 'மொத்தம்'}</span>
                      <span className="text-blue-600">
                        ₹{Math.round(getTotalPrice() * 1.18).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{language === 'en' ? 'Processing...' : 'செயலாக்கம்...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{language === 'en' ? 'Proceed to Checkout' : 'செக்அவுட்டுக்கு செல்'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <Link
                  href="/products"
                  className="block text-center text-blue-600 hover:underline mt-4"
                >
                  {language === 'en' ? 'Continue Shopping' : 'ஷாப்பிங்கைத் தொடரவும்'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
