import { useState, useEffect } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import BookStats from '../components/BookStats';
import UserProfile from '../components/UserProfile';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'profile'

  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('booksData');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('booksData', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const addBook = (newBook) => setBooks([newBook, ...books]);
  
  const deleteBook = (id) => setBooks(books.filter(b => b.id !== id));

  const updateBookDetails = (id, updatedData) => {
    setBooks(books.map(b => b.id === id ? { ...b, ...updatedData } : b));
  };
  
  const updateBookStatus = (id, newStatus) => {
    setBooks(books.map((b) => {
      if (b.id === id) {
        let newStartDate = b.startDate || '-';
        let newEndDate = b.endDate || '-';
        const today = new Date().toLocaleDateString('tr-TR');

        if (newStatus === 'Okunması Planlanıyor') {
          newStartDate = '-'; newEndDate = '-';
        } else if (newStatus === 'Okunuyor') {
          if (newStartDate === '-') newStartDate = today;
          newEndDate = '-';
        } else if (newStatus === 'Bitti') {
          if (newStartDate === '-') newStartDate = today;
          newEndDate = today;
        }
        return { ...b, status: newStatus, startDate: newStartDate, endDate: newEndDate };
      }
      return b;
    }));
  };

  const completedCount = books.filter(b => b.status === 'Bitti').length;

  return (
    <div className="w-[95%] max-w-[1500px] mx-auto py-6 lg:h-screen flex flex-col lg:overflow-hidden relative">
      
      {/* ÜST BAR: BAŞLIK VE SEKME GEÇİŞLERİ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📚</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-teal-950 tracking-tight">Dijital Kütüphanem</h1>
            <p className="text-xs text-emerald-700 font-semibold hidden sm:block">Kitap, Okuma ve Alıntı Yönetim Alanı</p>
          </div>
        </div>

        {/* SEKME BUTONLARI (Kütüphanem / Profilim) */}
        <div className="flex items-center gap-2 bg-emerald-100/60 p-1.5 rounded-2xl border border-emerald-200">
          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
              activeTab === 'library'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-emerald-900 hover:bg-emerald-200/50'
            }`}
          >
            <span>📚</span>
            <span>Kütüphanem</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              activeTab === 'library' ? 'bg-teal-900/60 text-white' : 'bg-emerald-200 text-emerald-950'
            }`}>
              {books.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
              activeTab === 'profile'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-emerald-900 hover:bg-emerald-200/50'
            }`}
          >
            <span>👤</span>
            <span>Profilim</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              activeTab === 'profile' ? 'bg-teal-900/60 text-white' : 'bg-emerald-200 text-emerald-950'
            }`}>
              {completedCount} Okundu
            </span>
          </button>
        </div>
      </div>
      
      {/* SEKME İÇERİKLERİ */}
      {activeTab === 'library' ? (
        /* KÜTÜPHANEM SEKMESİ: FORM, İSTATİSTİK VE KİTAP LİSTESİ */
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6 lg:overflow-hidden">
          
          <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0 lg:h-full flex flex-col gap-4 lg:overflow-hidden">
            <BookForm addBook={addBook} books={books} />
            <BookStats books={books} />
          </div>

          <div className="flex-1 min-w-0 lg:h-full flex flex-col lg:overflow-hidden">
            <BookList 
              books={books} 
              updateBookDetails={updateBookDetails} 
              updateBookStatus={updateBookStatus} 
              deleteBook={deleteBook}
            />
          </div>

        </div>
      ) : (
        /* PROFİLİM SEKMESİ: OKUNAN KİTAP SAYISI, İSTATİSTİKLER VE ALINTILAR */
        <div className="flex-1 min-h-0 flex flex-col lg:overflow-hidden">
          <UserProfile books={books} />
        </div>
      )}

    </div>
  );
}
