import DashboardLayout from '../components/DashboardLayout'
import CameraView from '../components/CameraView'
import AnalyticsWidget from '../components/AnalyticsWidget'
import AlertWidget from '../components/AlertWidget'
import StatsWidget from '../components/StatsWidget'

const patientData = [
  { name: 'Ward A', count: 24 },
  { name: 'Ward B', count: 18 },
  { name: 'Ward C', count: 15 },
  { name: 'ICU', count: 8 },
]

const alerts = [
  { type: 'danger', message: 'Unauthorized access detected in ICU', time: '2 mins ago' },
  { type: 'warning', message: 'Movement detected in restricted area', time: '5 mins ago' },
  { type: 'info', message: 'Shift change in progress', time: '10 mins ago' },
]

const stats = [
  { label: 'Active Cameras', value: '24' },
  { label: 'Staff on Duty', value: '45' },
  { label: 'Current Patients', value: '128' },
  { label: 'Security Alerts', value: '3' },
]

export default function HospitalDashboard() {
  const handleFrame = (frame) => {
    // Process frame with TensorFlow.js
    console.log('Processing frame...')
  }

  return (
    <DashboardLayout title="Hospital Vision">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Live Surveillance</h2>
            <CameraView onFrame={handleFrame} />
          </div>
          <div className="mt-6">
            <AnalyticsWidget 
              title="Patient Distribution"
              data={patientData}
              dataKey="count"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <StatsWidget 
            title="Hospital Overview"
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
