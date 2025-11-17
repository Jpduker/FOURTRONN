'use client';

import { useState } from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { Mail, MapPin, Phone, Send, Facebook, Instagram } from 'lucide-react';

export default function ContactPage() {
  const { language } = useLanguageStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(language === 'en' ? 'Thank you! We will contact you soon.' : 'நன்றி! நாங்கள் விரைவில் தொடர்பு கொள்வோம்.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert(language === 'en' ? 'Failed to send message. Please try again.' : 'செய்தி அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(language === 'en' ? 'Failed to send message. Please try again.' : 'செய்தி அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Contact Us' : 'எங்களை தொடர்பு கொள்ளுங்கள்'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Get in touch with us for any queries about our products and services'
              : 'எங்கள் தயாரிப்புகள் மற்றும் சேவைகள் பற்றிய கேள்விகளுக்கு எங்களை தொடர்பு கொள்ளுங்கள்'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'en' ? 'Get In Touch' : 'தொடர்பில் இருங்கள்'}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === 'en' ? 'Visit Our Showroom' : 'எங்கள் காட்சியகத்தை பார்வையிடுங்கள்'}
                    </h3>
                    <p className="text-gray-600">
                      Fourtronn Energy Systems<br />
                      No.1, Vaithilingam Street,<br />
                      Saminathapuram, Salem - 636009<br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === 'en' ? 'Call Us' : 'எங்களை அழைக்கவும்'}
                    </h3>
                    <a href="tel:+919047223355" className="text-blue-600 hover:underline text-lg">
                      +91 90472 23355
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === 'en' ? 'Email Us' : 'மின்னஞ்சல் அனுப்புங்கள்'}
                    </h3>
                    <a href="mailto:leninups@gmail.com" className="text-blue-600 hover:underline">
                      leninups@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {language === 'en' ? 'Follow Us' : 'எங்களை பின்தொடரவும்'}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=100065163482312"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/fourtronn_energy_system/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-lg flex items-center justify-center hover:from-purple-700 hover:to-pink-600 transition"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.2!2d78.16952!3d11.7059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDQyJzIxLjIiTiA3OMKwMTAnMTAuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Send Us a Message' : 'எங்களுக்கு செய்தி அனுப்புங்கள்'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {language === 'en' ? 'Your Name' : 'உங்கள் பெயர்'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Enter your name' : 'உங்கள் பெயரை உள்ளிடவும்'}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {language === 'en' ? 'Email Address' : 'மின்னஞ்சல் முகவரி'}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'your@email.com' : 'உங்கள்@மின்னஞ்சல்.com'}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {language === 'en' ? 'Phone Number' : 'தொலைபேசி எண்'}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {language === 'en' ? 'Message' : 'செய்தி'}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Your message here...' : 'உங்கள் செய்தி இங்கே...'}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>{language === 'en' ? 'Send Message' : 'செய்தி அனுப்பு'}</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
