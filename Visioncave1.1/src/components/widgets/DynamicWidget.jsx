import { useState, useEffect } from 'react'
import { widgetDataService } from '../../services/widgetService'
import AnalyticsWidget from '../AnalyticsWidget'
import AlertWidget from '../AlertWidget'
import StatsWidget from '../StatsWidget'

export default function DynamicWidget({ config }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await widgetDataService.getWidgetData(config.id, config.dataSource)
        setData(result)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, config.refreshInterval || 30000)

    return () => clearInterval(interval)
  }, [config])

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg shadow p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg shadow p-4">
        <div className="text-red-400">
          Error loading widget: {error}
        </div>
      </div>
    )
  }

  switch (config.type) {
    case 'analytics':
      return <AnalyticsWidget title={config.title} data={data} dataKey={config.dataKey} />
    case 'alerts':
      return <AlertWidget title={config.title} alerts={data} />
    case 'stats':
      return <StatsWidget title={config.title} stats={data} />
    default:
      return <div>Unsupported widget type</div>
  }
}
