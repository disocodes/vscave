const API_BASE_URL = 'http://localhost:8000/api'

export const api = {
  async fetchAnalytics(domain) {
    const response = await fetch(`${API_BASE_URL}/widgets/analytics/${domain}`)
    return response.json()
  },

  async fetchAlerts(domain) {
    const response = await fetch(`${API_BASE_URL}/widgets/alerts/${domain}`)
    return response.json()
  },

  async fetchStats(domain) {
    const response = await fetch(`${API_BASE_URL}/widgets/stats/${domain}`)
    return response.json()
  },

  async fetchHeatmap(domain) {
    const response = await fetch(`${API_BASE_URL}/widgets/heatmap/${domain}`)
    return response.json()
  },

  async fetchTimeline(domain) {
    const response = await fetch(`${API_BASE_URL}/widgets/timeline/${domain}`)
    return response.json()
  },

  async createWidget(widgetData) {
    const response = await fetch(`${API_BASE_URL}/widgets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(widgetData),
    })
    return response.json()
  },

  async updateWidget(id, widgetData) {
    const response = await fetch(`${API_BASE_URL}/widgets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(widgetData),
    })
    return response.json()
  },

  async deleteWidget(id) {
    await fetch(`${API_BASE_URL}/widgets/${id}`, {
      method: 'DELETE',
    })
  }
}
