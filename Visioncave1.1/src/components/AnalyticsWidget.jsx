import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AnalyticsWidget({ title, data, dataKey }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.375rem',
                color: '#F3F4F6'
              }}
            />
            <Bar dataKey={dataKey} fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
