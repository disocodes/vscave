import { useState } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { PlayIcon, StopIcon, SaveIcon, CameraIcon } from '@heroicons/react/24/solid'

export default function CustomWidgetEditor({ onSave }) {
  const [code, setCode] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [selectedModel, setSelectedModel] = useState('yolov5s')
  const [cameraSource, setCameraSource] = useState('0')

  const defaultCode = `# YOLOv5 Real-time Detection Example
import cv2
import torch

class DetectionWidget:
    def __init__(self, model_name='yolov5s', camera_source=0):
        self.model = torch.hub.load('ultralytics/yolov5', model_name)
        self.camera_source = camera_source
        
    def process_frame(self, frame):
        # Run inference
        results = self.model(frame)
        
        # Process detections
        detections = results.pandas().xyxy[0]
        
        # Draw boxes
        for _, det in detections.iterrows():
            x1, y1, x2, y2 = int(det['xmin']), int(det['ymin']), int(det['xmax']), int(det['ymax'])
            conf, cls = det['confidence'], det['class']
            label = f"{det['name']} {conf:.2f}"
            
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        return frame, detections.to_dict('records')

    def get_analytics(self, detections):
        # Process detections for analytics
        class_counts = {}
        for det in detections:
            cls = det['name']
            class_counts[cls] = class_counts.get(cls, 0) + 1
        return class_counts

# Example usage:
# widget = DetectionWidget(model_name='yolov5s', camera_source=0)
# frame = get_camera_frame()
# processed_frame, detections = widget.process_frame(frame)
# analytics = widget.get_analytics(detections)
`

  const handleRun = async () => {
    setIsRunning(true)
    try {
      const response = await fetch('/api/run-widget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code,
          modelName: selectedModel,
          cameraSource
        }),
      })
      const data = await response.json()
      setOutput(data.output)
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    }
    setIsRunning(false)
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Custom Vision Widget Editor</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onSave?.(code)}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <SaveIcon className="h-4 w-4 mr-1" />
              Save Widget
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

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
            >
              <option value="yolov5n">YOLOv5n (Fastest)</option>
              <option value="yolov5s">YOLOv5s (Fast)</option>
              <option value="yolov5m">YOLOv5m (Balanced)</option>
              <option value="yolov5l">YOLOv5l (Accurate)</option>
              <option value="yolov5x">YOLOv5x (Most Accurate)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Camera Source
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={cameraSource}
                onChange={(e) => setCameraSource(e.target.value)}
                className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                placeholder="Camera index or URL"
              />
              <button
                onClick={() => {/* Open camera preview */}}
                className="px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              >
                <CameraIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
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
