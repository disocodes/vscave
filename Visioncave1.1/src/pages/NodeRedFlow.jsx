import DashboardLayout from '../components/DashboardLayout'

export default function NodeRedFlow() {
  return (
    <DashboardLayout title="Node-RED Flow Editor">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Node-RED Flow Editor</h2>
        
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <p className="text-gray-300">
            Configure your vision analytics workflow using Node-RED integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">Input Nodes</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Camera Feed</li>
              <li>Image Upload</li>
              <li>Video Stream</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">Processing Nodes</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Object Detection</li>
              <li>Face Recognition</li>
              <li>Motion Analysis</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">Output Nodes</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Dashboard Widget</li>
              <li>Alert System</li>
              <li>Data Storage</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Deploy Flow
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
