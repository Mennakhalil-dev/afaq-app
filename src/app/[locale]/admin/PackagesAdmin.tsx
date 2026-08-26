'use client';
import { useState, useEffect } from 'react';
import { addPackage, getPackages, deletePackage, updatePackage, Package } from '@/lib/services';

export default function PackagesAdmin({ type }: { type: 'finishings' | 'security' }) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [subtitleAr, setSubtitleAr] = useState('');
  const [subtitleEn, setSubtitleEn] = useState('');
  const [price, setPrice] = useState('');
  const [priceTextAr, setPriceTextAr] = useState('');
  const [priceTextEn, setPriceTextEn] = useState('');
  const [includesAr, setIncludesAr] = useState('');
  const [includesEn, setIncludesEn] = useState('');
  const [featuresAr, setFeaturesAr] = useState('');
  const [featuresEn, setFeaturesEn] = useState('');

  useEffect(() => {
    loadPackages();
  }, [type]);

  async function loadPackages() {
    const pkgs = await getPackages(type);
    setPackages(pkgs);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: Omit<Package, 'id'> = {
        type,
        title_en: titleEn,
        title_ar: titleAr,
        subtitle_en: subtitleEn,
        subtitle_ar: subtitleAr,
        price,
        priceText_en: priceTextEn,
        priceText_ar: priceTextAr,
        includes_en: includesEn,
        includes_ar: includesAr,
        features_en: featuresEn,
        features_ar: featuresAr
      };

      if (editingId) {
        await updatePackage(editingId, payload);
        alert('تم التعديل بنجاح!');
        setEditingId(null);
      } else {
        await addPackage(payload);
        alert('تمت الإضافة بنجاح!');
      }
      
      loadPackages();
      resetForm();
    } catch (err) {
      console.error(err);
      alert('حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p: Package) => {
    setEditingId(p.id!);
    setTitleAr(p.title_ar);
    setTitleEn(p.title_en);
    setSubtitleAr(p.subtitle_ar);
    setSubtitleEn(p.subtitle_en);
    setPrice(p.price);
    setPriceTextAr(p.priceText_ar || '');
    setPriceTextEn(p.priceText_en || '');
    setIncludesAr(p.includes_ar);
    setIncludesEn(p.includes_en);
    setFeaturesAr(p.features_ar);
    setFeaturesEn(p.features_en);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      await deletePackage(id);
      loadPackages();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitleAr(''); setTitleEn('');
    setSubtitleAr(''); setSubtitleEn('');
    setPrice('');
    setPriceTextAr(''); setPriceTextEn('');
    setIncludesAr(''); setIncludesEn('');
    setFeaturesAr(''); setFeaturesEn('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Add/Edit Form */}
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-dark-100">{editingId ? 'تعديل باقة' : 'إضافة باقة جديدة'}</h2>
          {editingId && (
            <button onClick={resetForm} className="text-sm text-gray-500 hover:text-red-500 font-bold">
              إلغاء التعديل
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">العنوان (عربي)</label>
              <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">العنوان (إنجليزي)</label>
              <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className="w-full border p-2 rounded" dir="ltr" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">العنوان الفرعي (عربي)</label>
              <input type="text" value={subtitleAr} onChange={(e) => setSubtitleAr(e.target.value)} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">العنوان الفرعي (إنجليزي)</label>
              <input type="text" value={subtitleEn} onChange={(e) => setSubtitleEn(e.target.value)} className="w-full border p-2 rounded" dir="ltr" required />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">كلمة السعر (عربي)</label>
              <input type="text" value={priceTextAr} onChange={(e) => setPriceTextAr(e.target.value)} className="w-full border p-2 rounded" placeholder="مثال: بسعر" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">كلمة السعر (إنجليزي)</label>
              <input type="text" value={priceTextEn} onChange={(e) => setPriceTextEn(e.target.value)} className="w-full border p-2 rounded" dir="ltr" placeholder="Price" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">السعر</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">المكونات/المحتويات (عربي)</label>
              <textarea value={includesAr} onChange={(e) => setIncludesAr(e.target.value)} className="w-full border p-2 rounded h-24" placeholder="افصل بين كل مكون بفاصلة ,"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">المكونات/المحتويات (إنجليزي)</label>
              <textarea value={includesEn} onChange={(e) => setIncludesEn(e.target.value)} className="w-full border p-2 rounded h-24" dir="ltr" placeholder="Comma separated..."></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">المميزات (عربي)</label>
              <textarea value={featuresAr} onChange={(e) => setFeaturesAr(e.target.value)} className="w-full border p-2 rounded h-24" placeholder="افصل بين كل ميزة بفاصلة ,"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">المميزات (إنجليزي)</label>
              <textarea value={featuresEn} onChange={(e) => setFeaturesEn(e.target.value)} className="w-full border p-2 rounded h-24" dir="ltr" placeholder="Comma separated..."></textarea>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-gold py-3 rounded-lg font-bold mt-4">
            {loading ? 'جاري الحفظ...' : (editingId ? 'حفظ التعديلات' : 'إضافة')}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-dark-100 mb-6">البيانات الحالية ({packages.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
              <h3 className="font-bold text-lg text-dark-100">{p.title_ar}</h3>
              <p className="text-gray-500 text-sm">{p.subtitle_ar}</p>
              <p className="text-gold font-bold">{p.price} ج.م</p>
              <div className="flex items-center gap-3 mt-2">
                <button onClick={() => handleEdit(p)} className="text-gold text-sm font-bold hover:underline">تعديل</button>
                <button onClick={() => p.id && handleDelete(p.id)} className="text-red-500 text-sm font-bold hover:underline">حذف</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
