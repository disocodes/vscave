import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import HeatmapWidget from './widgets/HeatmapWidget'
import TimelineWidget from './widgets/TimelineWidget'
import AdvancedAnalyticsWidget from './widgets/AdvancedAnalyticsWidget'
import MetricsGridWidget from './widgets/MetricsGridWidget'
import { useWidgetData } from '../hooks/useWidgetData'

const WIDGET_COMPONENTS = {
  heatmap: HeatmapWidget,
  timeline: TimelineWidget,
  analytics: AdvancedAnalyticsWidget,
  metrics: MetricsGridWidget,
}

export default function DashboardGrid({ domain, widgets, onLayoutChange }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(widgets)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onLayoutChange(items)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="dashboard">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {widgets.map((widget, index) => (
              <Draggable
                key={widget.id}
                draggableId={widget.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`${
                      widget.size === 'large' ? 'md:col-span-2 lg:col-span-3' :
                      widget.size === 'medium' ? 'lg:col-span-2' :
                      ''
                    }`}
                  >
                    <div className="h-full">
                      <div
                        {...provided.dragHandleProps}
                        className="bg-gray-700 rounded-t-lg p-2 cursor-move"
                      >
                        <div className="w-8 h-1 bg-gray-600 rounded mx-auto" />
                      </div>
                      <WidgetRenderer
                        widget={widget}
                        domain={domain}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

function WidgetRenderer({ widget, domain }) {
  const { data, loading, error } = useWidgetData(widget.type, domain)
  const WidgetComponent = WIDGET_COMPONENTS[widget.type]

  if (!WidgetComponent) {
    return <div>Unknown widget type: {widget.type}</div>
  }

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-b-lg p-4 animate-pulse">
        <div className="h-48 bg-gray-700 rounded" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-b-lg p-4">
        <div className="text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-b-lg">
      <WidgetComponent {...widget.config} data={data} />
    </div>
  )
}
