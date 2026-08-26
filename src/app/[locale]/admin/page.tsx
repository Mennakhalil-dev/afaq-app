'use client';
import { useState, useEffect } from 'react';
import { addProperty, getProperties, deleteProperty, updateProperty, Property } from '@/lib/services';
import { useRouter } from 'next/navigation';

import ContactsAdmin from './ContactsAdmin';
import PackagesAdmin from './PackagesAdmin';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'properties' | 'finishings' | 'security' | 'contacts'>('properties');
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [locationAr, setLocationAr] = useState('');
  const [locationEn, setLocationEn] = useState('');
  const [cityId, setCityId] = useState('10th of Ramadan');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [type, setType] = useState('Apartment');
  const [typeAr, setTypeAr] = useState('شقة');
  const [status, setStatus] = useState<'available'|'sold'|'rented'>('available');
  const [operation, setOperation] = useState<'Buy'|'Rent'>('Buy');
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null]);
  const [planFile, setPlanFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');

  useEffect(() => {
    if (authenticated && activeTab === 'properties') {
      loadProperties();
    }
  }, [authenticated, activeTab]);

  async function loadProperties() {
    const props = await getProperties();
    setProperties(props);
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'afaq2026') {
      setAuthenticated(true);
    } else {
      alert('كلمة المرور خاطئة');
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setType(val);
    const typesAr: Record<string, string> = {
      'Apartment': 'شقة', 'Duplex': 'دوبلكس', 'House': 'بيت', 
      'Villa': 'فيلا', 'Land': 'أرض', 'Factory': 'مصنع', 'Rental': 'إيجار'
    };
    setTypeAr(typesAr[val] || 'أخرى');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId && (!imageFiles || imageFiles.length === 0)) {
      alert('الرجاء اختيار صورة الواجهة');
      return;
    }
    setLoading(true);
    setUploading(true);

    try {
      const uploadedImageUrls: string[] = [];
      let planImageUrl = undefined;

      // 1. Upload Main Images
      const validFiles = imageFiles.filter(f => f !== null) as File[];
      if (validFiles.length > 0) {
        for (let i = 0; i < validFiles.length; i++) {
          const formData = new FormData();
          formData.append('image', validFiles[i]);
          const res = await fetch('/api/upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (data.url) uploadedImageUrls.push(data.url);
        }
      }

      // 2. Upload Plan Image (if exists)
      if (planFile) {
        const planData = new FormData();
        planData.append('image', planFile);
        const planRes = await fetch('/api/upload', { method: 'POST', body: planData });
        const planDataJson = await planRes.json();
        if (planDataJson.url) planImageUrl = planDataJson.url;
      }

      // 3. Prepare Payload
      const payload: Partial<Property> = {
        title_en: titleEn,
        title_ar: titleAr,
        location_en: locationEn,
        location_ar: locationAr,
        cityId,
        price: Number(price),
        area: Number(area),
        beds: Number(beds),
        baths: Number(baths),
        type,
        typeAr,
        status,
        operation,
        description: description,
        features: features
      };
      
      if (uploadedImageUrls.length > 0) {
        payload.image = uploadedImageUrls[0];
        payload.images = uploadedImageUrls;
      }
      if (planImageUrl) payload.planImage = planImageUrl;

      if (editingId) {
        await updateProperty(editingId, payload);
        alert('تم تعديل العقار بنجاح!');
        setEditingId(null);
      } else {
        await addProperty(payload as Omit<Property, 'id'>);
        alert('تم إضافة العقار بنجاح!');
      }
      
      loadProperties();
      
      // Reset form
      setTitleAr(''); setTitleEn(''); setLocationAr(''); setLocationEn('');
      setPrice(''); setArea(''); setBeds(''); setBaths('');
      setImageFiles([null]); setPlanFile(null); setDescription(''); setFeatures('');
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء حفظ العقار');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleEdit = (p: Property) => {
    setEditingId(p.id!);
    setTitleAr(p.title_ar);
    setTitleEn(p.title_en);
    setLocationAr(p.location_ar);
    setLocationEn(p.location_en);
    setCityId(p.cityId);
    setPrice(p.price.toString());
    setArea(p.area.toString());
    setBeds(p.beds.toString());
    setBaths(p.baths.toString());
    setType(p.type);
    setTypeAr(p.typeAr);
    setStatus(p.status);
    setOperation(p.operation);
    setDescription(p.description || '');
    setFeatures(p.features || '');
    setImageFiles([null]);
    setPlanFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      await deleteProperty(id);
      loadProperties();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitleAr(''); setTitleEn(''); setLocationAr(''); setLocationEn('');
    setPrice(''); setArea(''); setBeds(''); setBaths('');
    setImageFiles([null]); setPlanFile(null); setDescription(''); setFeatures('');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <h1 className="text-3xl font-bold text-dark-100 mb-6">لوحة الإدارة</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              className="w-full text-center px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="ltr"
            />
            <button type="submit" className="w-full btn-gold py-3 rounded-lg font-bold">دخول</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-20" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-dark-100 mb-8">لوحة الإدارة المركزية</h1>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
          <button 
            onClick={() => setActiveTab('properties')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'properties' ? 'bg-gold text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            العقارات
          </button>
          <button 
            onClick={() => setActiveTab('finishings')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'finishings' ? 'bg-gold text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            التشطيبات
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'security' ? 'bg-gold text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            أنظمة الأمان
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'contacts' ? 'bg-gold text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            رسائل العملاء
          </button>
        </div>

        {activeTab === 'contacts' && <ContactsAdmin />}
        {activeTab === 'finishings' && <PackagesAdmin type="finishings" />}
        {activeTab === 'security' && <PackagesAdmin type="security" />}

        {activeTab === 'properties' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add/Edit Form */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dark-100">{editingId ? 'تعديل العقار' : 'إضافة عقار جديد'}</h2>
              {editingId && (
                <button onClick={cancelEdit} className="text-sm text-gray-500 hover:text-red-500 font-bold">
                  إلغاء التعديل
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">العنوان (عربي)</label>
                  <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} className="w-full border p-2 rounded" required placeholder="مثال: شقة فاخرة" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">العنوان (إنجليزي)</label>
                  <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className="w-full border p-2 rounded" dir="ltr" required placeholder="Luxury Apt" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">الموقع (عربي)</label>
                  <input type="text" value={locationAr} onChange={(e) => setLocationAr(e.target.value)} className="w-full border p-2 rounded" required placeholder="العاشر من رمضان" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">الموقع (إنجليزي)</label>
                  <input type="text" value={locationEn} onChange={(e) => setLocationEn(e.target.value)} className="w-full border p-2 rounded" dir="ltr" required placeholder="10th of Ramadan" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">السعر</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded" required dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">المساحة (متر)</label>
                  <input type="number" value={area} onChange={(e) => setArea(e.target.value)} className="w-full border p-2 rounded" required dir="ltr" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neutral-50 p-4 rounded-xl border border-gray-100 space-y-3">
                <label className="block text-sm font-bold text-gray-700 mb-1">صور العقار</label>
                {imageFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-xs shrink-0">{index + 1}</div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const newFiles = [...imageFiles];
                        newFiles[index] = e.target.files?.[0] || null;
                        setImageFiles(newFiles);
                      }} 
                      className="w-full border p-2 rounded bg-white text-sm" 
                    />
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => setImageFiles([...imageFiles, null])}
                  className="text-gold font-bold text-sm w-full py-2 border border-dashed border-gold rounded mt-2 hover:bg-gold/10 transition-colors"
                >
                  + إضافة صورة أخرى
                </button>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">صورة المخطط (اختياري)</label>
                <input type="file" accept="image/*" onChange={(e) => setPlanFile(e.target.files?.[0] || null)} className="w-full border p-2 rounded" />
              </div>
            </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">غرف النوم</label>
                  <input type="number" value={beds} onChange={(e) => setBeds(e.target.value)} className="w-full border p-2 rounded" required dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">الحمامات</label>
                  <input type="number" value={baths} onChange={(e) => setBaths(e.target.value)} className="w-full border p-2 rounded" required dir="ltr" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">النوع</label>
                  <select value={type} onChange={handleTypeChange} className="w-full border p-2 rounded">
                    <option value="Apartment">شقة</option>
                    <option value="Duplex">دوبلكس</option>
                    <option value="Villa">فيلا</option>
                    <option value="House">بيت</option>
                    <option value="Land">أرض</option>
                    <option value="Factory">مصنع</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">العملية</label>
                  <select value={operation} onChange={(e: any) => setOperation(e.target.value)} className="w-full border p-2 rounded">
                    <option value="Buy">بيع</option>
                    <option value="Rent">إيجار</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">التفاصيل / الوصف</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded h-24" placeholder="اكتب تفاصيل ومميزات العقار هنا..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">المميزات الإضافية (افصل بينها بفاصلة ,)</label>
                  <textarea value={features} onChange={(e) => setFeatures(e.target.value)} className="w-full border p-2 rounded h-24" placeholder="مثال: جراج خاص, تكييف مركزي, أمن وحراسة..."></textarea>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full btn-gold py-3 rounded-lg font-bold mt-4">
                {uploading ? 'جاري حفظ العقار...' : (editingId ? 'حفظ التعديلات' : 'إضافة العقار للموقع')}
              </button>
            </form>
          </div>

          {/* Properties List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-dark-100 mb-6">العقارات الحالية ({properties.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <img src={p.image} alt={p.title_ar} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-dark-100">{p.title_ar}</h3>
                    <p className="text-gray-500 text-sm mb-2">{p.price.toLocaleString()} ج.م</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => handleEdit(p)} className="text-gold text-sm font-bold hover:underline">تعديل</button>
                      <button onClick={() => p.id && handleDelete(p.id)} className="text-red-500 text-sm font-bold hover:underline">حذف</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
