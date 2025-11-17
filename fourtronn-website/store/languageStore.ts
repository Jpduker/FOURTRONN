import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'ta';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',

    // Hero Section
    'heroTitle': 'Power Your Life with Fourtronn Energy Systems',
    'heroSubtitle': 'Salem\'s Most Trusted Energy Solutions Provider Since 1996 - Fourtronn UPS, PRIYA Batteries, Fourtronn Solar & Water Purifiers',
    'shopNow': 'Shop Now',
    'serviceBooking': 'Book Service',
    'aboutUs': 'About Us',
    'ourStory': 'Our Story',
    'contact': 'Contact',
    'home': 'Home',
    'products': 'Products',
    'cart': 'Cart',

    // Categories
    'category.ups': 'UPS Systems',
    'category.batteries': 'Batteries',
    'category.solar': 'Solar Products',
    'category.water-purifiers': 'Water Purifiers',

    // Product
    'product.price': 'Price',
    'product.addToCart': 'Add to Cart',
    'product.specifications': 'Specifications',
    'product.description': 'Description',
    'product.inStock': 'In Stock',
    'product.outOfStock': 'Out of Stock',

    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.quantity': 'Quantity',
    'cart.remove': 'Remove',
    'cart.subtotal': 'Subtotal',
    'cart.total': 'Total',
    'cart.proceedToOrder': 'Proceed to Order',

    // Order Form
    'order.title': 'Complete Your Order',
    'order.customerDetails': 'Customer Details',
    'order.name': 'Full Name',
    'order.phone': 'Phone Number',
    'order.email': 'Email Address',
    'order.address': 'Address',
    'order.city': 'City',
    'order.state': 'State',
    'order.pincode': 'Pincode',
    'order.specialInstructions': 'Special Instructions',
    'order.preferredContact': 'Preferred Contact Method',
    'order.submit': 'Place Order',

    // Footer
    'footer.about': 'About Fourtronn',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved.',

    // Common
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.search': 'Search products...',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.loading': 'Loading...',
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.products': 'தயாரிப்புகள்',
    'nav.about': 'எங்களைப் பற்றி',
    'nav.contact': 'தொடர்பு',
    'nav.cart': 'வண்டி',

    // Hero Section
    'hero.title': 'ஃபோர்ட்ரான் எனர்ஜி சிஸ்டம்ஸுடன் உங்கள் வாழ்க்கையை சக்தியூட்டுங்கள்',
    'hero.subtitle': 'சேலத்தில் UPS, பேட்டரிகள், சூரிய தீர்வுகள் மற்றும் நீர் சுத்திகரிப்பு அமைப்புகளின் முன்னணி வழங்குநர்',
    'hero.cta.browse': 'தயாரிப்புகளை உலாவுக',    'hero.cta.contact': 'எங்களை தொடர்பு கொள்ளவும்',

    // Categories
    'category.ups': 'UPS அமைப்புகள்',
    'category.batteries': 'பேட்டரிகள்',
    'category.solar': 'சூரிய தயாரிப்புகள்',
    'category.water-purifiers': 'நீர் சுத்திகரிப்பு',

    // Product
    'product.price': 'விலை',
    'product.addToCart': 'வண்டியில் சேர்',
    'product.specifications': 'விவரக்குறிப்புகள்',
    'product.description': 'விளக்கம்',
    'product.inStock': 'கையிருப்பில் உள்ளது',
    'product.outOfStock': 'கையிருப்பில் இல்லை',

    // Cart
    'cart.title': 'கொள்முதல் வண்டி',
    'cart.empty': 'உங்கள் வண்டி காலியாக உள்ளது',
    'cart.quantity': 'அளவு',
    'cart.remove': 'அகற்று',
    'cart.subtotal': 'மொத்தம்',
    'cart.total': 'மொத்த விலை',
    'cart.proceedToOrder': 'ஆர்டருக்கு செல்',

    // Order Form
    'order.title': 'உங்கள் ஆர்டரை நிறைவு செய்யுங்கள்',
    'order.customerDetails': 'வாடிக்கையாளர் விவரங்கள்',
    'order.name': 'முழு பெயர்',
    'order.phone': 'தொலைபேசி எண்',
    'order.email': 'மின்னஞ்சல்',
    'order.address': 'முகவரி',
    'order.city': 'நகரம்',
    'order.state': 'மாநிலம்',
    'order.pincode': 'பின் குறியீடு',
    'order.specialInstructions': 'சிறப்பு அறிவுறுத்தல்கள்',
    'order.preferredContact': 'விருப்பமான தொடர்பு முறை',
    'order.submit': 'ஆர்டர் செய்யவும்',

    // Footer
    'footer.about': 'ஃபோர்ட்ரானைப் பற்றி',
    'footer.quickLinks': 'விரைவு இணைப்புகள்',
    'footer.contact': 'தொடர்பு கொள்ள',
    'footer.followUs': 'எங்களை பின்தொடரவும்',
    'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',

    // Common
    'common.learnMore': 'மேலும் அறிய',
    'common.viewAll': 'அனைத்தையும் காண்க',
    'common.search': 'தயாரிப்புகளை தேடு...',
    'common.filter': 'வடிகட்டி',
    'common.sort': 'வரிசைப்படுத்து',
    'common.loading': 'ஏற்றுகிறது...',
  },
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'en',

      setLanguage: (lang: Language) => {
        set({ language: lang });
      },

      t: (key: string) => {
        const { language } = get();
        return translations[language][key] || key;
      },
    }),
    {
      name: 'fourtronn-language-storage',
    }
  )
);
