import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function JobStats({ jobs }) {
  const totalJobs = jobs.length;

  const stats = [
    { name: 'Bekliyor', value: jobs.filter(j => j.status === 'Bekliyor').length, color: '#facc15' },
    { name: 'Mülakat', value: jobs.filter(j => j.status === 'Mülakat').length, color: '#60a5fa' },
    { name: 'Reddedildi', value: jobs.filter(j => j.status === 'Reddedildi').length, color: '#f87171' },
    { name: 'Kabul Edildi', value: jobs.filter(j => j.status === 'Kabul Edildi').length, color: '#4ade80' },
  ].filter(stat => stat.value > 0);

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

  if (jobs.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col items-center justify-center min-h-[250px]">
        <p className="text-slate-400 font-medium text-center">İstatistikleri görmek için başvuru ekleyin.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
      <h2 className="text-lg font-bold mb-4 text-slate-800 border-b border-slate-100 pb-3 flex justify-between items-center">
        <span>Durum Dağılımı</span>
        <span className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold">Toplam: {totalJobs} Başvuru</span>
      </h2>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={stats}
              cx="40%" /* Sağa yer açmak için pastayı hafif sola kaydırdık */
              cy="50%"
              innerRadius={45}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
              stroke="none"
            >
              {stats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            {/* Yazıların alt alta dip dibe olmaması için Legend SAĞA VE DİKEY alındı */}
            <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: '500', color: '#475569' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
