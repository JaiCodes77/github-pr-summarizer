import { useNavigate, useLocation } from 'react-router-dom'

export default function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isSettings = location.pathname === '/settings'

  return (
    <header className="topbar">
      {/* Logo */}
      <div className="topbar-logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
        <div className="topbar-logo-icon">PR</div>
        <div>
          <div className="topbar-logo-text">PR Summarizer</div>
          <div className="topbar-logo-sub">Engineer Dashboard</div>
        </div>
      </div>

      {/* Right side */}
      <div className="topbar-right">
        <div className="topbar-user">
          <div className="topbar-avatar">A</div>
          <div className="topbar-user-info">
            <span className="topbar-user-name">alex_dev.sh</span>
            <span className="topbar-user-plan">Pro Plan</span>
          </div>
        </div>

        {/* Settings button */}
        <button
          className={`topbar-settings-btn ${isSettings ? 'active' : ''}`}
          onClick={() => navigate(isSettings ? '/dashboard' : '/settings')}
          title={isSettings ? 'Back to Dashboard' : 'Settings'}
        >
          {isSettings ? (
            /* X icon when on settings */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            /* Gear icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}
