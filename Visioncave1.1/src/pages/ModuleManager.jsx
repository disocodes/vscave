
import { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import ModuleEditorWidget from '../components/widgets/ModuleEditorWidget'
import { PlusIcon, FolderIcon, CodeIcon, CogIcon } from '@heroicons/react/24/outline'

const MODULE_TYPES = {
  DETECTION: 'detection',
  TRACKING: 'tracking',
  CLASSIFICATION: 'classification',
  SEGMENTATION: 'segmentation',
  CUSTOM: 'custom'
}

export default function ModuleManager() {
  const [modules, setModules] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showNewModule, setShowNewModule] = useState(false)

  const handleSaveModule = async (code) => {
    try {
      const response = await fetch('/api/modules', {
        method: selectedModule ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedModule?.id,
          code,
          type: selectedModule?.type || MODULE_TYPES.CUSTOM,
          name: selectedModule?.name || 'New Module',
        }),
      })
      const data = await response.json()
      // Update modules list
      setModules(prev => 
        selectedModule
          ? prev.map(m => m.id === data.id ? data : m)
          : [...prev, data]
      )
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving module:', error)
    }
  }

  return (
    <DashboardLayout title="Module Manager">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3 bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Modules</h2>
            <button
              onClick={() => setShowNewModule(true)}
              className="p-2 bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              <PlusIcon className="h-5 w-5 text-white" />
            </button>
          </div>

          <div className="space-y-2">
            {Object.entries(MODULE_TYPES).map(([key, type]) => (
              <div key={type}>
                <h3 className="text-sm font-medium text-gray-400 mb-2">{key}</h3>
                {modules
                  .filter(m => m.type === type)
                  .map(module => (
                    <button
                      key={module.id}
                      onClick={() => setSelectedModule(module)}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        selectedModule?.id === module.id
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <CodeIcon className="h-4 w-4 mr-2" />
                        {module.name}
                      </div>
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          {selectedModule ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {selectedModule.name}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Type: {selectedModule.type}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                  >
                    {isEditing ? 'View' : 'Edit'}
                  </button>
                  <button
                    onClick={() => {/* Configure module */}}
                    className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                  >
                    <CogIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {isEditing ? (
                <ModuleEditorWidget
                  initialCode={selectedModule.code}
                  onSave={handleSaveModule}
                />
              ) : (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Module Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Status</h4>
                      <p className="text-white">Active</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Version</h4>
                      <p className="text-white">{selectedModule.version || '1.0.0'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Dependencies</h4>
                      <ul className="text-white">
                        {selectedModule.dependencies?.map(dep => (
                          <li key={dep}>{dep}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Used By</h4>
                      <p className="text-white">{selectedModule.usedBy || 'No active uses'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <FolderIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white">No Module Selected</h3>
              <p className="text-gray-400">
                Select a module from the sidebar or create a new one
              </p>
            </div>
          )}
        </div>
      </div>

      {/* New Module Modal */}
      {showNewModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-white mb-4">
              Create New Module
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              // Handle new module creation
              setShowNewModule(false)
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb