import { Link } from 'react-router-dom'
import { HomeIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function DashboardLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-white">
                VisionCave
              </Link>
              <span className="ml-4 text-gray-400">|</span>
              <span className="ml-4 text-gray-300">{title}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <HomeIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
