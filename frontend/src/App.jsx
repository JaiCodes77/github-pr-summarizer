import { Routes, Route, Navigate } from 'react-router-dom'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import PRDetail from './pages/PRDetail'

export default function App() {
  return (
    <div className="app-layout">
      <TopBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:prId" element={<PRDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}
