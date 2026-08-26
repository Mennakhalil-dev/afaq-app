import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BedDouble, Bath, Maximize } from 'lucide-react';

interface PropertyProps {
  id: string;
  title: string;
  location: string;
  price: number;
  area: number;
  beds: number;
  baths: number;
  type: string;
  image: string;
  status: 'available' | 'sold' | 'rented';
  locale: string;
}

export default function PropertyCard({ property }: { property: PropertyProps }) {
  const t = useTranslations('Common');
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur text-dark-200 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {property.type}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark-200 mb-2 line-clamp-1">{property.title}</h3>
        <p className="text-gray-500 text-sm mb-4">{property.location}</p>
        
        <div className="text-gold font-bold text-2xl mb-6">
          {property.price.toLocaleString()} {t('currency')}
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-6 text-gray-600 text-sm">
          <div className="flex items-center gap-1.5">
            <Maximize size={18} className="text-gold" />
            <span>{property.area} {t('sqm')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BedDouble size={18} className="text-gold" />
            <span>{property.beds} {t('beds')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={18} className="text-gold" />
            <span>{property.baths} {t('baths')}</span>
          </div>
        </div>
        
        <Link 
          href={`/${property.locale}/properties/${property.id}`}
          className="block w-full text-center bg-gray-50 hover:bg-gold hover:text-white text-dark-100 border border-gray-200 hover:border-gold transition-colors py-3 rounded-md font-medium"
        >
          {t('view_details')}
        </Link>
      </div>
    </div>
  );
}
