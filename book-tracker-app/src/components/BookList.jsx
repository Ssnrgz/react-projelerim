import { useState } from 'react';

// deleteBook buradan da kaldırıldı
export default function BookList({ books, updateBookDetails, updateBookStatus }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  if (books.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-emerald-200 text-center h-full flex items-center justify-center">
        <p className="text-emerald-500 font-bold text-lg">Kütüphaneniz şu an boş. Hemen bir kitap ekleyin!</p>
      </div>
    );
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Okunması Planlanıyor': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Okunuyor': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Bitti': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-white';
    }
  };

  const handleEditStart = (book) => {
    setEditingId(book.id);
    setEditData({ title: book.title, author: book.author, publisher: book.publisher, pages: book.pages });
  };

  const handleEditSave = (id) => {
    updateBookDetails(id, editData);
    setEditingId(null);
  };

  return (
    <div className="lg:h-full flex flex-col space-y-4 lg:overflow-hidden">
      <div className="flex justify-between items-end shrink-0">
        <h2 className="text-xl font-extrabold text-emerald-900 ml-2 hidden md:block">Okuma Listem</h2>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Kitap veya yazar ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-4 py-2 border border-emerald-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all bg-white text-emerald-900 placeholder-emerald-400 shadow-sm font-medium"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-emerald-200 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-0 whitespace-nowrap lg:whitespace-normal">
            <thead className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white sticky top-0 z-10">
              <tr className="text-xs uppercase tracking-wider font-bold">
                <th className="p-4 w-[20%]">Kitap Adı</th>
                <th className="p-4 w-[15%]">Yazar</th>
                <th className="p-4 w-[15%]">Yayın / Sayfa</th>
                <th className="p-4 w-[12%]">Başlama</th>
                <th className="p-4 w-[12%]">Bitiş</th>
                <th className="p-4 w-[16%]">Durum</th>
                <th className="p-4 text-center w-[10%]">İşlem</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-emerald-50/60 transition-colors">
                    
                    {editingId === book.id ? (
                      <>
                        <td className="p-3 border-b border-emerald-50"><input type="text" value={editData.title} onChange={e=>setEditData({...editData, title:e.target.value})} className="w-full border border-teal-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-teal-200 font-semibold text-emerald-900" /></td>
                        <td className="p-3 border-b border-emerald-50"><input type="text" value={editData.author} onChange={e=>setEditData({...editData, author:e.target.value})} className="w-full border border-teal-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-teal-200 font-semibold text-emerald-900" /></td>
                        <td className="p-3 border-b border-emerald-50 space-y-1">
                          <input type="text" placeholder="Yayın" value={editData.publisher} onChange={e=>setEditData({...editData, publisher:e.target.value})} className="w-full border border-teal-300 rounded px-2 py-1 outline-none text-xs" />
                          <input 
                            type="number" 
                            min="1"
                            placeholder="Sayfa" 
                            value={editData.pages} 
                            onChange={e=>setEditData({...editData, pages:e.target.value})} 
                            onKeyDown={(e) => {
                              if (['e', 'E', '+', '-', '.', ','].includes(e.key)) e.preventDefault();
                              if (e.key === '0' && e.target.value === '') e.preventDefault();
                            }}
                            className="w-full border border-teal-300 rounded px-2 py-1 outline-none text-xs" 
                          />
                        </td>
                        <td className="p-4 text-emerald-600 text-sm font-bold border-b border-emerald-50">{book.startDate}</td>
                        <td className="p-4 text-teal-600 text-sm font-extrabold border-b border-emerald-50">{book.endDate}</td>
                        <td className="p-4 border-b border-emerald-50">
                          <select value={book.status} onChange={(e) => updateBookStatus(book.id, e.target.value)} className={`border px-3 py-1.5 rounded-lg text-sm font-bold w-full ${getStatusColor(book.status)}`}>
                            <option value="Okunması Planlanıyor">Planlanıyor</option>
                            <option value="Okunuyor">Okunuyor 📖</option>
                            <option value="Bitti">Bitti ✅</option>
                          </select>
                        </td>
                        <td className="p-3 text-center border-b border-emerald-50">
                          <button onClick={() => handleEditSave(book.id)} className="bg-teal-500 text-white px-2 py-2 rounded-lg font-bold shadow-sm hover:bg-teal-600 transition-all text-xs w-full">Kaydet</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4 font-bold text-emerald-950 break-all border-b border-emerald-50">{book.title}</td>
                        <td className="p-4 text-emerald-800 font-medium break-all border-b border-emerald-50">{book.author}</td>
                        <td className="p-4 text-emerald-600 font-medium border-b border-emerald-50 text-sm">
                          {book.publisher || '-'}<br/>
                          <span className="text-emerald-400 text-xs">{book.pages ? `${book.pages} syf` : ''}</span>
                        </td>
                        <td className="p-4 text-emerald-600 text-sm font-bold border-b border-emerald-50">{book.startDate}</td>
                        <td className="p-4 text-teal-600 text-sm font-extrabold border-b border-emerald-50">{book.endDate}</td>
                        <td className="p-4 border-b border-emerald-50">
                          <select value={book.status} onChange={(e) => updateBookStatus(book.id, e.target.value)} className={`border px-2 py-1.5 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer w-full ${getStatusColor(book.status)}`}>
                            <option value="Okunması Planlanıyor">Planlanıyor</option>
                            <option value="Okunuyor">Okunuyor 📖</option>
                            <option value="Bitti">Bitti ✅</option>
                          </select>
                        </td>
                        
                        {/* SADECE DÜZENLE BUTONU KALDI */}
                        <td className="p-3 text-center border-b border-emerald-50">
                            <button onClick={() => handleEditStart(book)} className="px-3 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white rounded-lg transition-all font-bold text-xs shadow-sm border border-indigo-100 hover:border-indigo-500 w-full">
                              Düzenle
                            </button>
                        </td>
                        
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="p-10 text-center text-emerald-500 font-bold">Kitap bulunamadı.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
