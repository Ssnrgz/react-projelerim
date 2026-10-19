import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function BookStats({ books }) {
  const total = books.length;

  const stats = [
    { name: 'Planlanan', value: books.filter(b => b.status === 'Okunması Planlanıyor').length, color: '#64748b' },
    { name: 'Okunuyor', value: books.filter(b => b.status === 'Okunuyor').length, color: '#0284c7' },
    { name: 'Bitti', value: books.filter(b => b.status === 'Bitti').length, color: '#059669' },
  ].filter(s => s.value > 0);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (!percent || percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#ffffff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={13}
        fontWeight="800"
        style={{ filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.75))' }}
      >
        {`%${(percent * 100).toFixed(0)}`}
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
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 flex-1 min-h-[260px] flex flex-col">
      <h2 className="text-sm font-extrabold mb-2 text-emerald-900 border-b border-emerald-100 pb-2 flex justify-between items-center shrink-0">
        <span>Okuma Dağılımı</span>
        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs">Toplam Kitap: {total}</span>
      </h2>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={stats}
              cx="50%"
              cy="45%"
              innerRadius={36}
              outerRadius={74}
              paddingAngle={stats.length > 1 ? 3 : 0}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
              stroke="none"
              isAnimationActive={false}
            >
              {stats.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Pie>
            <Tooltip
              formatter={(value, name) => {
                const pct = total > 0 ? Math.round((value / total) * 100) : 0;
                return [`${value} kitap (%${pct})`, name];
              }}
              contentStyle={{ borderRadius: '12px', border: '1px solid #d1fae5', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '8px' }}
              formatter={(value) => {
                const stat = stats.find(s => s.name === value);
                const count = stat ? stat.value : 0;
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return `${value}: ${count} (%${pct})`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
