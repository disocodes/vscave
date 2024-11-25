import { Link } from 'react-router-dom'
import { HomeIcon, AcademicCapIcon, HeartIcon } from '@heroicons/react/24/outline'

const modules = [
  {
    title: 'Residential Vision',
    description: 'Smart home monitoring and security analytics',
    icon: HomeIcon,
    path: '/residential',
    color: 'bg-blue-500'
  },
  {
    title: 'School Vision',
    description: 'Campus security and student safety monitoring',
    icon: AcademicCapIcon,
    path: '/school',
    color: 'bg-green-500'
  },
  {
    title: 'Hospital Vision',
    description: 'Patient monitoring and facility security',
    icon: HeartIcon,
    path: '/hospital',
    color: 'bg-purple-500'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            VisionCave
          </h1>
          <p className="text-xl text-gray-400">
            Advanced Vision Analytics Platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.title}
              to={module.path}
              className="transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                <div className={`${module.color} p-6`}>
                  <module.icon className="h-12 w-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-gray-400">
                    {module.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
