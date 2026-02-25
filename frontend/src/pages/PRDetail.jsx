import { useParams, useNavigate } from 'react-router-dom'
import { PR_LIST } from '../data/mockData'

const CHANGE_ICON_MAP = {
  add:      { class: 'add',     symbol: '+' },
  fix:      { class: 'fix',     symbol: '✕' },
  refactor: { class: 'refactor', symbol: '⟳' },
  chore:    { class: 'chore',   symbol: '⚙' },
}

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
)

const TYPE_COLORS = { feature: 'badge-green', bugfix: 'badge-red', refactor: 'badge-blue', chore: 'badge-yellow' }
const TYPE_LABELS = { feature: 'Feature', bugfix: 'Bug Fix', refactor: 'Refactor', chore: 'Chore' }

export default function PRDetail() {
  const { prId } = useParams()
  const navigate = useNavigate()
  const pr = PR_LIST.find((p) => p.id === prId)

  if (!pr) {
    return (
      <div className="page-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <div className="page-title">PR not found</div>
          <button className="btn btn-primary mt-16" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-body" style={{ maxWidth: 860 }}>
      {/* Back button */}
      <button className="detail-back-btn" onClick={() => navigate('/dashboard')}>
        <ArrowLeft /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="detail-header">
        <div className="flex items-center gap-8" style={{ marginBottom: 10 }}>
          <span className={`badge ${TYPE_COLORS[pr.type]}`}>{TYPE_LABELS[pr.type]}</span>
          <span className="badge badge-green">Open</span>
          <span className="text-muted text-sm font-mono">{pr.repo} #{pr.number}</span>
        </div>
        <h1 className="detail-title">{pr.title}</h1>
        <div className="detail-meta">
          <span className="detail-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            {pr.author}
          </span>
          <span className="detail-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
              <path d="M6 21V9a9 9 0 0 0 9 9"/>
            </svg>
            {pr.branch}
          </span>
          <span className="detail-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Opened {pr.createdAt} · Updated {pr.updatedAt}
          </span>
          <span className="detail-meta-item">
            Reviewers: {pr.reviewers.join(', ')}
          </span>
        </div>
      </div>

      {/* AI Summary Box */}
      <div className="summary-box">
        <div className="summary-box-label">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          AI-Generated Summary
        </div>
        <p className="summary-box-text">{pr.summary}</p>
      </div>

      {/* Diff Stats */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div>
            <div className="card-title">Diff Statistics</div>
            <div className="card-subtitle">{pr.changedFiles} files changed</div>
          </div>
          <div className="flex gap-12">
            <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 14 }}>+{pr.additions}</span>
            <span style={{ color: 'var(--red)', fontWeight: 700, fontSize: 14 }}>-{pr.deletions}</span>
          </div>
        </div>
        {/* Mini bar */}
        <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-elevated)', overflow: 'hidden', marginBottom: 16 }}>
          <div style={{
            height: '100%',
            width: `${(pr.additions / (pr.additions + pr.deletions)) * 100}%`,
            background: 'var(--accent)',
            borderRadius: 3,
          }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pr.files.map((f) => (
            <div key={f.name} className="file-stat">
              <span className="file-stat-name">{f.name}</span>
              <div className="file-stat-changes">
                <span className="file-stat-add">+{f.additions}</span>
                <span className="file-stat-del">-{f.deletions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Changes */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div>
            <div className="card-title">Key Changes</div>
            <div className="card-subtitle">Automatically extracted change points</div>
          </div>
        </div>
        <div className="change-list">
          {pr.changes.map((change, i) => {
            const icon = CHANGE_ICON_MAP[change.type] || CHANGE_ICON_MAP.add
            return (
              <div key={i} className="change-item">
                <div className={`change-icon ${icon.class}`}>{icon.symbol}</div>
                <div className="change-text">{change.text}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tags */}
      <div className="card">
        <div className="card-title" style={{ marginBottom: 12 }}>Labels & Tags</div>
        <div className="pr-card-tags">
          {pr.tags.map((tag) => (
            <span key={tag} className="badge badge-muted">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
