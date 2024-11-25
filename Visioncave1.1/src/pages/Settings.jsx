import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useAuth } from '../contexts/AuthContext'

const TABS = {
  GENERAL: 'general',
  USERS: 'users',
  PERMISSIONS: 'permissions'
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState(TABS.GENERAL)
  const { currentUser } = useAuth()
  const [users, setUsers] = useState([
    {
      id: '1',
      email: 'admin@visioncave.com',
      role: 'Super Admin',
      permissions: {
        residential: true,
        school: true,
        hospital: true,
        minesite: true,
        traffic: true
      }
    },
    {
      id: '2',
      email: 'user@visioncave.com',
      role: 'User',
      permissions: {
        residential: true,
        school: true,
        hospital: false,
        minesite: false,
        traffic: true
      }
    }
  ])

  const handlePermissionChange = (userId, domain) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          permissions: {
            ...user.permissions,
            [domain]: !user.permissions[domain]
          }
        }
      }
      return user
    }))
  }

  return (
    <DashboardLayout title="Settings">
      <div className="bg-gray-800 rounded-lg shadow-lg">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab(TABS.GENERAL)}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === TABS.GENERAL
                  ? 'border-b-2 border-indigo-500 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              General
            </button>
            {currentUser?.isSuperUser && (
              <>
                <button
                  onClick={() => setActiveTab(TABS.USERS)}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === TABS.USERS
                      ? 'border-b-2 border-indigo-500 text-white'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Users
                </button>
                <button
                  onClick={() => setActiveTab(TABS.PERMISSIONS)}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === TABS.PERMISSIONS
                      ? 'border-b-2 border-indigo-500 text-white'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Permissions
                </button>
              </>
            )}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === TABS.GENERAL && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white">General Settings</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Email Notifications
                  </label>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600"
                      />
                      <span className="ml-2 text-gray-300">
                        Receive alert notifications
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Theme
                  </label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-700 text-gray-300 rounded-md">
                    <option>Dark</option>
                    <option>Light</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === TABS.USERS && currentUser?.isSuperUser && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Users</h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Add User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          <button className="text-indigo-400 hover:text-indigo-300">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === TABS.PERMISSIONS && currentUser?.isSuperUser && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white">Domain Permissions</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Residential
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        School
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Hospital
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Minesite
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Traffic
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          {user.email}
                        </td>
                        {Object.entries(user.permissions).map(([domain, hasAccess]) => (
                          <td key={domain} className="px-6 py-4 whitespace-nowrap text-center">
                            <input
                              type="checkbox"
                              checked={hasAccess}
                              onChange={() => handlePermissionChange(user.id, domain)}
                              className="h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 rounded"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
