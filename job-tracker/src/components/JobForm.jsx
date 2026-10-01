import { useState } from 'react';

export default function JobForm({ addJob }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Bekliyor');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || !position.trim()) return;

    addJob({
      id: crypto.randomUUID(), 
      company: company.trim(),
      position: position.trim(),
      status,
      date: new Date().toLocaleDateString('tr-TR')
    });
    setCompany(''); setPosition(''); setStatus('Bekliyor');
  };

  return (
    // justify-between KALDIRILDI
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
      <h2 className="text-lg font-bold mb-6 text-slate-800 border-b border-slate-100 pb-3">Yeni Başvuru Ekle</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Şirket Adı <span className="text-red-500">*</span></label>
          <input type="text" required maxLength={50} placeholder="Örn: Google" value={company} onChange={(e) => setCompany(e.target.value)}
            className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Pozisyon <span className="text-red-500">*</span></label>
          <input type="text" required maxLength={50} placeholder="Örn: Frontend" value={position} onChange={(e) => setPosition(e.target.value)}
            className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Başlangıç Durumu</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium cursor-pointer">
            <option value="Bekliyor">Bekliyor</option>
            <option value="Mülakat">Mülakat Sürecinde</option>
            <option value="Reddedildi">Reddedildi</option>
            <option value="Kabul Edildi">Kabul Edildi 🚀</option>
          </select>
        </div>
      </div>

      {/* mt-6 azaltıldı, buton inputlara daha yakın oldu */}
      <div className="flex justify-end mt-2">
        <button type="submit" className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 font-semibold transition-all shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg> Listeye Ekle
        </button>
      </div>
    </form>
  );
}
