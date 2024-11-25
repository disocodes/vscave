import { useState } from 'react'
import { format } from 'date-fns'

export default function TimelineWidget({ events }) {
  const [expanded, setExpanded] = useState(false)

  const displayEvents = expanded ? events : events.slice(0, 5)

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Event Timeline</h3>
      <div className="space-y-4">
        {displayEvents.map((event, index) => (
          <div key={index} className="relative pl-8 pb-4">
            <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-indigo-500"></div>
            {index !== displayEvents.length - 1 && (
              <div className="absolute left-2 top-6 w-0.5 h-full bg-gray-700"></div>
            )}
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-sm text-gray-400">
                {format(new Date(event.timestamp), 'MMM d, yyyy HH:mm')}
              </div>
              <div className="text-white font-medium">{event.event_type}</div>
              <div className="text-gray-300 text-sm mt-1">{event.description}</div>
            </div>
          </div>
        ))}
      </div>
      {events.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm"
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  )
}
