import { useState } from 'react'

export default function WorkflowBuilder() {
  const [nodes, setNodes] = useState([])

  return (
    <div className="h-[800px] bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 p-4 border-r border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Components</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Input/Output</h4>
              <div className="space-y-2">
                <NodeComponent type="camera" label="Camera Input" />
                <NodeComponent type="file" label="File Input" />
                <NodeComponent type="output" label="Display Output" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Database</h4>
              <div className="space-y-2">
                <NodeComponent type="database" label="Database Connection" />
                <NodeComponent type="query" label="SQL Query" />
                <NodeComponent type="transform" label="Data Transform" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Processing</h4>
              <div className="space-y-2">
                <NodeComponent type="detection" label="Object Detection" />
                <NodeComponent type="tracking" label="Object Tracking" />
                <NodeComponent type="classification" label="Classification" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Integration</h4>
              <div className="space-y-2">
                <NodeComponent type="nodered" label="Node-RED" />
                <NodeComponent type="n8n" label="n8n" />
                <NodeComponent type="api" label="REST API" />
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-850 p-4">
          <div className="bg-gray-900 h-full rounded-lg border border-gray-700 p-4">
            <div className="text-gray-400 text-center">
              Drag and drop components here to build your workflow
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NodeComponent({ type, label }) {
  return (
    <div className="bg-gray-800 p-2 rounded cursor-pointer text-gray-300 hover:bg-gray-700">
      {label}
    </div>
  )
}
