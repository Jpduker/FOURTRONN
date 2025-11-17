'use client';

import { useLanguageStore } from '@/store/languageStore';
import { CalendarDays, Users, Award, MapPin, Phone, Mail } from 'lucide-react';

export default function AboutPage() {
  const { language, t } = useLanguageStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {language === 'en' ? 'About Fourtronn Energy Systems' : 'ஃபோர்ட்ரான் எனர்ஜி சிஸ்டம்ஸ் பற்றி'}
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Three decades of excellence in power solutions across Salem and Tamil Nadu'
                : 'சேலம் மற்றும் தமிழகம் முழுவதும் மூன்று தசாப்தங்களாக மின் தீர்வுகளில் சிறப்பு'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {language === 'en' ? 'Our Journey Since 1996' : 'எங்கள் பயணம் 1996 முதல்'}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {language === 'en'
                    ? 'Founded in 1996 by Mr. Lenin Sundaram in Salem, Tamil Nadu, Fourtronn Energy Systems began as a manufacturing venture specializing in online UPS systems, inverters, and digital home UPS solutions.'
                    : '1996-ல் தமிழ்நாட்டின் சேலத்தில் திரு. லெனின் சுந்தரம் அவர்களால் நிறுவப்பட்ட ஃபோர்ட்ரான் எனர்ஜி சிஸ்டம்ஸ், ஆன்லைன் UPS அமைப்புகள், இன்வெர்ட்டர்கள் மற்றும் டிஜிட்டல் வீட்டு UPS தீர்வுகளில் நிபுணத்துவம் பெற்ற ஒரு உற்பத்தி நிறுவனமாக தொடங்கியது.'
                  }
                </p>
                <p>
                  {language === 'en'
                    ? 'As a proprietorship firm with GST registration (33AERPL6929E1Z8) since July 1, 2017, we have grown from a small family business to Salem\'s trusted manufacturer of power solutions, serving both retail and manufacturing sectors.'
                    : 'ஜூலை 1, 2017 முதல் GST பதிவு (33AERPL6929E1Z8) கொண்ட ஒரு தனிநபர் நிறுவனமாக, நாங்கள் ஒரு சிறிய குடும்ப வணிகத்தில் இருந்து சேலத்தின் நம்பகமான மின் தீர்வுகள் உற்பத்தியாளராக வளர்ந்துள்ளோம், சில்லறை மற்றும் உற்பத்தி துறைகளுக்கு சேவை செய்கிறோம்.'
                  }
                </p>
                <p>
                  {language === 'en'
                    ? 'Today, under the leadership of CEO Lenin Sundaram, our team of up to 10 dedicated professionals continues to manufacture high-quality UPS systems, tubular batteries, automatic water purifiers, and voltage stabilizers, maintaining our reputation for excellence across Tamil Nadu.'
                    : 'இன்று, CEO லெனின் சுந்தரம் அவர்களின் தலைமையில், 10 பேர் வரையிலான எங்கள் அர்ப்பணிப்புள்ள நிபுணர்கள் குழு உயர்தர UPS அமைப்புகள், குழாய் பேட்டரிகள், தானியங்கி நீர் சுத்திகரிப்பு மற்றும் மின்னழுத்த நிலைப்படுத்திகளை தொடர்ந்து தயாரித்து, தமிழகம் முழுவதும் சிறப்புக்கான எங்கள் நற்பெயரை பராமரித்து வருகிறது.'
                  }
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                    <CalendarDays className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">29+</div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'Years of Service' : 'ஆண்டுகள் சேவை'}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">5000+</div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'Happy Customers' : 'மகிழ்ச்சியான வாடிக்கையாளர்கள்'}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                    <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'Customer Satisfaction' : 'வாடிக்கையாளர் திருப்தி'}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                    <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">1996</div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'Established' : 'நிறுவப்பட்டது'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Our Brand Portfolio' : 'எங்கள் பிராண்ட் போர்ட்ஃபோலியோ'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {language === 'en'
                ? 'Each brand in our portfolio represents our commitment to quality and innovation'
                : 'எங்கள் போர்ட்ஃபோலியோவில் உள்ள ஒவ்வொரு பிராண்டும் தரம் மற்றும் புதுமைக்கான எங்கள் உறுதிப்பாட்டை பிரதிபலிக்கிறது'
              }
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">F</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Fourtronn UPS' : 'ஃபோர்ட்ரான் UPS'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en'
                  ? 'Our flagship UPS systems trusted by businesses across Salem'
                  : 'சேலம் முழுவதும் வணிகங்களால் நம்பப்படும் எங்கள் முக்கிய UPS அமைப்புகள்'
                }
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">Q</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'PRIYA Batteries' : 'பிரியா பேட்டரிகள்'}
              </h3>
              <p className="text-sm font-semibold text-pink-600 mb-2">
                {language === 'en' ? '"Queen of Quality"' : '"தரத்தின் ராணி"'}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en'
                  ? 'Premium batteries named with love, built for lasting performance'
                  : 'அன்பில் பெயரிடப்பட்ட பிரீமியம் பேட்டரிகள், நீடித்த செயல்திறனுக்காக உருவாக்கப்பட்டது'
                }
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">P</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Prakash Solar' : 'பிரகாஷ் சூரிய'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en'
                  ? 'Illuminating your future with clean, sustainable solar energy'
                  : 'சுத்தமான, நிலையான சூரிய ஆற்றலால் உங்கள் எதிர்காலத்தை ஒளிரச் செய்கிறது'
                }
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-cyan-600">N</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Nishanth RO' : 'நிஷாந்த் RO'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en'
                  ? 'Pure water, pure health for every home and family'
                  : 'ஒவ்வொரு வீடு மற்றும் குடும்பத்திற்கும் தூய நீர், தூய ஆரோக்கியம்'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              {language === 'en' ? 'Visit Our Salem Showroom' : 'எங்கள் சேலம் ஷோரூமை பார்வையிடுங்கள்'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center">
                <MapPin className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">
                    {language === 'en' ? 'Address' : 'முகவரி'}
                  </div>
                  <div className="text-blue-100">
                    {language === 'en' 
                      ? 'No.1, Vaithilingam Street, Saminathapuram, Salem - 636009, Tamil Nadu' 
                      : 'எண்.1, வைத்திலிங்கம் தெரு, சாமிநாதபுரம், சேலம் - 636009, தமிழ்நாடு'
                    }
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">
                    {language === 'en' ? 'Phone' : 'தொலைபேசி'}
                  </div>
                  <div className="text-blue-100">+91 90472 23355</div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">
                    {language === 'en' ? 'Email' : 'மின்னஞ்சல்'}
                  </div>
                  <div className="text-blue-100">leninups@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}