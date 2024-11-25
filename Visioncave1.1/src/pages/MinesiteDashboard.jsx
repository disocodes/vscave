import DashboardLayout from '../components/DashboardLayout'
import CameraView from '../components/CameraView'
import AnalyticsWidget from '../components/AnalyticsWidget'
import AlertWidget from '../components/AlertWidget'
import StatsWidget from '../components/StatsWidget'

const equipmentData = [
  { name: 'Excavators', count: 8 },
  { name: 'Dump Trucks', count: 12 },
  { name: 'Loaders', count: 6 },
  { name: 'Dozers', count: 4 },
]

const alerts = [
  { type: 'danger', message: 'Vehicle approaching restricted zone', time: '1 min ago' },
  { type: 'warning', message: 'Equipment maintenance due', time: '15 mins ago' },
  { type: 'info', message: 'Shift change completed', time: '30 mins ago' },
]

const stats = [
  { label: 'Active Equipment', value: '28' },
  { label: 'Workers Present', value: '145' },
  { label: 'Active Zones', value: '6' },
  { label: 'Safety Alerts', value: '2' },
]

export default function MinesiteDashboard() {
  const handleFrame = (frame) => {
    // Process frame with TensorFlow.js
    console.log('Processing frame...')
  }

  return (
    <DashboardLayout title="Minesite Vision">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Site Monitoring</h2>
            <CameraView onFrame={handleFrame} />
          </div>
          <div className="mt-6">
            <AnalyticsWidget 
              title="Equipment Distribution"
              data={equipmentData}
              dataKey="count"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <StatsWidget 
            title="Site Overview"
            stats={stats}
          />
          <AlertWidget 
            title="Safety Alerts"
            alerts={alerts}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
