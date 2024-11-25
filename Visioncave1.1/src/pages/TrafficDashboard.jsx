import DashboardLayout from '../components/DashboardLayout'
import CameraView from '../components/CameraView'
import AnalyticsWidget from '../components/AnalyticsWidget'
import AlertWidget from '../components/AlertWidget'
import StatsWidget from '../components/StatsWidget'

const trafficData = [
  { name: '6:00 AM', count: 150 },
  { name: '9:00 AM', count: 380 },
  { name: '12:00 PM', count: 240 },
  { name: '3:00 PM', count: 320 },
  { name: '6:00 PM', count: 420 },
]

const alerts = [
  { type: 'danger', message: 'Heavy congestion detected', time: '2 mins ago' },
  { type: 'warning', message: 'Slow moving traffic ahead', time: '8 mins ago' },
  { type: 'info', message: 'Weather advisory', time: '20 mins ago' },
]

const stats = [
  { label: 'Vehicles/Hour', value: '342' },
  { label: 'Avg Speed', value: '35mph' },
  { label: 'Active Cameras', value: '12' },
  { label: 'Incidents', value: '2' },
]

export default function TrafficDashboard() {
  const handleFrame = (frame) => {
    // Process frame with TensorFlow.js
    console.log('Processing frame...')
  }

  return (
    <DashboardLayout title="Traffic Vision">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Traffic Monitoring</h2>
            <CameraView onFrame={handleFrame} />
          </div>
          <div className="mt-6">
            <AnalyticsWidget 
              title="Traffic Flow"
              data={trafficData}
              dataKey="count"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <StatsWidget 
            title="Traffic Overview"
            stats={stats}
          />
          <AlertWidget 
            title="Traffic Alerts"
            alerts={alerts}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
