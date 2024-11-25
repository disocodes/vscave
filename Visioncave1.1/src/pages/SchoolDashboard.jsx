import DashboardLayout from '../components/DashboardLayout'
import CameraView from '../components/CameraView'
import AnalyticsWidget from '../components/AnalyticsWidget'
import AlertWidget from '../components/AlertWidget'
import StatsWidget from '../components/StatsWidget'

const attendanceData = [
  { name: 'Building A', count: 245 },
  { name: 'Building B', count: 180 },
  { name: 'Cafeteria', count: 120 },
  { name: 'Gymnasium', count: 85 },
]

const alerts = [
  { type: 'warning', message: 'Unauthorized access at rear entrance', time: '3 mins ago' },
  { type: 'info', message: 'Class change in progress', time: '10 mins ago' },
  { type: 'info', message: 'Fire drill scheduled', time: '25 mins ago' },
]

const stats = [
  { label: 'Students Present', value: '856' },
  { label: 'Staff Present', value: '92' },
  { label: 'Active Cameras', value: '32' },
  { label: 'Security Alerts', value: '2' },
]

export default function SchoolDashboard() {
  const handleFrame = (frame) => {
    // Process frame with TensorFlow.js
    console.log('Processing frame...')
  }

  return (
    <DashboardLayout title="School Vision">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Campus Surveillance</h2>
            <CameraView onFrame={handleFrame} />
          </div>
          <div className="mt-6">
            <AnalyticsWidget 
              title="Building Occupancy"
              data={attendanceData}
              dataKey="count"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <StatsWidget 
            title="Campus Overview"
            stats={stats}
          />
          <AlertWidget 
            title="Security Alerts"
            alerts={alerts}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
