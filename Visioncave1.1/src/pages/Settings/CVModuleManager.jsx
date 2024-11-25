import { useState } from 'react'
import { UploadIcon, TrashIcon, RefreshIcon } from '@heroicons/react/outline'

export default function CVModuleManager() {
  const [modules, setModules] = useState([
    {
      id: 1,
      name: 'YOLOv5',
      status: 'active',
      type: 'detection',
      version: '6.1.0',
      lastUpdated: '2023-08-20'
    },
    // Add more modules...
  ])

  const [uploading, setUploading] = useState(false)

  const handleUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('module', file)

      const response = await fetch('/api/cv-modules/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Upload failed')

      const newModule = await response.json()
      setModules(prev => [...prev, newModule])
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Computer Vision Modules</h2>
        <div className="flex space-x-2">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept=".py,.zip"
              onChange={handleUpload}
              disabled={uploading}
            />
            <span className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              <UploadIcon className="h-5 w-5 mr-2" />
              Upload Module
            </span>
          </label>
          <button
            onClick={() => {/* Refresh module list */}}
            className="p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
          >
            <RefreshIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Module
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Version
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {modules.map((module) => (
              <tr key={module.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{module.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{module.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{module.version}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    module.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {module.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {module.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {/* Configure module */}}
                    className="text-indigo-400 hover:text-indigo-300 mr-4"
                  >
                    Configure
                  </button>
                  <button
                    onClick={() => {/* Delete module */}}
                    className="text-red-400 hover:text-red-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
