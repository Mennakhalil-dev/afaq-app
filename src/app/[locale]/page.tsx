import { getTranslations } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import PropertySearch from '@/components/home/PropertySearch';
import PropertyCard from '@/components/ui/PropertyCard';
import ContactForm from '@/components/home/ContactForm';
import Link from 'next/link';
import { getProperties } from '@/lib/services';

const getServices = (locale: string) => [
  {
    id: "properties",
    title: locale === 'en' ? "Real Estate" : "العقارات",
    subtitle: locale === 'en' ? "Buy, sell, and rent properties" : "بيع، شراء، وإيجار العقارات",
    link: `/${locale}/properties`,
    btnText: locale === 'en' ? "Explore Properties" : "تصفح العقارات",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
  },
  {
    id: "finishings",
    title: locale === 'en' ? "Finishings" : "تشطيباتنا",
    subtitle: locale === 'en' ? "High quality interior finishing packages" : "باقات تشطيب داخلي عالية الجودة",
    link: `/${locale}/services`,
    btnText: locale === 'en' ? "Explore Finishings" : "استكشف التشطيبات",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
  },
  {
    id: "security",
    title: locale === 'en' ? "Security Systems" : "الأنظمة الأمنية",
    subtitle: locale === 'en' ? "Smart security and surveillance solutions" : "حلول ذكية للمراقبة والأنظمة الأمنية",
    link: `/${locale}/security`,
    btnText: locale === 'en' ? "Explore Security" : "استكشف الأنظمة",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80"
  }
];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations();
  const allProperties = await getProperties();
  const properties = allProperties.slice(0, 4).map(p => ({
    id: p.id!,
    title: locale === 'en' ? p.title_en : p.title_ar,
    location: locale === 'en' ? p.location_en : p.location_ar,
    price: p.price,
    area: p.area,
    beds: p.beds,
    baths: p.baths,
    type: locale === 'en' ? p.type : p.typeAr,
    image: p.image,
    images: p.images,
    status: p.status,
    locale: locale
  }));
  const services = getServices(locale);

  return (
    <>
      <Hero locale={locale} />
      <PropertySearch locale={locale} />
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">{t('Services.title')}</h2>
            <p className="text-gray-600 mb-4">{t('Services.subtitle')}</p>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map(service => (
              <div key={service.id} className="group rounded-2xl overflow-hidden shadow-lg relative p-8 flex flex-col justify-center items-center text-center transition-all duration-300 h-80 hover:-translate-y-2">
                <div className="absolute inset-0 z-0">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-dark-200 bg-opacity-70 group-hover:bg-opacity-60 transition-all duration-300"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                  <h3 className="text-3xl font-bold text-gold mb-3">{service.title}</h3>
                  <p className="text-gray-200 mb-6">{service.subtitle}</p>
                  <Link href={service.link} className="text-white font-medium group-hover:text-gold transition-colors inline-block px-6 py-2 border border-gold rounded-full hover:bg-gold hover:text-dark-100 mt-auto">
                    {service.btnText} &larr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-neutral-50 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">{t('Featured.title')}</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {properties.map(prop => (
              <PropertyCard key={prop.id} property={{...prop, locale}} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href={`/${locale}/properties`} className="inline-block border-2 border-gold text-gold font-bold px-8 py-3 rounded-md hover:bg-gold hover:text-white transition-all">
              {t('Featured.view_all')}
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-dark-100 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80" alt="About Afaq" className="rounded-2xl shadow-2xl" />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-bold">{t('About.title')}</h2>
              <div className="w-16 h-1 bg-gold"></div>
              <h3 className="text-2xl text-gold">{t('About.subtitle')}</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {t('About.description')}
              </p>
              <Link href={`/${locale}/contact`} className="btn-gold inline-block mt-4">
                {t('About.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <ContactForm />
    </>
  );
}
