import { useState, useEffect } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';

export default function Dashboard() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('booksData');
    return saved ? JSON.parse(saved) : [];
  });

  // LocalStorage Güncelleme
  useEffect(() => {
    localStorage.setItem('booksData', JSON.stringify(books));
  }, [books]);

  // BİLDİRİM SİSTEMİ (NOTIFICATION API)
  useEffect(() => {
    // Sayfa ilk açıldığında bildirim izni iste
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const sendDailyNotification = () => {
    if (Notification.permission === 'granted') {
      // İşletim sisteminin ana bildirim sistemini (Push) tetikler
      const notification = new Notification('📚 Günlük Okuma Vakti!', {
        body: 'Bugün hiç kitap okudun mu? Evet ise tıklayıp hemen sayfaya dön!',
        icon: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png' // Örnek kitap ikonu
      });

      // Bildirime tıklandığında (Evet derse) sayfayı bilgisayarda ÖNE fırlatır ve açar
      notification.onclick = () => {
        window.focus(); 
        notification.close();
      };
    } else {
      alert("Bildirim izni vermelisiniz. Tarayıcınızın adres çubuğundan izin verebilirsiniz.");
    }
  };

  const addBook = (newBook) => setBooks([newBook, ...books]);
  const deleteBook = (id) => setBooks(books.filter((b) => b.id !== id));
  const updateBookStatus = (id, newStatus) => {
    setBooks(books.map((b) => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="w-[95%] max-w-[1200px] mx-auto py-8 h-screen flex flex-col overflow-hidden">
      
      {/* BAŞLIK VE BİLDİRİM TEST BUTONU */}
      <div className="flex justify-between items-center mb-6 shrink-0 bg-white/50 p-4 rounded-2xl border border-emerald-100">
        <h1 className="text-2xl md:text-3xl font-extrabold text-teal-900 tracking-tight">
          📚 Dijital Kütüphanem
        </h1>
        <button 
          onClick={sendDailyNotification}
          className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-emerald-200 transition-all border border-emerald-300 flex items-center gap-2"
        >
          <span>🔔</span> Günlük Bildirimi Test Et
        </button>
      </div>
      
      <div className="mb-6 shrink-0">
        <BookForm addBook={addBook} />
      </div>

      <div className="flex-1 min-h-0">
        <BookList books={books} deleteBook={deleteBook} updateBookStatus={updateBookStatus} />
      </div>
    </div>
  );
}
