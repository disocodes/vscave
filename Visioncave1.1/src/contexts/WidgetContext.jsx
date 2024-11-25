import { createContext, useContext, useReducer } from 'react'

const WidgetContext = createContext()

const widgetReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_WIDGET':
      return {
        ...state,
        [action.domain]: [
          ...(state[action.domain] || []),
          action.widget
        ]
      }
    case 'REMOVE_WIDGET':
      return {
        ...state,
        [action.domain]: state[action.domain].filter(
          widget => widget.id !== action.widgetId
        )
      }
    case 'UPDATE_WIDGET':
      return {
        ...state,
        [action.domain]: state[action.domain].map(widget =>
          widget.id === action.widgetId
            ? { ...widget, ...action.updates }
            : widget
        )
      }
    case 'REORDER_WIDGETS':
      return {
        ...state,
        [action.domain]: action.widgets
      }
    default:
      return state
  }
}

export function WidgetProvider({ children }) {
  const [state, dispatch] = useReducer(widgetReducer, {})

  const addWidget = (domain, widget) => {
    dispatch({ type: 'ADD_WIDGET', domain, widget })
  }

  const removeWidget = (domain, widgetId) => {
    dispatch({ type: 'REMOVE_WIDGET', domain, widgetId })
  }

  const updateWidget = (domain, widgetId, updates) => {
    dispatch({ type: 'UPDATE_WIDGET', domain, widgetId, updates })
  }

  const reorderWidgets = (domain, widgets) => {
    dispatch({ type: 'REORDER_WIDGETS', domain, widgets })
  }

  return (
    <WidgetContext.Provider value={{
      widgets: state,
      addWidget,
      removeWidget,
      updateWidget,
      reorderWidgets
    }}>
      {children}
    </WidgetContext.Provider>
  )
}

export function useWidgets() {
  const context = useContext(WidgetContext)
  if (!context) {
    throw new Error('useWidgets must be used within a WidgetProvider')
  }
  return context
}
