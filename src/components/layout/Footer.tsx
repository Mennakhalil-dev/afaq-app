import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations();
  
  return (
    <footer className="bg-dark-300 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <img src="/images/logo.png" alt="Afaq Logo" className="h-16 w-auto" />
            </div>
            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              {t('Footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 border-b border-gold pb-2 inline-block">
              {t('Footer.quick_links')}
            </h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/properties`} className="hover:text-gold transition-colors">{t('Navigation.properties')}</Link></li>
              <li><Link href={`/${locale}/services`} className="hover:text-gold transition-colors">{t('Navigation.services')}</Link></li>
              <li><Link href={`/${locale}/projects`} className="hover:text-gold transition-colors">{t('Navigation.projects')}</Link></li>
              <li><Link href={`/${locale}/about`} className="hover:text-gold transition-colors">{t('Navigation.about')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 border-b border-gold pb-2 inline-block">
              {t('Footer.contact_info')}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <span>📍 العاشر من رمضان، مصر</span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <span dir="ltr">01041952008</span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <span>afaq.supplies@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            {t('Footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
