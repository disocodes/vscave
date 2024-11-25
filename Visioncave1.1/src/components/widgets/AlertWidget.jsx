export default function AlertWidget({ title, alerts }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg ${
              alert.type === 'warning' ? 'bg-yellow-900/50 text-yellow-200' :
              alert.type === 'danger' ? 'bg-red-900/50 text-red-200' :
              'bg-blue-900/50 text-blue-200'
            }`}
          >
            <p className="text-sm font-medium">{alert.message}</p>
            <p className="text-xs mt-1 opacity-75">{alert.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
