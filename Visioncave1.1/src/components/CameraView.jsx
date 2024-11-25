import { useState, useEffect } from 'react'

export default function CameraView({ onFrame }) {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamp = new Date().toLocaleTimeString()
      setTimestamp(newTimestamp)
      if (onFrame) {
        onFrame(newTimestamp)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [onFrame])

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden">
      <div className="aspect-video flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block p-6 rounded-lg bg-gray-700">
            <svg 
              className="w-12 h-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
              />
            </svg>
            <div className="mt-4 space-y-2">
              <p className="text-gray-300 text-sm">Camera Feed Simulation</p>
              <p className="text-blue-400 font-mono">{timestamp}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-300">Live</span>
        </div>
      </div>
    </div>
  )
}
