'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { useLanguageStore } from '@/store/language';
import { CheckCircle, Package, Phone, Mail, Printer } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrderPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { language } = useLanguageStore();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If cart is empty, redirect to products
    if (items.length === 0 && !orderDetails) {
      router.push('/products');
    }
  }, [items, orderDetails, router]);

  const handlePrintReceipt = () => {
    window.print();
  };

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const order = {
      orderId: `FES${Date.now()}`,
      customerName: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: formData.get('address'),
      city: formData.get('city'),
      pincode: formData.get('pincode'),
      items: items.map(item => ({
        id: item.product.id,
        name: item.product.name_en,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal: getTotalPrice(),
      gst: getTotalPrice() * 0.18,
      total: getTotalPrice() * 1.18,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order placed with ID:', result.orderId);

        // Save order details to show confirmation
        setOrderDetails(order);
        
        // Clear the cart
        clearCart();

        toast.success(
          language === 'en'
            ? 'Order placed successfully! We will contact you soon.'
            : 'ஆர்டர் வெற்றிகரமாக வைக்கப்பட்டது! நாங்கள் விரைவில் உங்களை தொடர்பு கொள்வோம்.',
          { duration: 5000 }
        );
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      toast.error(
        language === 'en'
          ? 'Failed to place order. Please try again.'
          : 'ஆர்டரை வைக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show order confirmation
  if (orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'en' ? 'Order Confirmed!' : 'ஆர்டர் உறுதி செய்யப்பட்டது!'}
            </h1>
            
            <p className="text-gray-600 mb-6">
              {language === 'en' 
                ? 'Thank you for your order. Our team will contact you shortly.' 
                : 'உங்கள் ஆர்டருக்கு நன்றி. எங்கள் குழு விரைவில் உங்களை தொடர்பு கொள்ளும்.'}
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">
                {language === 'en' ? 'Order ID' : 'ஆர்டர் எண்'}
              </p>
              <p className="text-2xl font-bold text-blue-600">{orderDetails.orderId}</p>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                {language === 'en' ? 'Order Summary' : 'ஆர்டர் சுருக்கம்'}
              </h3>
              
              <div className="space-y-3 mb-4">
                {orderDetails.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {language === 'en' ? 'Subtotal' : 'துணை மொத்தம்'}
                  </span>
                  <span>₹{orderDetails.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>₹{orderDetails.gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-blue-600 pt-2 border-t">
                  <span>{language === 'en' ? 'Total' : 'மொத்தம்'}</span>
                  <span>₹{orderDetails.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'en' ? 'Delivery Details' : 'விநியோக விவரங்கள்'}
              </h3>
              <div className="text-left space-y-2 text-sm text-gray-700">
                <p><strong>{language === 'en' ? 'Name:' : 'பெயர்:'}</strong> {orderDetails.customerName}</p>
                <p><strong>{language === 'en' ? 'Phone:' : 'தொலைபேசி:'}</strong> {orderDetails.phone}</p>
                <p><strong>{language === 'en' ? 'Email:' : 'மின்னஞ்சல்:'}</strong> {orderDetails.email}</p>
                <p><strong>{language === 'en' ? 'Address:' : 'முகவரி:'}</strong> {orderDetails.address}, {orderDetails.city} - {orderDetails.pincode}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
              <button
                onClick={handlePrintReceipt}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                <Printer className="w-5 h-5" />
                {language === 'en' ? 'Print Receipt' : 'ரசீதை அச்சிடுங்கள்'}
              </button>
              <a
                href="tel:+919047223355"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Phone className="w-5 h-5" />
                {language === 'en' ? 'Call Us' : 'எங்களை அழைக்கவும்'}
              </a>
              <button
                onClick={() => router.push('/products')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {language === 'en' ? 'Continue Shopping' : 'தொடர்ந்து ஷாப்பிங் செய்யுங்கள்'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show checkout form
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {language === 'en' ? 'Checkout' : 'செக் அவுட்'}
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <form onSubmit={handlePlaceOrder} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">
                {language === 'en' ? 'Delivery Information' : 'விநியோக தகவல்'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Full Name' : 'முழு பெயர்'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'en' ? 'Enter your name' : 'உங்கள் பெயரை உள்ளிடவும்'}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Phone Number' : 'தொலைபேசி எண்'} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Email' : 'மின்னஞ்சல்'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Address' : 'முகவரி'} *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'en' ? 'House no, Street, Area' : 'வீட்டு எண், தெரு, பகுதி'}
                  ></textarea>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'City' : 'நகரம்'} *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={language === 'en' ? 'Salem' : 'சேலம்'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Pincode' : 'அஞ்சல் குறியீடு'} *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      pattern="[0-9]{6}"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="636009"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold"
                >
                  {isSubmitting 
                    ? (language === 'en' ? 'Placing Order...' : 'ஆர்டர் வைக்கப்படுகிறது...') 
                    : (language === 'en' ? 'Place Order' : 'ஆர்டரை வைக்கவும்')}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'en' ? 'Order Summary' : 'ஆர்டர் சுருக்கம்'}
              </h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.product.name_en}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-blue-600">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {language === 'en' ? 'Subtotal' : 'துணை மொத்தம்'}
                  </span>
                  <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {language === 'en' ? 'Shipping' : 'விநியோகம்'}
                  </span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{(getTotalPrice() * 0.18).toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-lg font-bold text-blue-600 pt-2 border-t">
                  <span>{language === 'en' ? 'Total' : 'மொத்தம்'}</span>
                  <span>₹{(getTotalPrice() * 1.18).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-1 text-blue-600 flex-shrink-0" />
                  <span>
                    {language === 'en' 
                      ? 'Need help? Call us at ' 
                      : 'உதவி தேவையா? எங்களை அழைக்கவும் '}
                    <a href="tel:+919047223355" className="text-blue-600 font-semibold">
                      +91 90472 23355
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
