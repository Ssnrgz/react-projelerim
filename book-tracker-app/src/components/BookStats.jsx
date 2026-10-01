import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function BookStats({ books }) {
  const total = books.length;

  const stats = [
    { name: 'Planlanan', value: books.filter(b => b.status === 'Okunması Planlanıyor').length, color: '#94a3b8' },
    { name: 'Okunuyor', value: books.filter(b => b.status === 'Okunuyor').length, color: '#38bdf8' },
    { name: 'Bitti', value: books.filter(b => b.status === 'Bitti').length, color: '#34d399' },
  ].filter(s => s.value > 0);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight="bold" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)' }}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (books.length === 0) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 flex-1 min-h-[200px] flex flex-col items-center justify-center">
        <p className="text-emerald-400 font-bold text-center text-sm">İstatistik için kitap ekleyin.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 flex-1 min-h-[250px] flex flex-col">
      <h2 className="text-sm font-extrabold mb-2 text-emerald-900 border-b border-emerald-100 pb-2 flex justify-between items-center shrink-0">
        <span>Okuma Dağılımı</span>
        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs">Toplam Kitap: {total}</span>
      </h2>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={stats} cx="50%" cy="45%" innerRadius={35} outerRadius={70} paddingAngle={3} dataKey="value" labelLine={false} label={renderCustomizedLabel} stroke="none">
              {stats.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend verticalAlign="bottom" height={20} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#064e3b' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
