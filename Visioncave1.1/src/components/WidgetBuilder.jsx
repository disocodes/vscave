import { useState } from 'react'

export default function WidgetBuilder() {
  const [widgetType, setWidgetType] = useState('chart')
  const [widgetTitle, setWidgetTitle] = useState('')
  const [widgetSize, setWidgetSize] = useState('medium')

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Widget Builder</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Widget Type
          </label>
          <select
            value={widgetType}
            onChange={(e) => setWidgetType(e.target.value)}
            className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
          >
            <option value="chart">Chart</option>
            <option value="stats">Statistics</option>
            <option value="alert">Alert</option>
            <option value="camera">Camera Feed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Widget Title
          </label>
          <input
            type="text"
            value={widgetTitle}
            onChange={(e) => setWidgetTitle(e.target.value)}
            className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
            placeholder="Enter widget title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Widget Size
          </label>
          <select
            value={widgetSize}
            onChange={(e) => setWidgetSize(e.target.value)}
            className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Create Widget
        </button>
      </div>
    </div>
  )
}
