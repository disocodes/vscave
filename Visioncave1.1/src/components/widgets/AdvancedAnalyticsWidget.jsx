import { useState } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CHART_TYPES = {
  LINE: 'line',
  AREA: 'area',
  BAR: 'bar'
}

export default function AdvancedAnalyticsWidget({ 
  title, 
  data, 
  metrics = [], 
  defaultChartType = CHART_TYPES.LINE 
}) {
  const [chartType, setChartType] = useState(defaultChartType)
  const [selectedMetrics, setSelectedMetrics] = useState(metrics.map(m => m.key))

  const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444']

  const renderChart = () => {
    const ChartComponent = {
      [CHART_TYPES.LINE]: LineChart,
      [CHART_TYPES.AREA]: AreaChart,
      [CHART_TYPES.BAR]: BarChart
    }[chartType]

    const DataComponent = {
      [CHART_TYPES.LINE]: Line,
      [CHART_TYPES.AREA]: Area,
      [CHART_TYPES.BAR]: Bar
    }[chartType]

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="timestamp" 
            stroke="#9CA3AF"
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
          />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '0.375rem',
              color: '#F3F4F6'
            }}
          />
          {selectedMetrics.map((metric, index) => (
            <DataComponent
              key={metric}
              type="monotone"
              dataKey={metric}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={chartType === CHART_TYPES.AREA ? 0.3 : 1}
            />
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex space-x-2">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-gray-700 text-white text-sm rounded-md px-2 py-1"
          >
            <option value={CHART_TYPES.LINE}>Line</option>
            <option value={CHART_TYPES.AREA}>Area</option>
            <option value={CHART_TYPES.BAR}>Bar</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {metrics.map((metric) => (
          <label key={metric.key} className="inline-flex items-center">
            <input
              type="checkbox"
              checked={selectedMetrics.includes(metric.key)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedMetrics([...selectedMetrics, metric.key])
                } else {
                  setSelectedMetrics(selectedMetrics.filter(m => m !== metric.key))
                }
              }}
              className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 rounded"
            />
            <span className="ml-2 text-sm text-gray-300">{metric.label}</span>
          </label>
        ))}
      </div>

      {renderChart()}
    </div>
  )
}
