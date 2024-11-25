// Widget Data Service
class WidgetDataService {
  constructor() {
    this.connections = new Map()
  }

  // Register external data source
  registerDataSource(config) {
    const { id, type, url, apiKey, pollInterval = 5000 } = config
    
    switch (type) {
      case 'n8n':
        return this.setupN8NConnection(id, url, apiKey, pollInterval)
      case 'nodered':
        return this.setupNodeRedConnection(id, url, apiKey, pollInterval)
      case 'database':
        return this.setupDatabaseConnection(id, config)
      default:
        throw new Error(`Unsupported data source type: ${type}`)
    }
  }

  // N8N Integration
  setupN8NConnection(id, url, apiKey, pollInterval) {
    const connection = {
      type: 'n8n',
      status: 'connecting',
      async fetch(endpoint) {
        try {
          const response = await fetch(`${url}${endpoint}`, {
            headers: {
              'X-N8N-API-KEY': apiKey,
              'Content-Type': 'application/json'
            }
          })
          return await response.json()
        } catch (error) {
          console.error('N8N fetch error:', error)
          throw error
        }
      }
    }
    
    this.connections.set(id, connection)
    return connection
  }

  // Node-RED Integration
  setupNodeRedConnection(id, url, apiKey, pollInterval) {
    const connection = {
      type: 'nodered',
      status: 'connecting',
      async fetch(endpoint) {
        try {
          const response = await fetch(`${url}${endpoint}`, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          })
          return await response.json()
        } catch (error) {
          console.error('Node-RED fetch error:', error)
          throw error
        }
      }
    }
    
    this.connections.set(id, connection)
    return connection
  }

  // Database Connection
  setupDatabaseConnection(id, config) {
    const connection = {
      type: 'database',
      status: 'connecting',
      async query(sql, params = []) {
        try {
          const response = await fetch('/api/db/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sql, params })
          })
          return await response.json()
        } catch (error) {
          console.error('Database query error:', error)
          throw error
        }
      }
    }
    
    this.connections.set(id, connection)
    return connection
  }

  // Get data for widget
  async getWidgetData(widgetId, config) {
    const connection = this.connections.get(config.sourceId)
    if (!connection) {
      throw new Error(`No connection found for source ID: ${config.sourceId}`)
    }

    try {
      switch (connection.type) {
        case 'n8n':
          return await connection.fetch(config.endpoint)
        case 'nodered':
          return await connection.fetch(config.endpoint)
        case 'database':
          return await connection.query(config.query, config.params)
        default:
          throw new Error(`Unsupported connection type: ${connection.type}`)
      }
    } catch (error) {
      console.error('Widget data fetch error:', error)
      throw error
    }
  }
}

export const widgetDataService = new WidgetDataService()
