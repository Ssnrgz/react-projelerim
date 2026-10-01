import { useState, useEffect } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import BookStats from '../components/BookStats';

export default function Dashboard() {
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

  return (
    <div className="w-[95%] max-w-[1500px] mx-auto py-6 h-screen flex flex-col overflow-hidden relative">
      
      {/* BAŞLIK ALANI: Başlık tam yerinde (solda) bırakıldı */}
      <div className="flex items-center mb-6 shrink-0 bg-white/50 p-4 rounded-2xl border border-emerald-100 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-extrabold text-teal-900 tracking-tight ml-2">📚 Dijital Kütüphanem</h1>
      </div>
      
      {/* ANA İÇERİK ALANI */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0 h-full flex flex-col gap-4 overflow-hidden">
          <BookForm addBook={addBook} books={books} />
          <BookStats books={books} />
        </div>

        <div className="flex-1 min-w-0 h-full flex flex-col overflow-hidden">
          <BookList books={books} updateBookDetails={updateBookDetails} updateBookStatus={updateBookStatus} />
        </div>

      </div>
    </div>
  );
}
