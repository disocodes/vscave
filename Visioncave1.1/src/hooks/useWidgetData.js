import { useState, useEffect } from 'react'
import { api } from '../services/api'

export function useWidgetData(type, domain, refreshInterval = 30000) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let result
        switch (type) {
          case 'analytics':
            result = await api.fetchAnalytics(domain)
            break
          case 'alerts':
            result = await api.fetchAlerts(domain)
            break
          case 'stats':
            result = await api.fetchStats(domain)
            break
          case 'heatmap':
            result = await api.fetchHeatmap(domain)
            break
          case 'timeline':
            result = await api.fetchTimeline(domain)
            break
          default:
            throw new Error(`Unsupported widget type: ${type}`)
        }
        setData(result)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, refreshInterval)

    return () => clearInterval(interval)
  }, [type, domain, refreshInterval])

  return { data, loading, error }
}
