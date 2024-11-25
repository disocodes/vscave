export const mockData = {
  analytics: {
    residential: [
      { timestamp: '2023-01-01T00:00:00', value: 45, category: 'Motion' },
      { timestamp: '2023-01-01T01:00:00', value: 32, category: 'Motion' },
      { timestamp: '2023-01-01T02:00:00', value: 28, category: 'Motion' },
      // Add more mock data...
    ],
    metrics: [
      { label: 'Active Cameras', value: '6', unit: 'units' },
      { label: 'Motion Events', value: '24', unit: 'events' },
      { label: 'Battery Level', value: '85', unit: '%' },
      { label: 'Storage Used', value: '64', unit: 'GB' }
    ],
    alerts: [
      { type: 'warning', message: 'Motion detected in living room', time: '2 mins ago' },
      { type: 'info', message: 'Camera 2 battery low', time: '5 mins ago' },
      { type: 'danger', message: 'Connection lost with device', time: '10 mins ago' }
    ]
  }
}
