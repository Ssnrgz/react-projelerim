import { useState } from 'react';

export default function BookForm({ addBook, books }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pages, setPages] = useState('');
  const [status, setStatus] = useState('Okunması Planlanıyor');
  
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const isDuplicate = books.some(b => 
      b.title.trim().toLowerCase() === title.trim().toLowerCase() && 
      b.author.trim().toLowerCase() === author.trim().toLowerCase()
    );

    if (isDuplicate) {
      // Artık süre yok, pencere açılacak
      setErrorMsg("Bu harika kitap zaten kütüphanenizde var! 📚✨");
      return; 
    }

    const today = new Date().toLocaleDateString('tr-TR');
    let startD = '-';
    let endD = '-';

    if (status === 'Okunuyor') startD = today;
    if (status === 'Bitti') {
      startD = today;
      endD = today;
    }

    addBook({
      id: crypto.randomUUID(), 
      title: title.trim(),
      author: author.trim(),
      publisher: publisher.trim(),
      pages: pages,
      startDate: startD,
      endDate: endD,
      status,
    });
    
    setTitle(''); setAuthor(''); setPublisher(''); setPages(''); setStatus('Okunması Planlanıyor');
  };

  return (
    <>
      {/* KOPYA KİTAP TAM EKRAN UYARI (MODAL) */}
      {errorMsg && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-emerald-950/30 backdrop-blur-sm transition-all">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm mx-4 transform transition-all border border-emerald-100">
            <div className="text-5xl mb-4 animate-bounce">📚</div>
            <p className="text-emerald-950 font-extrabold text-center text-lg mb-6 leading-relaxed">
              {errorMsg}
            </p>
            <button 
              type="button" 
              onClick={() => setErrorMsg('')} 
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-amber-500/30 text-lg"
            >
              Tamam
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 flex flex-col shrink-0 relative">
        <h2 className="text-lg font-extrabold mb-4 text-emerald-900 border-b border-emerald-100 pb-2 shrink-0">Yeni Kitap Ekle</h2>
        
        <div className="flex flex-col space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-emerald-800 mb-1">Kitap Adı *</label>
            <input type="text" required maxLength={50} value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-emerald-200 px-3 py-2 rounded-lg focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-semibold text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-emerald-800 mb-1">Yazar *</label>
            <input type="text" required maxLength={50} value={author} onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-emerald-200 px-3 py-2 rounded-lg focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-semibold text-sm" />
          </div>
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-xs font-bold text-emerald-800 mb-1">Yayınevi</label>
              <input type="text" maxLength={50} value={publisher} onChange={(e) => setPublisher(e.target.value)}
                className="w-full border border-emerald-200 px-3 py-2 rounded-lg focus:ring-4 focus:ring-teal-500/20 outline-none transition-all font-semibold text-sm" />
            </div>
            <div className="w-1/2">
              <label className="block text-xs font-bold text-emerald-800 mb-1">Sayfa</label>
              <input 
                type="number" 
                min="1" 
                value={pages} 
                onChange={(e) => setPages(e.target.value)}
                onKeyDown={(e) => {
                  if (['e', 'E', '+', '-', '.', ','].includes(e.key)) e.preventDefault();
                  if (e.key === '0' && e.target.value === '') e.preventDefault();
                }}
                className="w-full border border-emerald-200 px-3 py-2 rounded-lg focus:ring-4 focus:ring-teal-500/20 outline-none transition-all font-semibold text-sm" 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-emerald-800 mb-1">Durum</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-emerald-200 px-3 py-2 rounded-lg focus:ring-4 focus:ring-teal-500/20 outline-none transition-all cursor-pointer font-bold text-emerald-900 text-sm">
              <option value="Okunması Planlanıyor">Okunması Planlanıyor</option>
              <option value="Okunuyor">Okunuyor 📖</option>
              <option value="Bitti">Bitti ✅</option>
            </select>
          </div>
        </div>

        <div className="mt-5 shrink-0">
          <button type="submit" className="w-full flex justify-center items-center gap-2 bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-200 font-extrabold transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg> 
            Ekle
          </button>
        </div>
      </form>
    </>
  );
}
