import { NavLink, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    badge: '24',
  },
  {
    label: 'Settings',
    to: '/settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41"/>
      </svg>
    ),
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <div className="logo-icon">PR</div>
          <div>
            <div className="logo-text">PR Summarizer</div>
            <div className="logo-sub">Engineer Dashboard</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.to)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="avatar">A</div>
          <div className="user-info">
            <div className="user-name">alex_dev.sh</div>
            <div className="user-plan">Pro Plan</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
