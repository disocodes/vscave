import { useState } from 'react'
import WorkflowBuilder from './WorkflowBuilder'

export default function CustomWidgetBuilder() {
  const [widgetName, setWidgetName] = useState('')
  const [widgetDescription, setWidgetDescription] = useState('')

  const handleSave = () => {
    // Save widget configuration
  }

  const handleDeploy = () => {
    // Deploy widget to dashboard
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <div>
            <input
              type="text"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              placeholder="Widget Name"
              className="bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600"
            />
            <input
              type="text"
              value={widgetDescription}
              onChange={(e) => setWidgetDescription(e.target.value)}
              placeholder="Widget Description"
              className="ml-4 bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600"
            />
          </div>
          <div className="space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={handleDeploy}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Deploy
            </button>
          </div>
        </div>
      </div>

      {/* Workflow Builder */}
      <div className="flex-1">
        <WorkflowBuilder />
      </div>
    </div>
  )
}
