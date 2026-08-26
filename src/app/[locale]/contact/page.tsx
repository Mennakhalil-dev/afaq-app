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
            <a href="https://www.google.com/maps/dir/30.3360652,31.7523622/%D8%A2%D9%81%D8%A7%D9%82+%D9%84%D9%84%D8%A5%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1%D8%A7%D8%AA+%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%8A%D8%A9+%D9%88%D8%A7%D9%84%D8%AA%D8%B4%D8%B7%D9%8A%D8%A8%D8%A7%D8%AA+%D9%88%D9%83%D8%A7%D9%85%D9%8A%D8%B1%D8%A7%D8%AA+%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D9%82%D8%A8%D8%A9+%D9%88%D8%A3%D9%86%D8%B8%D9%85%D8%A9+%D8%A7%D9%84%D8%A3%D9%85%D8%A7%D9%86%D8%8C+%D8%A7%D9%85%D8%AA%D8%AF%D8%A7%D8%AF+%D8%B7%D8%B1%D9%8A%D9%82+%D9%85%D8%B3%D8%AA%D8%B4%D9%81%D9%8A+%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D9%87+%D9%88%D8%A8%D8%AC%D9%88%D8%A7%D8%B1+%D8%B5%D9%86%D9%8A%D9%87+%D9%83%D9%85%D9%8A%D9%86+%D8%A7%D8%A8%D9%88+%D8%AD%D9%85%D8%A7%D8%AF%D8%8C+%D8%AB%D8%A7%D9%86+%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1+%D9%85%D9%86+%D8%B1%D9%85%D8%B6%D8%A7%D9%86%D8%8C+%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%A7%D9%84%D8%B4%D8%B1%D9%82%D9%8A%D8%A9+44629%E2%80%AD/@30.3289591,31.7761106,13z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x14f8076de9cff2cb:0xf4ae20779d2bc56e!2m2!1d31.7250676!2d30.3313628!3e0?entry=ttu&g_ep=EgoyMDI2MDgyMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="text-gold text-xs hover:underline mt-2 inline-block">
              🗺️ عرض على الخريطة
            </a>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
            <Phone className="text-gold mx-auto mb-4" size={32} />
            <h3 className="font-bold text-dark-100 mb-2">الهاتف</h3>
            <p className="text-gray-500 text-sm" dir="ltr">01041952008</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
            <Mail className="text-gold mx-auto mb-4" size={32} />
            <h3 className="font-bold text-dark-100 mb-2">البريد الإلكتروني</h3>
            <p className="text-gray-500 text-sm">afaq.support.egypt@gmail.com</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
            <Clock className="text-gold mx-auto mb-4" size={32} />
            <h3 className="font-bold text-dark-100 mb-2">ساعات العمل</h3>
            <p className="text-gray-500 text-sm">الأحد - الخميس: 9 ص - 5 م</p>
          </div>
        </div>
      </div>
      
      {/* Google Map */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-16">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden h-96">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110196.5367808269!2d31.78927063412586!3d30.301569424683057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1457f6b92a297e61%3A0xb3551dbbdf38f828!2s10th%20of%20Ramadan%20City%2C%20Al%20Sharqia%20Governorate!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      
      {/* Reusing Contact Form component */}
      <div className="bg-white">
        <ContactForm />
      </div>

    </div>
  );
}
