import ComingSoon from '@/components/ui/ComingSoon';
import { getTranslations } from 'next-intl/server';

export default async function ServiceDetailsPage({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
  // We can just use the generic ComingSoon component here
  return <div className="pt-24"><ComingSoon locale={locale} title={locale === 'en' ? 'Service Details' : 'تفاصيل الخدمة'} /></div>;
}
