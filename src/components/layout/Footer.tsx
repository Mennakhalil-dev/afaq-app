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
              <li className="flex flex-col space-y-1">
                <span>📍 مدينة العاشر من رمضان - امتداد طريق مستشفي الجامعة - فيلا 75</span>
                <a href="https://www.google.com/maps/dir/30.3360652,31.7523622/%D8%A2%D9%81%D8%A7%D9%82+%D9%84%D9%84%D8%A5%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1%D8%A7%D8%AA+%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%8A%D8%A9+%D9%88%D8%A7%D9%84%D8%AA%D8%B4%D8%B7%D9%8A%D8%A8%D8%A7%D8%AA+%D9%88%D9%83%D8%A7%D9%85%D9%8A%D8%B1%D8%A7%D8%AA+%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D9%82%D8%A8%D8%A9+%D9%88%D8%A3%D9%86%D8%B8%D9%85%D8%A9+%D8%A7%D9%84%D8%A3%D9%85%D8%A7%D9%86%D8%8C+%D8%A7%D9%85%D8%AA%D8%AF%D8%A7%D8%AF+%D8%B7%D8%B1%D9%8A%D9%82+%D9%85%D8%B3%D8%AA%D8%B4%D9%81%D9%8A+%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D9%87+%D9%88%D8%A8%D8%AC%D9%88%D8%A7%D8%B1+%D8%B5%D9%86%D9%8A%D9%87+%D9%83%D9%85%D9%8A%D9%86+%D8%A7%D8%A8%D9%88+%D8%AD%D9%85%D8%A7%D8%AF%D8%8C+%D8%AB%D8%A7%D9%86+%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1+%D9%85%D9%86+%D8%B1%D9%85%D8%B6%D8%A7%D9%86%D8%8C+%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%A7%D9%84%D8%B4%D8%B1%D9%82%D9%8A%D8%A9+44629%E2%80%AD/@30.3289591,31.7761106,13z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x14f8076de9cff2cb:0xf4ae20779d2bc56e!2m2!1d31.7250676!2d30.3313628!3e0?entry=ttu&g_ep=EgoyMDI2MDgyMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="text-gold text-xs hover:underline mt-1">
                  🗺️ عرض الموقع على خرائط Google
                </a>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <span dir="ltr">01041952008</span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <span>afaq.support.egypt@gmail.com</span>
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
