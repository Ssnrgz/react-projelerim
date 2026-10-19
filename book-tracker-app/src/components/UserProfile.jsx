import { useState, useEffect } from 'react';

export default function UserProfile({ books }) {
  // Alıntılar localStorage'da kalıcı olarak saklanır
  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem('bookQuotesData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Başlangıçta örnek bir alıntı ekleyelim
    return [
      {
        id: 'quote-sample-1',
        text: 'Bir kitap okuyan insan, ölmeden önce binlerce hayat yaşar. Hiç okumayan insan ise yalnızca bir hayat yaşar.',
        bookTitle: 'Ejderhaların Dansı',
        author: 'George R.R. Martin',
        page: '245',
        category: 'İlham Verici',
        date: new Date().toLocaleDateString('tr-TR')
      }
    ];
  });

  // Alıntı Form State'leri
  const [quoteText, setQuoteText] = useState('');
  const [selectedBookId, setSelectedBookId] = useState('');
  const [customBookTitle, setCustomBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [page, setPage] = useState('');
  const [category, setCategory] = useState('Favori');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  // Profil Adı State'i
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem('readerProfileName') || 'Kitap Kurdu';
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profileName);

  // LocalStorage Güncellemeleri
  useEffect(() => {
    localStorage.setItem('bookQuotesData', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('readerProfileName', profileName);
  }, [profileName]);

  // Toast mesajını otomatik kapatma
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  // İstatistik Hesaplamaları
  const completedBooks = books.filter(b => b.status === 'Bitti');
  const completedCount = completedBooks.length;
  const readingCount = books.filter(b => b.status === 'Okunuyor').length;
  const plannedCount = books.filter(b => b.status === 'Okunması Planlanıyor').length;
  const totalBooks = books.length;

  const totalPagesRead = completedBooks.reduce((sum, b) => {
    const p = parseInt(b.pages, 10);
    return sum + (isNaN(p) ? 0 : p);
  }, 0);

  const completionPercentage = totalBooks > 0 
    ? Math.round((completedCount / totalBooks) * 100) 
    : 0;

  // Kitap seçiminde yazar otomatik doldurma
  const handleBookSelect = (e) => {
    const val = e.target.value;
    setSelectedBookId(val);
    if (val === 'custom') {
      setAuthor('');
      setCustomBookTitle('');
    } else if (val) {
      const selected = books.find(b => b.id === val);
      if (selected) {
        setAuthor(selected.author || '');
        setCustomBookTitle(selected.title || '');
      }
    } else {
      setAuthor('');
      setCustomBookTitle('');
    }
  };

  // Yeni Alıntı Ekleme
  const handleAddQuote = (e) => {
    e.preventDefault();
    if (!quoteText.trim()) return;

    let finalTitle = '';
    if (selectedBookId && selectedBookId !== 'custom') {
      const b = books.find(item => item.id === selectedBookId);
      finalTitle = b ? b.title : customBookTitle;
    } else {
      finalTitle = customBookTitle.trim() || 'Bilinmeyen Kitap';
    }

    const newQuote = {
      id: crypto.randomUUID(),
      text: quoteText.trim(),
      bookTitle: finalTitle,
      author: author.trim() || 'Anonim',
      page: page.trim(),
      category,
      date: new Date().toLocaleDateString('tr-TR')
    };

    setQuotes([newQuote, ...quotes]);
    setQuoteText('');
    setPage('');
    setSelectedBookId('');
    setCustomBookTitle('');
    setAuthor('');
    setToastMsg('Alıntı başarıyla kaydedildi! ✨');
  };

  // Alıntı Silme
  const handleDeleteQuote = (id) => {
    setQuotes(quotes.filter(q => q.id !== id));
    setToastMsg('Alıntı silindi.');
  };

  // Panoya Kopyalama
  const handleCopyQuote = (quote) => {
    const formatted = `"${quote.text}" — ${quote.bookTitle}${quote.author ? `, ${quote.author}` : ''}${quote.page ? ` (s. ${quote.page})` : ''}`;
    navigator.clipboard.writeText(formatted);
    setCopiedId(quote.id);
    setToastMsg('Alıntı panoya kopyalandı! 📋');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // İsim kaydetme
  const handleSaveName = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      setProfileName(tempName.trim());
      setIsEditingName(false);
      setToastMsg('Profil adı güncellendi! 👤');
    }
  };

  // Filtrelenmiş Alıntılar
  const filteredQuotes = quotes.filter(q => 
    q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 w-full space-y-6 pb-12 overflow-y-auto">
      
      {/* Toast Bildirimi */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-teal-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in border border-teal-700">
          <span className="text-xl">✨</span>
          <span className="font-semibold text-sm">{toastMsg}</span>
        </div>
      )}

      {/* PROFİL KART VE İSTATİSTİKLER */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100">
        
        {/* Üst Profil Başlığı */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-3xl md:text-4xl shadow-md text-white shrink-0">
              👤
            </div>
            <div>
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    maxLength={30}
                    className="border-2 border-teal-400 rounded-xl px-3 py-1 font-extrabold text-emerald-950 text-xl outline-none focus:ring-2 focus:ring-teal-200"
                    autoFocus
                  />
                  <button type="submit" className="bg-teal-600 text-white px-3 py-1.5 rounded-xl font-bold text-sm hover:bg-teal-700">
                    Kaydet
                  </button>
                  <button type="button" onClick={() => setIsEditingName(false)} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl text-sm hover:bg-gray-200">
                    İptal
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl md:text-3xl font-black text-emerald-950 tracking-tight">{profileName}</h2>
                  <button 
                    onClick={() => { setTempName(profileName); setIsEditingName(true); }}
                    className="text-emerald-500 hover:text-emerald-700 p-1 rounded-lg hover:bg-emerald-50 transition-colors"
                    title="İsmi Düzenle"
                  >
                    ✏️
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  🌱 Kitap Tutkunu
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Kütüphanede {totalBooks} kitap kayıtlı
                </span>
              </div>
            </div>
          </div>

          {/* İlerleme Çubuğu */}
          <div className="sm:w-64 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
            <div className="flex justify-between items-center text-xs font-bold text-emerald-900 mb-1.5">
              <span>Kütüphane Tamamlama</span>
              <span>%{completionPercentage}</span>
            </div>
            <div className="w-full bg-emerald-200/60 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 4 Ana İstatistik Kartı */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          {/* OKUNAN KİTAP SAYISI (Vurgulu) */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-2 right-2 text-5xl opacity-15 pointer-events-none">✅</div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Okunan Kitap Sayısı</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black">{completedCount}</span>
              <span className="text-xs text-emerald-100 font-medium">kitap bitti</span>
            </div>
          </div>

          {/* ŞU AN OKUNUYOR */}
          <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Şu An Okunuyor</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black text-blue-900">{readingCount}</span>
              <span className="text-xs text-blue-600 font-medium">aktif kitap</span>
            </div>
          </div>

          {/* PLANLANAN */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Okunacaklar</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black text-slate-800">{plannedCount}</span>
              <span className="text-xs text-slate-500 font-medium">sırada bekliyor</span>
            </div>
          </div>

          {/* TOPLAM OKUNAN SAYFA */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Okunan Toplam Sayfa</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black text-amber-950">{totalPagesRead.toLocaleString('tr-TR')}</span>
              <span className="text-xs text-amber-700 font-medium">sayfa</span>
            </div>
          </div>

        </div>

      </div>

      {/* BEĞENİLEN ALINTILAR BÖLÜMÜ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SOL: YENİ ALINTI EKLEME FORMU */}
        <div className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-100">
            <span className="text-2xl">✍️</span>
            <div>
              <h3 className="text-lg font-extrabold text-emerald-950">Beğenilen Alıntı Ekle</h3>
              <p className="text-xs text-emerald-600 font-medium">Kitapta beğendiğin ve unutmak istemediğin satırları kaydet</p>
            </div>
          </div>

          <form onSubmit={handleAddQuote} className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3.5">
              
              {/* Alıntı Metni */}
              <div>
                <label className="block text-xs font-bold text-emerald-900 mb-1">
                  Alıntı Metni *
                </label>
                <textarea
                  required
                  rows={4}
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  placeholder="&quot;Beni kör kuyularda merdivensiz bıraktın...&quot;"
                  className="w-full border border-emerald-200 rounded-xl p-3 text-sm font-medium text-emerald-950 placeholder-emerald-400 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none bg-emerald-50/20"
                ></textarea>
              </div>

              {/* Kitap Seçimi (Kütüphaneden veya Özel) */}
              <div>
                <label className="block text-xs font-bold text-emerald-900 mb-1">
                  Hangi Kitaptan?
                </label>
                <select
                  value={selectedBookId}
                  onChange={handleBookSelect}
                  className="w-full border border-emerald-200 rounded-xl px-3 py-2 text-sm font-semibold text-emerald-900 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all bg-white"
                >
                  <option value="">-- Kütüphanemden Kitap Seçin --</option>
                  {books.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.title} ({b.author})
                    </option>
                  ))}
                  <option value="custom">✏️ Farklı bir kitap adı yaz...</option>
                </select>
              </div>

              {/* Özel Kitap Adı & Yazar (Seçildiyse veya Elle Girilecekse) */}
              {(selectedBookId === 'custom' || !selectedBookId) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-emerald-800 mb-1">Kitap Adı</label>
                    <input
                      type="text"
                      placeholder="Kitabın adı..."
                      value={customBookTitle}
                      onChange={(e) => setCustomBookTitle(e.target.value)}
                      className="w-full border border-emerald-200 rounded-xl px-3 py-2 text-sm font-semibold text-emerald-900 outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-800 mb-1">Yazar</label>
                    <input
                      type="text"
                      placeholder="Yazarın adı..."
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full border border-emerald-200 rounded-xl px-3 py-2 text-sm font-semibold text-emerald-900 outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                </div>
              )}

              {/* Sayfa No ve Kategori */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-800 mb-1">Sayfa No (Opsiyonel)</label>
                  <input
                    type="text"
                    placeholder="Örn: 42 veya Bölüm 3"
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                    className="w-full border border-emerald-200 rounded-xl px-3 py-2 text-sm font-semibold text-emerald-900 outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-800 mb-1">Tür / Duygu</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-emerald-200 rounded-xl px-3 py-2 text-sm font-semibold text-emerald-900 outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                  >
                    <option value="Favori">❤️ Favori</option>
                    <option value="İlham Verici">✨ İlham Verici</option>
                    <option value="Düşündürücü">🤔 Düşündürücü</option>
                    <option value="Felsefe">📜 Felsefe</option>
                    <option value="Aşk & Şiir">🕊️ Aşk & Şiir</option>
                    <option value="Not">📝 Kişisel Not</option>
                  </select>
                </div>
              </div>

            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl shadow-md hover:shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>💾</span> Alıntıyı Profilime Ekle
            </button>
          </form>
        </div>

        {/* SAĞ: ALINTILAR LİSTESİ */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col min-h-[450px]">
          
          {/* Başlık ve Arama */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <div>
                <h3 className="text-lg font-extrabold text-emerald-950">Kayıtlı Alıntılarım</h3>
                <span className="text-xs text-emerald-600 font-bold">Toplam {quotes.length} alıntı kaydedildi</span>
              </div>
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Alıntılarda veya kitapta ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-emerald-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-emerald-900 placeholder-emerald-400 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
              />
            </div>
          </div>

          {/* Alıntı Kartları Listesi */}
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[600px] pr-1">
            {filteredQuotes.length > 0 ? (
              filteredQuotes.map((q) => (
                <div
                  key={q.id}
                  className="bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-5 rounded-2xl border border-emerald-100/80 shadow-sm hover:shadow-md transition-all group relative flex flex-col justify-between"
                >
                  {/* Alıntı İkonu & Kategori */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-teal-100 text-teal-800 text-[11px]">
                      {q.category || 'Alıntı'}
                    </span>
                    <span className="text-gray-400 text-[11px] font-medium">{q.date}</span>
                  </div>

                  {/* Alıntı Metni */}
                  <blockquote className="text-emerald-950 font-medium italic text-base leading-relaxed pl-3 border-l-4 border-teal-500 my-2">
                    &ldquo;{q.text}&rdquo;
                  </blockquote>

                  {/* Alt Bilgi: Kitap, Yazar, Sayfa & Aksiyon Butonları */}
                  <div className="mt-4 pt-3 border-t border-emerald-100/70 flex items-center justify-between gap-2">
                    <div className="text-xs">
                      <span className="font-bold text-teal-900">{q.bookTitle}</span>
                      {q.author && <span className="text-emerald-700 font-medium"> — {q.author}</span>}
                      {q.page && (
                        <span className="ml-2 text-[11px] bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                          s. {q.page}
                        </span>
                      )}
                    </div>

                    {/* Butonlar: Kopyala & Sil */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleCopyQuote(q)}
                        className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100/60 transition-colors text-xs font-semibold flex items-center gap-1"
                        title="Panoya Kopyala"
                      >
                        {copiedId === q.id ? '✓ Kopyalandı' : '📋 Kopyala'}
                      </button>
                      <button
                        onClick={() => handleDeleteQuote(q.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors text-xs"
                        title="Alıntıyı Sil"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-emerald-100 rounded-2xl">
                <div className="text-4xl mb-3">✍️</div>
                <p className="text-emerald-900 font-bold text-base mb-1">
                  {searchTerm ? 'Aradığınız kriterde alıntı bulunamadı.' : 'Henüz kayıtlı alıntınız yok.'}
                </p>
                <p className="text-emerald-600 text-xs max-w-xs">
                  {searchTerm ? 'Farklı bir arama terimi deneyin.' : 'Sol taraftaki formdan okuduğunuz kitaplardan beğendiğiniz cümleleri kaydedebilirsiniz!'}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
