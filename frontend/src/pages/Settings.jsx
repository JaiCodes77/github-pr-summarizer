import { useState } from 'react'
import Toggle from '../components/Toggle'
import { REPOS } from '../data/mockData'

const EyeOff = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const Eye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const Trash = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
)

const Plus = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const SETTINGS_NAV = [
  { id: 'auth', label: 'Authentication' },
  { id: 'repos', label: 'Repositories' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'danger', label: 'Danger Zone' },
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState('auth')
  const [showToken, setShowToken] = useState(false)
  const [githubToken, setGithubToken] = useState('ghp_•••••••••••••••••••••••••••••••••••')
  const [repos, setRepos] = useState(REPOS)
  const [newRepo, setNewRepo] = useState('')

  // Preferences
  const [summaryDetail, setSummaryDetail] = useState('detailed')
  const [autoSummarize, setAutoSummarize] = useState(true)
  const [includeCodeSnippets, setIncludeCodeSnippets] = useState(true)
  const [includeMetrics, setIncludeMetrics] = useState(true)
  const [maxPRAge, setMaxPRAge] = useState('7')

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [slackNotifs, setSlackNotifs] = useState(false)
  const [digestFreq, setDigestFreq] = useState('daily')
  const [notifyNewPR, setNotifyNewPR] = useState(true)
  const [notifyMerged, setNotifyMerged] = useState(true)

  const [saved, setSaved] = useState(false)

  const handleToggleRepo = (id, val) => {
    setRepos((r) => r.map((repo) => repo.id === id ? { ...repo, enabled: val } : repo))
  }

  const handleAddRepo = () => {
    if (newRepo.trim()) {
      setRepos((r) => [...r, { id: Date.now().toString(), name: newRepo.trim(), lastActive: 'Just added', enabled: true }])
      setNewRepo('')
    }
  }

  const handleRemoveRepo = (id) => {
    setRepos((r) => r.filter((repo) => repo.id !== id))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">App Settings</h1>
        <p className="page-subtitle">Configure your environment variables, personal access tokens, and repository monitoring preferences for automated PR summarization.</p>
      </div>

      <div className="page-body">
        <div className="settings-layout">
          {/* Settings Nav */}
          <nav className="settings-nav">
            {SETTINGS_NAV.map((s) => (
              <button
                key={s.id}
                className={`settings-nav-item ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => setActiveSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Settings Content */}
          <div className="settings-sections">

            {/* ─── Authentication ─── */}
            {activeSection === 'auth' && (
              <div className="card">
                <div className="settings-section-title">Authentication</div>
                <div className="settings-section-desc">
                  Tokens are encrypted and never stored in plain text. Minimum scope required: <code style={{ color: 'var(--accent)', fontSize: 11 }}>repo</code>, <code style={{ color: 'var(--accent)', fontSize: 11 }}>read:org</code>.
                </div>

                <div className="scope-tags" style={{ marginBottom: 24 }}>
                  <span className="scope-tag"><Check />repo</span>
                  <span className="scope-tag"><Check />read:org</span>
                </div>

                <div className="settings-row">
                  <div className="input-group">
                    <label className="input-label">GitHub Personal Access Token</label>
                    <div className="password-input">
                      <input
                        className="input-field"
                        type={showToken ? 'text' : 'password'}
                        value={githubToken}
                        onChange={(e) => setGithubToken(e.target.value)}
                        placeholder="ghp_••••••••••••••••••••••••••••"
                      />
                      <button className="password-toggle" onClick={() => setShowToken((v) => !v)}>
                        {showToken ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    <span className="input-hint">Generate a new token at GitHub → Settings → Developer settings → Personal access tokens.</span>
                  </div>

                  <div className="input-group">
                    <label className="input-label">GitHub Organization (optional)</label>
                    <input className="input-field" placeholder="your-org-name" defaultValue="acme-corp" />
                    <span className="input-hint">Leave blank to monitor your personal repositories only.</span>
                  </div>

                  <div className="flex" style={{ gap: 10, marginTop: 8 }}>
                    <button className="btn btn-primary" onClick={handleSave}>
                      {saved ? <><Check /> Saved!</> : 'Save Credentials'}
                    </button>
                    <button className="btn btn-secondary">Test Connection</button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Repositories ─── */}
            {activeSection === 'repos' && (
              <div className="card">
                <div className="settings-section-title">Monitored Repositories</div>
                <div className="settings-section-desc">Add repositories to monitor. PR Summarizer will automatically detect new pull requests and generate summaries.</div>

                <div className="input-with-btn" style={{ marginBottom: 20 }}>
                  <input
                    className="input-field"
                    placeholder="owner/repository-name"
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddRepo()}
                  />
                  <button className="btn btn-primary" onClick={handleAddRepo}>
                    <Plus /> Add
                  </button>
                </div>

                <div className="repo-list">
                  {repos.map((repo) => (
                    <div key={repo.id} className="repo-item">
                      <div className="repo-info">
                        <div className="repo-name">{repo.name}</div>
                        <div className="repo-activity">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                          {repo.enabled ? `Last active: ${repo.lastActive}` : 'Monitoring disabled'}
                        </div>
                      </div>
                      <div className="repo-actions">
                        <span className={`badge ${repo.enabled ? 'badge-green' : 'badge-muted'}`}>
                          {repo.enabled ? 'Active' : 'Paused'}
                        </span>
                        <Toggle
                          id={`repo-toggle-${repo.id}`}
                          checked={repo.enabled}
                          onChange={(v) => handleToggleRepo(repo.id, v)}
                        />
                        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => handleRemoveRepo(repo.id)} title="Remove">
                          <Trash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Preferences ─── */}
            {activeSection === 'preferences' && (
              <div className="card">
                <div className="settings-section-title">Summary Preferences</div>
                <div className="settings-section-desc">Control how AI-generated summaries are created and displayed.</div>

                <div className="settings-row">
                  <div className="input-group">
                    <label className="input-label">Summary Detail Level</label>
                    <select
                      className="select-field"
                      value={summaryDetail}
                      onChange={(e) => setSummaryDetail(e.target.value)}
                    >
                      <option value="brief">Brief — 1–2 sentence overview</option>
                      <option value="standard">Standard — Key changes with context</option>
                      <option value="detailed">Detailed — Full breakdown with code refs</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Max PR Age to Summarize (days)</label>
                    <input
                      className="input-field"
                      type="number"
                      min="1" max="90"
                      value={maxPRAge}
                      onChange={(e) => setMaxPRAge(e.target.value)}
                      style={{ maxWidth: 140 }}
                    />
                  </div>

                  <div className="divider" />

                  <div className="toggle-row">
                    <div className="toggle-info">
                      <div className="toggle-label">Auto-summarize new PRs</div>
                      <div className="toggle-desc">Generate summaries automatically when new pull requests are opened.</div>
                    </div>
                    <Toggle id="auto-summarize" checked={autoSummarize} onChange={setAutoSummarize} />
                  </div>

                  <div className="toggle-row">
                    <div className="toggle-info">
                      <div className="toggle-label">Include code snippets</div>
                      <div className="toggle-desc">Attach relevant code excerpts to the summary for quick context.</div>
                    </div>
                    <Toggle id="include-snippets" checked={includeCodeSnippets} onChange={setIncludeCodeSnippets} />
                  </div>

                  <div className="toggle-row">
                    <div className="toggle-info">
                      <div className="toggle-label">Include diff metrics</div>
                      <div className="toggle-desc">Show additions, deletions and file count in the summary header.</div>
                    </div>
                    <Toggle id="include-metrics" checked={includeMetrics} onChange={setIncludeMetrics} />
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <button className="btn btn-primary" onClick={handleSave}>
                      {saved ? <><Check /> Saved!</> : 'Save Preferences'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Notifications ─── */}
            {activeSection === 'notifications' && (
              <div className="card">
                <div className="settings-section-title">Notifications</div>
                <div className="settings-section-desc">Choose how and when you receive alerts about new summaries and PR activity.</div>

                <div className="settings-row">
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <div className="toggle-label">Email notifications</div>
                      <div className="toggle-desc">Receive summary digests and PR alerts to your email.</div>
                    </div>
                    <Toggle id="email-notif" checked={emailNotifs} onChange={setEmailNotifs} />
                  </div>

                  {emailNotifs && (
                    <div className="input-group" style={{ marginLeft: 0 }}>
                      <label className="input-label">Email address</label>
                      <input className="input-field" type="email" defaultValue="alex@acme.dev" />
                    </div>
                  )}

                  <div className="toggle-row">
                    <div className="toggle-info">
                      <div className="toggle-label">Slack integration</div>
                      <div className="toggle-desc">Post summaries to your Slack channel automatically.</div>
                    </div>
                    <Toggle id="slack-notif" checked={slackNotifs} onChange={setSlackNotifs} />
                  </div>

                  {slackNotifs && (
                    <div className="input-group">
                      <label className="input-label">Slack Webhook URL</label>
                      <input className="input-field" placeholder="https://hooks.slack.com/…" />
                    </div>
                  )}

                  <div className="divider" />

                  <div className="input-group">
                    <label className="input-label">Digest frequency</label>
                    <select className="select-field" value={digestFreq} onChange={(e) => setDigestFreq(e.target.value)} style={{ maxWidth: 220 }}>
                      <option value="realtime">Real-time (on every event)</option>
                      <option value="hourly">Hourly digest</option>
                      <option value="daily">Daily digest</option>
                      <option value="weekly">Weekly digest</option>
                    </select>
                  </div>

                  <div className="toggle-row">
                    <div className="toggle-info">
                      <div className="toggle-label">Notify on new PR</div>
                      <div className="toggle-desc">Alert when a new PR is opened in a monitored repository.</div>
                    </div>
                    <Toggle id="notify-new" checked={notifyNewPR} onChange={setNotifyNewPR} />
                  </div>

                  <div className="toggle-row">
                    <div className="toggle-info">
                      <div className="toggle-label">Notify on merge</div>
                      <div className="toggle-desc">Alert when a monitored PR is merged or closed.</div>
                    </div>
                    <Toggle id="notify-merged" checked={notifyMerged} onChange={setNotifyMerged} />
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <button className="btn btn-primary" onClick={handleSave}>
                      {saved ? <><Check /> Saved!</> : 'Save Notification Settings'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Danger Zone ─── */}
            {activeSection === 'danger' && (
              <div className="card" style={{ borderColor: 'rgba(240,93,93,0.3)' }}>
                <div className="settings-section-title" style={{ color: 'var(--red)' }}>Danger Zone</div>
                <div className="settings-section-desc">These actions are irreversible. Please proceed with caution.</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { title: 'Clear all summaries', desc: 'Permanently delete all generated PR summaries. The PRs themselves are unaffected.', action: 'Clear Summaries' },
                    { title: 'Revoke GitHub token', desc: 'Remove the stored GitHub token. You will need to re-add credentials to continue monitoring.', action: 'Revoke Token' },
                    { title: 'Delete account', desc: 'Permanently remove your PR Summarizer account and all associated data.', action: 'Delete Account' },
                  ].map((item) => (
                    <div key={item.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '16px', background: 'var(--red-dim)', borderRadius: 'var(--radius)', border: '1px solid rgba(240,93,93,0.15)' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                      </div>
                      <button className="btn btn-danger btn-sm" style={{ whiteSpace: 'nowrap' }}>{item.action}</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Toast */}
      {saved && (
        <div className="toast-container">
          <div className="toast success">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Settings saved successfully
          </div>
        </div>
      )}
    </>
  )
}
