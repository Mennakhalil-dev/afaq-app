"use client";

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { submitContact } from '@/lib/services';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add subject line
    data._subject = `رسالة جديدة من موقع آفاق: ${data.service_type}`;
    
    try {
      // 1. Save to Firebase Database
      await submitContact(data);
      setIsSubmitted(true);

      // 2. Try to send via FormSubmit (Don't block if it fails)
      const emailTo = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "afaq.supplies.com@gmail.com";
      fetch(`https://formsubmit.co/ajax/${emailTo}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).catch(e => console.error("FormSubmit Error:", e));

    } catch (error) {
      console.error(error);
      alert("تعذر الاتصال بالخادم. تأكد من اتصالك بالإنترنت.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark-100 mb-4">{t('title')}</h2>
          <p className="text-gray-600">{t('subtitle')}</p>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-xl text-center shadow-sm">
            <h3 className="text-xl font-bold mb-2">نجاح!</h3>
            <p>{t('success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Honeypot field to prevent spam */}
            <input type="text" name="_honey" style={{ display: 'none' }} />
            {/* Disable Captcha for smoother experience */}
            <input type="hidden" name="_captcha" value="false" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('name')} *</label>
                <input type="text" name="name" required className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('phone')} *</label>
                <input type="tel" name="phone" required className="input-field" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')} (اختياري)</label>
                <input type="email" name="email" className="input-field" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('service_type')} *</label>
                <select name="service_type" required className="input-field">
                  {locale === 'en' ? (
                    <>
                      <option>Buy Property</option>
                      <option>Sell Property</option>
                      <option>Rent Property</option>
                      <option>Finishings & Decor</option>
                      <option>Security Systems & Cameras</option>
                      <option>Property Management</option>
                      <option>Real Estate Investment</option>
                      <option>Real Estate Consultation</option>
                      <option>Other</option>
                    </>
                  ) : (
                    <>
                      <option>شراء عقار</option>
                      <option>بيع عقار</option>
                      <option>تأجير عقار</option>
                      <option>أعمال تشطيبات وديكور</option>
                      <option>أنظمة أمنية وكاميرات مراقبة</option>
                      <option>إدارة أملاك</option>
                      <option>استثمار عقاري</option>
                      <option>استشارة عقارية</option>
                      <option>أخرى</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('message')}</label>
              <textarea name="message" rows={4} className="input-field resize-none"></textarea>
            </div>
            
            <button type="submit" disabled={isLoading} className="btn-gold w-full text-lg h-[54px] disabled:opacity-70">
              {isLoading ? 'جاري الإرسال...' : t('submit')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
