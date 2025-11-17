'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, Wrench, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';
import { categories } from '@/data/products';
import toast from 'react-hot-toast';

interface ServiceFormData {
  customerName: string;
  phone: string;
  email?: string;
  productCategory: string;
  productName?: string;
  serviceType: 'maintenance' | 'complaint' | 'troubleshooting';
  preferredDate: string;
  preferredTime: string;
  address: string;
  city: string;
  pincode: string;
  comments?: string;
}

export default function ServicePage() {
  const { language } = useLanguageStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceFormData>();

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);

    try {
      // Map form fields to API expected field names
      const serviceData = {
        name: data.customerName,
        phone: data.phone,
        email: data.email,
        productType: data.productCategory,
        issueDescription: data.comments || `${data.serviceType} - ${data.productName || 'Not specified'}`,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        address: `${data.address}, ${data.city} - ${data.pincode}`,
      };

      const response = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Service Ticket ID:', result.ticketId);

        toast.success(
          language === 'en'
            ? `✅ Thanks for booking! Our team will contact you soon. Ticket ID: ${result.ticketId}`
            : `✅ பதிவு செய்ததற்கு நன்றி! எங்கள் குழு விரைவில் உங்களை தொடர்பு கொள்ளும். டிக்கெட் எண்: ${result.ticketId}`,
          { duration: 6000 }
        );

        reset();
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast.error(
        language === 'en'
          ? 'Failed to submit request. Please try again.'
          : 'கோரிக்கையை சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Service Request' : 'சேவை கோரிக்கை'}
          </h1>
          <p className="text-xl text-gray-600">
            {language === 'en'
              ? 'Need maintenance or facing issues? Book an appointment with our expert team'
              : 'பராமரிப்பு தேவையா அல்லது சிக்கல்களை எதிர்கொள்கிறீர்களா? எங்கள் நிபுணர் குழுவுடன் ஒரு சந்திப்பை பதிவு செய்யுங்கள்'}
          </p>
        </div>

        {/* Service Types Info */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <Wrench className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Maintenance' : 'பராமரிப்பு'}
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {language === 'en' ? 'Distilled water refilling' : 'வடிகட்டிய நீர் நிரப்புதல்'}</li>
                <li>• {language === 'en' ? 'Battery check-up' : 'பேட்டரி சோதனை'}</li>
                <li>• {language === 'en' ? 'Cleaning & servicing' : 'சுத்தம் மற்றும் சேவை'}</li>
                <li>• {language === 'en' ? 'Preventive maintenance' : 'தடுப்பு பராமரிப்பு'}</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
              <AlertCircle className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Troubleshooting' : 'சிக்கல் தீர்வு'}
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {language === 'en' ? 'Device not working' : 'சாதனம் வேலை செய்யவில்லை'}</li>
                <li>• {language === 'en' ? 'Performance issues' : 'செயல்திறன் சிக்கல்கள்'}</li>
                <li>• {language === 'en' ? 'Strange sounds/smells' : 'விசித்திரமான ஒலிகள்/வாசனை'}</li>
                <li>• {language === 'en' ? 'Technical problems' : 'தொழில்நுட்ப சிக்கல்கள்'}</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
              <AlertCircle className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Complaint' : 'புகார்'}
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {language === 'en' ? 'Product defects' : 'தயாரிப்பு குறைபாடுகள்'}</li>
                <li>• {language === 'en' ? 'Warranty claims' : 'உத்தரவாத உரிமைகோரல்கள்'}</li>
                <li>• {language === 'en' ? 'Installation issues' : 'நிறுவல் சிக்கல்கள்'}</li>
                <li>• {language === 'en' ? 'Service quality' : 'சேவை தரம்'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Service Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Phone className="w-6 h-6 text-blue-600" />
                <span>{language === 'en' ? 'Personal Information' : 'தனிப்பட்ட தகவல்'}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Full Name' : 'முழு பெயர்'} *
                  </label>
                  <input
                    type="text"
                    {...register('customerName', { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder={language === 'en' ? 'Enter your name' : 'உங்கள் பெயரை உள்ளிடவும்'}
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-sm mt-1">
                      {language === 'en' ? 'Name is required' : 'பெயர் தேவை'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Phone Number' : 'தொலைபேசி எண்'} *
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: true, pattern: /^[0-9]{10}$/ })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="9876543210"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {language === 'en' ? 'Valid 10-digit phone required' : 'செல்லுபடியாகும் 10 இலக்க தொலைபேசி தேவை'}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Email Address' : 'மின்னஞ்சல்'} ({language === 'en' ? 'Optional' : 'விருப்பம்'})
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Wrench className="w-6 h-6 text-blue-600" />
                <span>{language === 'en' ? 'Service Details' : 'சேவை விவரங்கள்'}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Product Category' : 'தயாரிப்பு வகை'} *
                  </label>
                  <select
                    {...register('productCategory', { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">
                      {language === 'en' ? 'Select category' : 'வகையைத் தேர்ந்தெடுக்கவும்'}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {language === 'en' ? cat.name_en : cat.name_ta}
                      </option>
                    ))}
                  </select>
                  {errors.productCategory && (
                    <p className="text-red-500 text-sm mt-1">
                      {language === 'en' ? 'Category is required' : 'வகை தேவை'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Product Name' : 'தயாரிப்பு பெயர்'} ({language === 'en' ? 'Optional' : 'விருப்பம்'})
                  </label>
                  <input
                    type="text"
                    {...register('productName')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder={language === 'en' ? 'e.g., Luminous Zelio 1100' : 'உதாரணம்: லுமினஸ் ஜீலியோ 1100'}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Service Type' : 'சேவை வகை'} *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="relative flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
                      <input
                        type="radio"
                        value="maintenance"
                        {...register('serviceType', { required: true })}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {language === 'en' ? 'Maintenance' : 'பராமரிப்பு'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {language === 'en' ? 'Regular service' : 'வழக்கமான சேவை'}
                        </div>
                      </div>
                    </label>

                    <label className="relative flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
                      <input
                        type="radio"
                        value="troubleshooting"
                        {...register('serviceType', { required: true })}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {language === 'en' ? 'Troubleshooting' : 'சிக்கல் தீர்வு'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {language === 'en' ? 'Fix issues' : 'சிக்கல்களை சரிசெய்யவும்'}
                        </div>
                      </div>
                    </label>

                    <label className="relative flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
                      <input
                        type="radio"
                        value="complaint"
                        {...register('serviceType', { required: true })}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {language === 'en' ? 'Complaint' : 'புகார்'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {language === 'en' ? 'Report issue' : 'சிக்கல் அறிக்கை'}
                        </div>
                      </div>
                    </label>
                  </div>
                  {errors.serviceType && (
                    <p className="text-red-500 text-sm mt-1">
                      {language === 'en' ? 'Service type is required' : 'சேவை வகை தேவை'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Appointment Schedule */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                <span>{language === 'en' ? 'Preferred Schedule' : 'விருப்பமான அட்டவணை'}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Preferred Date' : 'விருப்பமான தேதி'} *
                  </label>
                  <input
                    type="date"
                    {...register('preferredDate', { required: true })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                  {errors.preferredDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {language === 'en' ? 'Date is required' : 'தேதி தேவை'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Preferred Time' : 'விருப்பமான நேரம்'} *
                  </label>
                  <select
                    {...register('preferredTime', { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">
                      {language === 'en' ? 'Select time slot' : 'நேர இடைவெளியைத் தேர்ந்தெடுக்கவும்'}
                    </option>
                    <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                    <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                    <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                    <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                    <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                  </select>
                  {errors.preferredTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {language === 'en' ? 'Time is required' : 'நேரம் தேவை'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                <span>{language === 'en' ? 'Service Location' : 'சேவை இடம்'}</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Address' : 'முகவரி'} *
                  </label>
                  <textarea
                    {...register('address', { required: true })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder={language === 'en' ? 'Street address, building, etc.' : 'தெரு முகவரி, கட்டிடம் போன்றவை'}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {language === 'en' ? 'Address is required' : 'முகவரி தேவை'}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'City' : 'நகரம்'} *
                    </label>
                    <input
                      type="text"
                      {...register('city', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder={language === 'en' ? 'Salem' : 'சேலம்'}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {language === 'en' ? 'City is required' : 'நகரம் தேவை'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Pincode' : 'பின் குறியீடு'} *
                    </label>
                    <input
                      type="text"
                      {...register('pincode', { required: true, pattern: /^[0-9]{6}$/ })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="636001"
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">
                        {language === 'en' ? 'Valid 6-digit pincode required' : 'செல்லுபடியாகும் 6 இலக்க பின்கோட் தேவை'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Additional Comments' : 'கூடுதல் கருத்துகள்'} ({language === 'en' ? 'Optional' : 'விருப்பம்'})
              </label>
              <textarea
                {...register('comments')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder={
                  language === 'en'
                    ? 'Describe the issue or any specific requirements...'
                    : 'சிக்கல் அல்லது குறிப்பிட்ட தேவைகளை விவரிக்கவும்...'
                }
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{language === 'en' ? 'Submitting...' : 'சமர்ப்பிக்கிறது...'}</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    <span>{language === 'en' ? 'Submit Service Request' : 'சேவை கோரிக்கையை சமர்ப்பிக்கவும்'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="max-w-3xl mx-auto mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-center text-gray-700">
            <strong>{language === 'en' ? 'Need immediate assistance?' : 'உடனடி உதவி தேவையா?'}</strong>
            <br />
            {language === 'en' ? 'Call us at' : 'எங்களை அழைக்கவும்'}{' '}
            <a href="tel:+919047223355" className="text-blue-600 font-semibold hover:underline">
              +91 90472 23355
            </a>
            {' '}{language === 'en' ? 'or email' : 'அல்லது மின்னஞ்சல்'}{' '}
            <a href="mailto:leninups@gmail.com" className="text-blue-600 font-semibold hover:underline">
              leninups@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
