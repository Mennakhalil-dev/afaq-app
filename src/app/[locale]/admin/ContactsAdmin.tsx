'use client';
import { useState, useEffect } from 'react';
import { getContacts } from '@/lib/services';

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getContacts();
      setContacts(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="text-center py-20">جاري التحميل...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-dark-100">رسائل العملاء ({contacts.length})</h2>
      </div>
      
      {contacts.length === 0 ? (
        <div className="p-10 text-center text-gray-500">لا توجد رسائل حتى الآن</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-4 font-bold">التاريخ</th>
                <th className="p-4 font-bold">الاسم</th>
                <th className="p-4 font-bold">رقم الهاتف</th>
                <th className="p-4 font-bold">نوع الخدمة</th>
                <th className="p-4 font-bold">البريد الإلكتروني</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-gray-500" dir="ltr">{new Date(c.createdAt).toLocaleDateString('en-GB')} {new Date(c.createdAt).toLocaleTimeString('en-GB')}</td>
                  <td className="p-4 font-medium">{c.name}</td>
                  <td className="p-4 text-gold font-bold" dir="ltr">{c.phone}</td>
                  <td className="p-4">
                    <span className="bg-dark-100 text-white px-3 py-1 rounded-full text-xs">{c.service_type}</span>
                  </td>
                  <td className="p-4 text-gray-500">{c.email || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
