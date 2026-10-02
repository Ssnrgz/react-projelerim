import { useState } from 'react';

export default function JobList({ jobs, deleteJob, updateJobStatus }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (jobs.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-indigo-200 text-center h-full flex items-center justify-center">
        <p className="text-indigo-400 font-medium">Henüz bir başvuru eklenmedi. Yeni bir serüvene başlamak için yukarıdaki formu kullanın!</p>
      </div>
    );
  }

  const filteredJobs = jobs.filter((job) =>
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Bekliyor': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Mülakat': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Reddedildi': return 'bg-red-100 text-red-800 border-red-200';
      case 'Kabul Edildi': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="lg:h-full flex flex-col space-y-4 lg:overflow-hidden">
      
      <div className="flex justify-between items-end shrink-0">
        <h2 className="text-xl font-bold text-indigo-900 ml-2 hidden md:block drop-shadow-sm">Başvuru Listesi</h2>
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Şirket veya pozisyon ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-indigo-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all bg-white text-indigo-900 placeholder-indigo-300 shadow-sm font-medium"
          />
        </div>
      </div>

      {/* KAYDIRMA BURANIN İÇİNE HAPSEDİLDİ */}
      <div className="flex-1 min-h-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-indigo-200 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white sticky top-0 z-10">
              <tr className="text-xs uppercase tracking-wider font-bold">
                <th className="p-5 w-1/4">Şirket</th>
                <th className="p-5 w-1/4">Pozisyon</th>
                <th className="p-5 w-1/6">Tarih</th>
                <th className="p-5 w-1/4">Durum</th>
                <th className="p-5 text-center w-1/12">İşlem</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-indigo-50/60 transition-colors">
                    <td className="p-5 font-semibold text-indigo-950 break-all border-b border-indigo-50">{job.company}</td>
                    <td className="p-5 text-indigo-800 font-medium break-all border-b border-indigo-50">{job.position}</td>
                    <td className="p-5 text-indigo-500 text-sm font-medium border-b border-indigo-50">{job.date}</td>
                    <td className="p-5 border-b border-indigo-50">
                      <select
                        value={job.status}
                        onChange={(e) => updateJobStatus(job.id, e.target.value)}
                        className={`border px-3 py-1.5 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors cursor-pointer w-full ${getStatusColor(job.status)}`}
                      >
                        <option value="Bekliyor">Bekliyor</option>
                        <option value="Mülakat">Mülakat Sürecinde</option>
                        <option value="Reddedildi">Reddedildi</option>
                        <option value="Kabul Edildi">Kabul Edildi 🚀</option>
                      </select>
                    </td>
                    <td className="p-5 text-center border-b border-indigo-50">
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all mx-auto block border border-red-100 hover:border-red-500"
                        title="Sil"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mx-auto">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-indigo-400 font-medium">
                    Aradığınız kritere uygun başvuru bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
