'use client';
import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import PropertyCard from '@/components/ui/PropertyCard';
import { getProperties, Property } from '@/lib/services';

function PropertiesContent({ locale }: { locale: string }) {
  const t = useTranslations('Search');
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  const pType = searchParams.get('type') || 'All';
  const pCity = searchParams.get('city') || 'All';
  const pOp = searchParams.get('operation') || 'All';

  const [type, setType] = useState(pType);
  const [city, setCity] = useState(pCity);
  const [operation, setOperation] = useState(pOp);

  useEffect(() => {
    async function load() {
      const props = await getProperties();
      setAllProperties(props);
      setLoading(false);
    }
    load();
  }, []);

  // Sync state when URL changes
  useEffect(() => {
    setType(searchParams.get('type') || 'All');
    setCity(searchParams.get('city') || 'All');
    setOperation(searchParams.get('operation') || 'All');
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (type !== 'All') params.set('type', type);
    if (city !== 'All') params.set('city', city);
    if (operation !== 'All') params.set('operation', operation);
    
    router.push(`/${locale}/properties?${params.toString()}`);
  };

  const filteredProperties = allProperties.filter(prop => {
    const matchType = type === 'All' || prop.type === type;
    const matchCity = city === 'All' || prop.cityId === city;
    const matchOp = operation === 'All' || prop.operation === operation;
    return matchType && matchCity && matchOp;
  });

  return (
    <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-dark-100 mb-2">{t('property_type')}</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-neutral-50 border border-gray-200 text-dark-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50">
                <option value="All">{locale === 'en' ? 'All Types' : 'كل الأنواع'}</option>
                <option value="Apartment">{locale === 'en' ? 'Apartments' : 'شقق'}</option>
                <option value="Duplex">{locale === 'en' ? 'Duplexes' : 'دوبلكس'}</option>
                <option value="House">{locale === 'en' ? 'Houses' : 'بيوت'}</option>
                <option value="Villa">{locale === 'en' ? 'Villas' : 'فلل'}</option>
                <option value="Land">{locale === 'en' ? 'Lands' : 'أراضي'}</option>
                <option value="Factory">{locale === 'en' ? 'Factories' : 'مصانع'}</option>
                <option value="Rental">{locale === 'en' ? 'Rentals' : 'إيجارات'}</option>
              </select>
            </div>
            
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-dark-100 mb-2">{t('city')}</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-neutral-50 border border-gray-200 text-dark-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50">
                <option value="All">{locale === 'en' ? 'All Locations' : 'كل المدن'}</option>
                <option value="10th of Ramadan">{locale === 'en' ? '10th of Ramadan' : 'العاشر من رمضان'}</option>
                <option value="New Cairo">{locale === 'en' ? 'New Cairo' : 'القاهرة الجديدة'}</option>
              </select>
            </div>

            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-dark-100 mb-2">{t('operation_type')}</label>
              <select value={operation} onChange={(e) => setOperation(e.target.value)} className="w-full bg-neutral-50 border border-gray-200 text-dark-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50">
                <option value="All">{locale === 'en' ? 'All' : 'الكل'}</option>
                <option value="Buy">{locale === 'en' ? 'Buy' : 'شراء'}</option>
                <option value="Rent">{locale === 'en' ? 'Rent' : 'إيجار'}</option>
              </select>
            </div>

            <button onClick={handleSearch} className="btn-gold w-full md:w-auto px-8 h-[50px] flex items-center justify-center font-bold">
              {t('search_btn')}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-100 mb-2">
            {locale === 'en' ? 'Available Properties' : 'العقارات المتاحة'}
          </h1>
          <p className="text-gray-500">
            {locale === 'en' 
              ? `Showing ${filteredProperties.length} results` 
              : `عرض ${filteredProperties.length} نتيجة`}
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={{
                    id: property.id!,
                    title: locale === 'en' ? property.title_en : property.title_ar,
                    location: locale === 'en' ? property.location_en : property.location_ar,
                    price: property.price,
                    area: property.area,
                    beds: property.beds,
                    baths: property.baths,
                    type: locale === 'en' ? property.type : property.typeAr,
                    image: property.image,
                    images: property.images,
                    status: property.status,
                    locale: locale
                  }} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-lg">
                  {locale === 'en' ? 'No properties found matching your search.' : 'لم يتم العثور على عقارات مطابقة لبحثك.'}
                </p>
                <button 
                  onClick={() => router.push(`/${locale}/properties`)}
                  className="mt-4 text-gold font-bold hover:underline"
                >
                  {locale === 'en' ? 'Clear Filters' : 'مسح عوامل التصفية'}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function PropertiesPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div></div>}>
      <PropertiesContent locale={locale} />
    </Suspense>
  );
}
