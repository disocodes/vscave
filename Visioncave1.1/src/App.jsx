import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ResidentialDashboard from './pages/ResidentialDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/residential" element={<ResidentialDashboard />} />
    </Routes>
  )
}

export default App
