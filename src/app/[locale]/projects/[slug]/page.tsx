import ComingSoon from '@/components/ui/ComingSoon';
import { getTranslations } from 'next-intl/server';

export default async function ProjectDetailsPage({ params: { locale } }: { params: { locale: string } }) {
  return <div className="pt-24"><ComingSoon locale={locale} title={locale === 'en' ? 'Project Details' : 'تفاصيل المشروع'} /></div>;
}
