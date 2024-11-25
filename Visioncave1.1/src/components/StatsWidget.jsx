export default function StatsWidget({ title, stats }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-2xl font-bold text-indigo-400">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
