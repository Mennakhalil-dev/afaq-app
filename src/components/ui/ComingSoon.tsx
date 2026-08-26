import Link from 'next/link';
import { Hammer } from 'lucide-react';

export default function ComingSoon({ locale, title }: { locale: string, title: string }) {
  const isEn = locale === 'en';
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-neutral-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Hammer className="text-gold" size={40} />
        </div>
        <h1 className="text-3xl font-bold text-dark-100 mb-4">{title}</h1>
        <p className="text-gray-500 mb-8 text-lg">
          {isEn 
            ? "We are currently working on improving our services in this section to provide you with the best experience." 
            : "نعمل حالياً على تحسين وتطوير خدماتنا في هذا القسم لنقدم لك أفضل تجربة ممكنة."}
        </p>
        <Link 
          href={`/${locale}/properties`}
          className="btn-gold inline-block px-8 py-3 text-lg font-bold"
        >
          {isEn ? "Continue Browsing" : "أكمل التصفح"}
        </Link>
      </div>
    </div>
  );
}
