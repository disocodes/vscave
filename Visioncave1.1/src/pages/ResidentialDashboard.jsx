import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'

export default function ResidentialDashboard() {
  return (
    <DashboardLayout title="Residential Vision">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Camera Feed</h2>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Camera feed will appear here</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Analytics</h2>
            <p className="text-gray-400">Analytics will appear here</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
