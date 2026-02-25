import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PR_LIST, STATS } from '../data/mockData'

const TYPE_COLORS = {
  feature:  'badge-green',
  bugfix:   'badge-red',
  refactor: 'badge-blue',
  chore:    'badge-yellow',
}

const TYPE_LABELS = {
  feature:  'Feature',
  bugfix:   'Bug Fix',
  refactor: 'Refactor',
  chore:    'Chore',
}

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

const GitMerge = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
    <path d="M6 21V9a9 9 0 0 0 9 9"/>
  </svg>
)

const Clock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const User = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)

const File = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
  </svg>
)

const FILTER_TABS = [
  { key: 'all', label: 'All Pull Requests', value: STATS.total },
  { key: 'mine', label: 'Assigned to Me', value: STATS.assignedToMe },
  { key: 'starred', label: 'Starred', value: STATS.starred },
  { key: 'archive', label: 'Archive', value: STATS.archived },
]

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const filtered = PR_LIST.filter((pr) => {
    const q = searchQuery.toLowerCase()
    return (
      pr.title.toLowerCase().includes(q) ||
      pr.repo.toLowerCase().includes(q) ||
      pr.author.toLowerCase().includes(q)
    )
  })

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Active Summaries</h1>
        <p className="page-subtitle">Monitoring 14 repositories across your organization.</p>
      </div>

      <div className="page-body">
        {/* Stat Cards */}
        <div className="stat-grid" style={{ marginBottom: 28 }}>
          {FILTER_TABS.map((tab) => (
            <div
              key={tab.key}
              className={`stat-card ${activeFilter === tab.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.key)}
            >
              <div className="stat-card-label">{tab.label}</div>
              <div className="stat-card-value">{tab.value}</div>
              <div className="stat-card-trend">Click to filter</div>
            </div>
          ))}
        </div>

        {/* Search + Actions Bar */}
        <div className="flex items-center justify-between gap-12" style={{ marginBottom: 20 }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 380 }}>
            <svg
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="input-field"
              style={{ paddingLeft: 36 }}
              placeholder="Search pull requests…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-8">
            <button className="btn btn-secondary btn-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filter
            </button>
            <button className="btn btn-secondary btn-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
              Sort
            </button>
          </div>
        </div>

        {/* PR List */}
        <div className="pr-list">
          {filtered.map((pr) => (
            <div
              key={pr.id}
              className="pr-card"
              onClick={() => navigate(`/dashboard/${pr.id}`)}
            >
              <div className="pr-card-top">
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-8" style={{ marginBottom: 6 }}>
                    <span className={`badge ${TYPE_COLORS[pr.type]}`}>
                      {TYPE_LABELS[pr.type]}
                    </span>
                    <span className="text-muted text-sm font-mono">{pr.repo}#{pr.number}</span>
                  </div>
                  <div className="pr-card-title">{pr.title}</div>
                  <div className="pr-card-meta">
                    <span className="pr-meta-item"><User />{pr.author}</span>
                    <span className="pr-meta-item"><GitMerge />{pr.branch}</span>
                    <span className="pr-meta-item"><Clock />{pr.updatedAt}</span>
                    <span className="pr-meta-item"><File />{pr.changedFiles} files</span>
                  </div>
                </div>
                <ChevronRight />
              </div>

              <div className="pr-card-body">{pr.summary}</div>

              <div className="pr-card-footer">
                <div className="pr-card-tags">
                  {pr.tags.map((tag) => (
                    <span key={tag} className="badge badge-muted">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-8 text-sm">
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>+{pr.additions}</span>
                  <span style={{ color: 'var(--red)', fontWeight: 600 }}>-{pr.deletions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
