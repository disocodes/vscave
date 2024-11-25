import { useState } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { PlayIcon, StopIcon, SaveIcon } from '@heroicons/react/24/solid'

export default function ModuleEditorWidget({ onSave, onRun, initialCode = '' }) {
  const [code, setCode] = useState(initialCode)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')

  const defaultCode = `# YOLOv5 Example
import cv2
import torch

class CustomDetector:
    def __init__(self):
        self.model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
    
    def process_frame(self, frame):
        results = self.model(frame)
        return results.render()[0]
    
    def get_detections(self, frame):
        results = self.model(frame)
        return results.pandas().xyxy[0].to_dict('records')

# Example usage:
# detector = CustomDetector()
# results = detector.process_frame(frame)
`

  const handleRun = async () => {
    setIsRunning(true)
    try {
      const response = await fetch('/api/run-module', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
      const data = await response.json()
      setOutput(data.output)
      onRun?.(data)
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    }
    setIsRunning(false)
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Python Module Editor</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onSave?.(code)}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <SaveIcon className="h-4 w-4 mr-1" />
            Save
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`px-3 py-1 ${
              isRunning ? 'bg-red-600' : 'bg-green-600'
            } text-white rounded-md hover:${
              isRunning ? 'bg-red-700' : 'bg-green-700'
            } flex items-center`}
          >
            {isRunning ? (
              <>
                <StopIcon className="h-4 w-4 mr-1" />
                Stop
              </>
            ) : (
              <>
                <PlayIcon className="h-4 w-4 mr-1" />
                Run
              </>
            )}
          </button>
        </div>
      </div>

      <div className="h-[500px]">
        <MonacoEditor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code || defaultCode}
          onChange={setCode}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
          }}
        />
      </div>

      {output && (
        <div className="p-4 bg-gray-900 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Output:</h4>
          <pre className="text-sm text-white whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  )
}
