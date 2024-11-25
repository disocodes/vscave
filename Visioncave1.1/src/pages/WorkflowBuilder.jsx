import DashboardLayout from '../components/DashboardLayout'
import WorkflowBuilder from '../components/widgets/WorkflowBuilder'
import { useState } from 'react'

export default function WorkflowBuilderPage() {
  const [widgetName, setWidgetName] = useState('')
  const [widgetDescription, setWidgetDescription] = useState('')

  const handleSave = () => {
    // Save workflow configuration
    console.log('Saving workflow...')
  }

  const handleDeploy = () => {
    // Deploy widget to dashboard
    console.log('Deploying widget...')
  }

  return (
    <DashboardLayout title="Custom Widget Builder">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-x-4">
            <input
              type="text"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              placeholder="Widget Name"
              className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700"
            />
            <input
              type="text"
              value={widgetDescription}
              onChange={(e) => setWidgetDescription(e.target.value)}
              placeholder="Widget Description"
              className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700"
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

        <WorkflowBuilder />
      </div>
    </DashboardLayout>
  )
}
