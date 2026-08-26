import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getPackages } from '@/lib/services';
import ImageSlider from '@/components/ui/ImageSlider';

export const dynamic = 'force-dynamic';

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations();
  
  // Fetch packages from Firebase
  const packages = await getPackages('finishings');

  return (
    <div className="pt-24 pb-20 bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-dark-100 mb-4">
            {locale === 'en' ? 'Our Finishings' : 'تشطيباتنا'}
          </h1>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            {locale === 'en' 
              ? 'Integrated finishing solutions with high quality and modern design.' 
              : 'تشطيب متكامل بجودة عالية وتصميم عصري.'}
          </p>
          <div className="w-16 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-300">
              
              {/* Image Header */}
              {pkg.image ? (
                <div className="relative h-48 w-full group">
                  <div className="absolute inset-0 z-0">
                    <ImageSlider images={pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.image]} alt={locale === 'en' ? pkg.title_en : pkg.title_ar} />
                  </div>
                  <div className="absolute inset-0 bg-dark-200 bg-opacity-60 flex flex-col justify-center items-center text-center p-4 z-10 pointer-events-none">
                    <h3 className="text-3xl font-black mb-1 text-gold">{locale === 'en' ? pkg.title_en : pkg.title_ar}</h3>
                    <p className="text-gray-200 text-lg">{locale === 'en' ? pkg.subtitle_en : pkg.subtitle_ar}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-dark-100 p-6 text-center border-b-4 border-gold">
                    <h3 className="text-3xl font-black mb-1 text-gold">
                      {locale === 'en' ? pkg.title_en : pkg.title_ar}
                    </h3>
                    <p className="text-gray-200 text-lg">
                      {locale === 'en' ? pkg.subtitle_en : pkg.subtitle_ar}
                    </p>
                </div>
              )}
              
              <div className="p-8 flex-1 flex flex-col">
                
                {/* Price */}
                <div className="text-center mb-8 border-b border-gray-100 pb-8">
                  <span className="text-gray-500 text-sm font-bold block mb-2">
                    {locale === 'en' ? (pkg.priceText_en || 'Total Price') : (pkg.priceText_ar || 'بمبلغ')}
                  </span>
                  <div className="flex justify-center items-end gap-2 text-dark-100">
                    <span className="text-5xl font-black">{pkg.price}</span>
                    {pkg.price !== 'مفاجأة' && pkg.price !== 'Contact Us' && (
                      <span className="text-xl font-bold mb-1">{t('Common.currency')}</span>
                    )}
                  </div>
                </div>
                
                {/* Includes Icons */}
                <div className="mb-8">
                  <h4 className="text-center font-bold text-dark-200 bg-gray-50 py-2 rounded-lg mb-6 border border-gray-100">
                    {locale === 'en' ? 'Package Includes' : 'الباقة تشمل'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {(locale === 'en' ? pkg.includes_en : pkg.includes_ar).split(',').map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-sm font-bold text-gray-700 leading-tight">
                          {item.trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Features Checklist */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <ul className="space-y-3">
                    {(locale === 'en' ? pkg.features_en : pkg.features_ar).split(',').map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                        <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        {feat.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <Link 
                    href={`/${locale}/contact`} 
                    className="block w-full py-4 text-center text-lg font-bold rounded-xl bg-dark-100 hover:bg-gold text-white transition-all duration-300 shadow-md"
                  >
                    {locale === 'en' ? 'Book Now' : 'احجز باقتك الآن'}
                  </Link>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
