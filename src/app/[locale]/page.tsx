import { getTranslations } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import PropertySearch from '@/components/home/PropertySearch';
import PropertyCard from '@/components/ui/PropertyCard';
import ContactForm from '@/components/home/ContactForm';
import Link from 'next/link';

// Data factory based on locale
const getMockProperties = (locale: string) => [
  {
    id: "1",
    title: locale === 'en' ? "175 Sqm Apartment" : "شقة سكنية 175 متر",
    location: locale === 'en' ? "10th of Ramadan, Egypt" : "العاشر من رمضان، مصر",
    price: 1850000,
    area: 175,
    beds: 3,
    baths: 2,
    type: locale === 'en' ? "Apartment" : "شقة",
    image: "/images/units/1.png",
    status: "available" as const,
  },
  {
    id: "2",
    title: locale === 'en' ? "170 Sqm Unit (Front)" : "وحدة 170 متر (أمامي)",
    location: locale === 'en' ? "10th of Ramadan, Egypt" : "العاشر من رمضان، مصر",
    price: 1900000,
    area: 170,
    beds: 3,
    baths: 2,
    type: locale === 'en' ? "Apartment" : "شقة",
    image: "/images/units/4.png",
    status: "available" as const,
  },
  {
    id: "3",
    title: locale === 'en' ? "170 Sqm Unit (Side)" : "وحدة 170 متر (جانبي)",
    location: locale === 'en' ? "10th of Ramadan, Egypt" : "العاشر من رمضان، مصر",
    price: 1900000,
    area: 170,
    beds: 3,
    baths: 2,
    type: locale === 'en' ? "Apartment" : "شقة",
    image: "/images/units/7.png",
    status: "available" as const,
  },
  {
    id: "4",
    title: locale === 'en' ? "180 Sqm Unit (Side)" : "وحدة 180 متر (جانبي)",
    location: locale === 'en' ? "10th of Ramadan, Egypt" : "العاشر من رمضان، مصر",
    price: 1900000,
    area: 180,
    beds: 3,
    baths: 2,
    type: locale === 'en' ? "Apartment" : "شقة",
    image: "/images/units/10.png",
    status: "available" as const,
  },
  {
    id: "5",
    title: locale === 'en' ? "180 Sqm Unit (Front)" : "وحدة 180 متر (أمامي)",
    location: locale === 'en' ? "10th of Ramadan, Egypt" : "العاشر من رمضان، مصر",
    price: 1900000,
    area: 180,
    beds: 3,
    baths: 2,
    type: locale === 'en' ? "Apartment" : "شقة",
    image: "/images/units/13.png",
    status: "available" as const,
  },
  {
    id: "6",
    title: locale === 'en' ? "210 Sqm Unit (Front)" : "وحدة 210 متر (أمامي)",
    location: locale === 'en' ? "10th of Ramadan, Egypt" : "العاشر من رمضان، مصر",
    price: 2150000,
    area: 210,
    beds: 3,
    baths: 3,
    type: locale === 'en' ? "Apartment" : "شقة",
    image: "/images/units/16.png",
    status: "available" as const,
  },
  {
    id: "7",
    title: locale === 'en' ? "210 Sqm Unit (Back)" : "وحدة 210 متر (خلفي)",
    location: locale === 'en' ? "10th of Ramadan, Egypt" : "العاشر من رمضان، مصر",
    price: 2150000,
    area: 210,
    beds: 3,
    baths: 3,
    type: locale === 'en' ? "Apartment" : "شقة",
    image: "/images/units/19.png",
    status: "available" as const,
  }
];

const getServices = (locale: string) => [
  {
    id: "properties",
    title: locale === 'en' ? "Real Estate" : "العقارات",
    subtitle: locale === 'en' ? "Buy, sell, and rent properties" : "بيع، شراء، وإيجار العقارات",
    link: `/${locale}/properties`,
    btnText: locale === 'en' ? "Explore Properties" : "تصفح العقارات",
    image: "/images/units/1.png"
  },
  {
    id: "finishings",
    title: locale === 'en' ? "Finishings" : "تشطيباتنا",
    subtitle: locale === 'en' ? "High quality interior finishing packages" : "باقات تشطيب داخلي عالية الجودة",
    link: `/${locale}/services`,
    btnText: locale === 'en' ? "Explore Finishings" : "استكشف التشطيبات",
    image: "/images/finishings/diamond.jpg"
  },
  {
    id: "security",
    title: locale === 'en' ? "Security Systems" : "الأنظمة الأمنية",
    subtitle: locale === 'en' ? "Smart security and surveillance solutions" : "حلول ذكية للمراقبة والأنظمة الأمنية",
    link: `/${locale}/security`,
    btnText: locale === 'en' ? "Explore Security" : "استكشف الأنظمة",
    image: "/images/security/surveillance.jpg"
  }
];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations();
  const properties = getMockProperties(locale);
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
