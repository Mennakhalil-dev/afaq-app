"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PropertySearch({ locale }: { locale: string }) {
  const t = useTranslations('Search');
  const router = useRouter();

  const [type, setType] = useState('All');
  const [city, setCity] = useState('All');
  const [operation, setOperation] = useState('Buy');

  const handleSearch = () => {
    // Construct query parameters
    const params = new URLSearchParams();
    if (type !== 'All') params.append('type', type);
    if (city !== 'All') params.append('city', city);
    if (operation !== 'Buy') params.append('operation', operation);
    
    // Navigate to properties page with queries
    router.push(`/${locale}/properties?${params.toString()}`);
  };

  return (
    <div className="relative -mt-16 z-30 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('property_type')}</label>
            <select 
              className="input-field bg-gray-50"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="All">{locale === 'en' ? 'All' : 'الكل'}</option>
              <option value="Apartment">{locale === 'en' ? 'Apartments' : 'شقق'}</option>
              <option value="Duplex">{locale === 'en' ? 'Duplexes' : 'دوبلكسات'}</option>
              <option value="House">{locale === 'en' ? 'Houses' : 'بيوت'}</option>
              <option value="Villa">{locale === 'en' ? 'Villas' : 'فيلات'}</option>
              <option value="Land">{locale === 'en' ? 'Land' : 'أراضي'}</option>
              <option value="Factory">{locale === 'en' ? 'Factories' : 'مصانع'}</option>
              <option value="Rental">{locale === 'en' ? 'Rentals' : 'إيجارات'}</option>
            </select>
          </div>
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('city')}</label>
            <select 
              className="input-field bg-gray-50"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="All">{locale === 'en' ? 'All Cities' : 'كل المدن'}</option>
              <option value="10th of Ramadan">{locale === 'en' ? '10th of Ramadan' : 'العاشر من رمضان'}</option>
              <option value="New Cairo">{locale === 'en' ? 'New Cairo' : 'القاهرة الجديدة'}</option>
              <option value="New Capital">{locale === 'en' ? 'New Capital' : 'العاصمة الإدارية'}</option>
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('operation_type')}</label>
            <select 
              className="input-field bg-gray-50"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            >
              <option value="Buy">{locale === 'en' ? 'Buy' : 'شراء'}</option>
              <option value="Rent">{locale === 'en' ? 'Rent' : 'إيجار'}</option>
            </select>
          </div>

          <div className="flex-1 w-full flex flex-col justify-end">
            <button 
              onClick={handleSearch}
              className="btn-gold w-full py-3 px-4 flex items-center justify-center font-bold text-lg rounded-md"
            >
              {locale === 'en' ? 'Search' : 'بحث'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
