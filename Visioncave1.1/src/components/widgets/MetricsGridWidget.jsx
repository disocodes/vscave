import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

export default function MetricsGridWidget({ metrics }) {
  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-400'
    if (change < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  const getChangeIcon = (change) => {
    if (change > 0) return <ArrowUpIcon className="h-4 w-4 text-green-400" />
    if (change < 0) return <ArrowDownIcon className="h-4 w-4 text-red-400" />
    return null
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400">{metric.label}</div>
            <div className="mt-2 flex items-baseline">
              <div className="text-2xl font-semibold text-white">
                {metric.value}
              </div>
              {metric.unit && (
                <div className="ml-1 text-sm text-gray-400">{metric.unit}</div>
              )}
            </div>
            {metric.change !== undefined && (
              <div className={`mt-2 flex items-center ${getChangeColor(metric.change)}`}>
                {getChangeIcon(metric.change)}
                <span className="text-sm ml-1">
                  {Math.abs(metric.change)}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
