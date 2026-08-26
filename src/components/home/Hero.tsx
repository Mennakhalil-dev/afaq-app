import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations('Hero');

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder for the dark cinematic architectural image */}
        <div className="absolute inset-0 bg-dark-200 bg-opacity-40 z-10" />
        <img 
          src="/images/hero-bg.jpg" 
          alt="Luxury Real Estate" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 z-20 text-center relative">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
          {t('subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${locale}/properties`} className="btn-gold w-full sm:w-auto text-lg">
            {t('cta_primary')}
          </Link>
          <Link href={`/${locale}/contact`} className="w-full sm:w-auto px-6 py-3 rounded-md font-medium text-white border border-white hover:bg-white hover:text-dark-200 transition-all duration-300 text-lg">
            {t('cta_secondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}
