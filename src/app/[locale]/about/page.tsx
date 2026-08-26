import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="pt-24 pb-20 bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-dark-100 mb-4">{locale === 'en' ? 'About Us' : 'من نحن'}</h1>
            <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>
            <img src="/images/logo.png" alt="Afaq Logo" className="h-24 mx-auto mb-8" />
          </div>
          
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-justify">
            <p>
              {locale === 'en' 
                ? "Afaq is a leading real estate development and marketing company based in the 10th of Ramadan City, Egypt. We are dedicated to providing our clients with top-tier residential, commercial, and industrial properties."
                : "آفاق هي شركة رائدة في مجال التطوير والتسويق العقاري مقرها في مدينة العاشر من رمضان، مصر. نحن ملتزمون بتزويد عملائنا بأرقى العقارات السكنية والتجارية والصناعية التي تلبي كافة الاحتياجات والطموحات."}
            </p>
            <p>
              {locale === 'en' 
                ? "Our comprehensive services include not only property sales and rentals, but also modern finishing solutions, advanced surveillance systems, and integrated security systems, ensuring a holistic approach to your property needs."
                : "خدماتنا الشاملة لا تقتصر فقط على بيع وتأجير العقارات، بل تشمل أيضاً حلول التشطيبات العصرية، أنظمة المراقبة المتقدمة، والأنظمة الأمنية المتكاملة، مما يضمن تلبية كافة احتياجات عقارك تحت سقف واحد."}
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link href={`/${locale}/contact`} className="btn-gold px-8 py-3 rounded text-lg font-bold">
              {locale === 'en' ? 'Contact Us Today' : 'تواصل معنا اليوم'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
