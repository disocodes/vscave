import DashboardLayout from '../components/DashboardLayout'
import StatsWidget from '../components/widgets/StatsWidget'
import AlertWidget from '../components/widgets/AlertWidget'
import { mockData } from '../utils/mockData'

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StatsWidget 
            title="System Overview"
            stats={mockData.analytics.metrics}
          />
        </div>
        <div>
          <AlertWidget 
            title="Recent Alerts"
            alerts={mockData.analytics.alerts}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
