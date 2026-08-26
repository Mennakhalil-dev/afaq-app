import { getProperty } from '@/lib/services';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function PropertyDetailsPage({ params: { locale, id } }: { params: { locale: string, id: string } }) {
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  const title = locale === 'en' ? property.title_en : property.title_ar;
  const location = locale === 'en' ? property.location_en : property.location_ar;
  const type = locale === 'en' ? property.type : property.typeAr;

  return (
    <div className="pt-28 pb-20 bg-neutral-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 font-medium">
              <span className="bg-gold/10 text-gold px-4 py-1.5 rounded-full font-bold shadow-sm">
                {type}
              </span>
              <span>•</span>
              <span className="px-2">{locale === 'en' ? property.operation : (property.operation === 'Buy' ? 'للبيع' : 'للإيجار')}</span>
              <span>•</span>
              <span className="px-2 text-green-600 bg-green-50 rounded-full py-1">
                {property.status === 'available' ? (locale === 'en' ? 'Available' : 'متاح') : (locale === 'en' ? 'Sold' : 'مباع')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark-100 mb-4 leading-tight">{title}</h1>
            <p className="text-gray-500 text-lg flex items-center gap-2 font-medium">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          </div>
          <div className="text-right bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1 font-bold">{locale === 'en' ? 'Asking Price' : 'السعر المطلوب'}</p>
            <p className="text-3xl md:text-4xl font-extrabold text-gold">
              {property.price.toLocaleString()} <span className="text-xl">{locale === 'en' ? 'EGP' : 'ج.م'}</span>
            </p>
          </div>
        </div>

        {/* Hero Gallery Grid (Main Image on Top) */}
        <div className="mb-12 h-[400px] md:h-[600px] w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-md group h-full w-full border border-gray-100">
            <img src={property.image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-100/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 rtl:right-6 rtl:left-auto bg-white/90 backdrop-blur-md text-dark-100 px-5 py-2 rounded-xl font-bold shadow-lg">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                {locale === 'en' ? 'Exterior View' : 'صورة الواجهة'}
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Image Gallery */}
        {property.images && property.images.length > 1 && (
          <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {property.images.map((img, idx) => (
              <div key={idx} className="relative h-32 md:h-48 rounded-xl overflow-hidden shadow-sm group border border-gray-100">
                <img src={img} alt={`${title} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
            ))}
          </div>
        )}

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content (Right/Left depending on RTL) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Quick Stats Cards */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-dark-100 mb-8 border-b pb-4">{locale === 'en' ? 'Property Overview' : 'المواصفات'}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 rounded-2xl border border-transparent hover:border-gold/20">
                  <svg className="w-8 h-8 text-gold mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  <p className="text-gray-500 text-sm mb-1 font-medium">{locale === 'en' ? 'Total Area' : 'المساحة الكلية'}</p>
                  <p className="font-extrabold text-2xl text-dark-100">{property.area} <span className="text-base font-normal text-gray-500">{locale === 'en' ? 'Sqm' : 'م²'}</span></p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 rounded-2xl border border-transparent hover:border-gold/20">
                  <svg className="w-8 h-8 text-gold mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  <p className="text-gray-500 text-sm mb-1 font-medium">{locale === 'en' ? 'Bedrooms' : 'غرف النوم'}</p>
                  <p className="font-extrabold text-2xl text-dark-100">{property.beds}</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 rounded-2xl border border-transparent hover:border-gold/20">
                  <svg className="w-8 h-8 text-gold mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  <p className="text-gray-500 text-sm mb-1 font-medium">{locale === 'en' ? 'Bathrooms' : 'الحمامات'}</p>
                  <p className="font-extrabold text-2xl text-dark-100">{property.baths}</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 rounded-2xl border border-transparent hover:border-gold/20">
                  <svg className="w-8 h-8 text-gold mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  <p className="text-gray-500 text-sm mb-1 font-medium">{locale === 'en' ? 'Finishing' : 'التشطيب'}</p>
                  <p className="font-bold text-lg text-dark-100 mt-1">{locale === 'en' ? 'Super Lux' : 'سوبر لوكس'}</p>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-dark-100 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                {locale === 'en' ? 'Detailed Description' : 'التفاصيل الكاملة'}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-loose">
                <p className="whitespace-pre-line">
                  {property.description 
                    ? property.description 
                    : (locale === 'en' 
                      ? 'This exceptional property is designed to provide the highest standards of luxury and comfort.'
                      : 'عقار استثنائي مصمم ليوفر أعلى معايير الفخامة والراحة.')}
                </p>
              </div>
            </div>

            {/* Plan Image under Specifications */}
            {property.planImage && (
              <div className="mt-10 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-dark-100 mb-6 w-full border-b pb-4">{locale === 'en' ? 'Floor Plan' : 'المخطط الهندسي'}</h2>
                <img src={property.planImage} alt="Plan" className="w-full h-auto max-h-[800px] object-contain rounded-xl" />
              </div>
            )}
            

            {/* Premium Amenities */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-dark-100 mb-8 border-b pb-4">{locale === 'en' ? 'Premium Features' : 'مميزات وخدمات إضافية'}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                {(property.features 
                  ? property.features.split(',').map(f => f.trim()).filter(f => f.length > 0).map(f => ({ en: f, ar: f, icon: 'M5 13l4 4L19 7' }))
                  : [
                      { en: 'Smart Home System', ar: 'نظام منزل ذكي', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                      { en: 'Private Parking', ar: 'جراج خاص', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
                      { en: '24/7 Security', ar: 'أمن وحراسة', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                      { en: 'Central A/C', ar: 'تكييف مركزي', icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' },
                      { en: 'Swimming Pool', ar: 'حمام سباحة', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
                      { en: 'Green Areas', ar: 'مساحات خضراء', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                    ]
                ).map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={amenity.icon} />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-700">{locale === 'en' ? amenity.en : amenity.ar}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Call to Action */}
          <div className="space-y-6">
            <div className="bg-dark-100 p-8 rounded-3xl shadow-xl text-center sticky top-32 text-white">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-gold font-bold text-3xl">Afaq</span>
              </div>
              <h3 className="font-extrabold text-2xl mb-2">{locale === 'en' ? 'Interested in this property?' : 'مهتم بهذا العقار؟'}</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                {locale === 'en' 
                  ? 'Contact our real estate experts today to schedule a viewing or request more information.' 
                  : 'تواصل مع خبراء العقارات لدينا اليوم لتحديد موعد للمعاينة أو طلب المزيد من التفاصيل.'}
              </p>
              
              <button className="w-full py-4 rounded-xl font-bold mb-4 flex justify-center items-center gap-2 bg-gold hover:bg-white hover:text-dark-100 text-white transition-all duration-300 shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {locale === 'en' ? 'Call Sales' : 'اتصل بالمبيعات'}
              </button>
              
              <a href="https://wa.me/201041952008" target="_blank" className="w-full py-4 rounded-xl font-bold border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-md flex justify-center items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                {locale === 'en' ? 'WhatsApp Chat' : 'محادثة واتساب'}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
