import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/home/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('Contact');

  return (
    <div className="pt-24 pb-0 bg-neutral-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-dark-200 py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
        <div className="w-16 h-1 bg-gold mx-auto mb-4"></div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
            <MapPin className="text-gold mx-auto mb-4" size={32} />
            <h3 className="font-bold text-dark-100 mb-2">العنوان</h3>
            <p className="text-gray-500 text-sm">مدينة العاشر من رمضان - امتداد طريق مستشفي الجامعة - فيلا 75</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
            <Phone className="text-gold mx-auto mb-4" size={32} />
            <h3 className="font-bold text-dark-100 mb-2">الهاتف</h3>
            <p className="text-gray-500 text-sm" dir="ltr">01041952008</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
            <Mail className="text-gold mx-auto mb-4" size={32} />
            <h3 className="font-bold text-dark-100 mb-2">البريد الإلكتروني</h3>
            <p className="text-gray-500 text-sm">afaq.supplies.com@gmail.com</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
            <Clock className="text-gold mx-auto mb-4" size={32} />
            <h3 className="font-bold text-dark-100 mb-2">ساعات العمل</h3>
            <p className="text-gray-500 text-sm">الأحد - الخميس: 9 ص - 5 م</p>
          </div>
        </div>
      </div>
      
      {/* Reusing Contact Form component */}
      <div className="bg-white">
        <ContactForm />
      </div>

    </div>
  );
}
