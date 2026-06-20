import { useState } from 'react'

const API_BASE = 'http://127.0.0.1:8000/api/v1/admin'
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_API_TOKEN || localStorage.getItem('tatvika-admin-token') || ''

type SectionStatus = 'active' | 'empty' | 'coming_soon'

function parseList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseCards(value: string) {
  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) {
      throw new Error('Cards must be a JSON array.')
    }
    return parsed
  } catch {
    throw new Error('Cards must contain valid JSON.')
  }
}

async function parseResponse(response: Response) {
  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text)
  } catch {
    return { detail: text }
  }
}

export default function AdminPanel() {
  const [sectionId, setSectionId] = useState('courses-academic')
  const [menuLabel, setMenuLabel] = useState('Courses')
  const [routePath, setRoutePath] = useState('/courses')
  const [currentStatus, setCurrentStatus] = useState<SectionStatus>('active')
  const [title, setTitle] = useState('Popular Courses')
  const [subtitle, setSubtitle] = useState('Fresh study materials curated for the current batch.')
  const [message, setMessage] = useState('No course cards are live right now.')
  const [guidance, setGuidance] = useState('Add cards from the admin panel to publish this section.')
  const [heading, setHeading] = useState('Coming soon')
  const [subheading, setSubheading] = useState('This section will launch after the next content review.')
  const [previewItems, setPreviewItems] = useState('Mock Test, Notes Pack')
  const [ctaLabel, setCtaLabel] = useState('Notify me when live')
  const [cards, setCards] = useState('[{"id":"course-1","title":"Accountancy Basics","subject":"Accounts","price":"₹450"}]')
  const [filters, setFilters] = useState('Accounts,Economics')
  const [statusMessage, setStatusMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const buildPayload = () => {
    if (!sectionId.trim()) throw new Error('Section ID is required.')
    if (!menuLabel.trim()) throw new Error('Menu Label is required.')
    if (!routePath.trim() || !routePath.trim().startsWith('/')) {
      throw new Error('Route Path must start with /.')
    }
    if (!title.trim()) throw new Error('Title is required.')

    const baseLayout = {
      current_status: currentStatus,
      title: title.trim(),
      subtitle: currentStatus === 'active' ? subtitle.trim() : undefined,
      message: currentStatus === 'empty' ? message.trim() : undefined,
      guidance: currentStatus === 'empty' ? guidance.trim() : undefined,
      heading: currentStatus === 'coming_soon' ? heading.trim() : undefined,
      subheading: currentStatus === 'coming_soon' ? subheading.trim() : undefined,
      preview_items: currentStatus === 'coming_soon' ? parseList(previewItems) : undefined,
      cta_label: currentStatus === 'coming_soon' ? ctaLabel.trim() : undefined,
      cards: currentStatus === 'active' ? parseCards(cards) : undefined,
      filters: currentStatus === 'active' ? parseList(filters) : undefined,
    }

    return {
      section_id: sectionId.trim(),
      menu_label: menuLabel.trim(),
      route_path: routePath.trim(),
      layout: Object.fromEntries(
        Object.entries(baseLayout).filter(([, value]) => value !== undefined),
      ),
    }
  }

  const action = async (method: 'POST' | 'PUT' | 'DELETE', path: string) => {
    setLoading(true)
    setStatusMessage('')

    try {
      const payload = method === 'DELETE' ? undefined : buildPayload()
      const response = await fetch(`${API_BASE}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': ADMIN_TOKEN,
        },
        body: payload ? JSON.stringify(payload) : undefined,
      })

      const data = await parseResponse(response)
      if (!response.ok) {
        throw new Error(data?.detail || `Request failed with HTTP ${response.status}`)
      }

      setStatusMessage(`${method} request succeeded: ${JSON.stringify(data)}`)
    } catch (error) {
      setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Unexpected error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <section className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/40">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Admin Panel</p>
          <h1 className="text-3xl font-semibold text-white">Create, update, and delete content sections</h1>
          <p className="text-slate-300">Use this panel to manage course sections from the same admin API used by the backend docs.</p>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <form className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5" onSubmit={(event) => event.preventDefault()}>
            <label className="grid gap-1 text-sm text-slate-200">
              Section ID
              <input required maxLength={160} value={sectionId} onChange={(event) => setSectionId(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
            </label>

            <label className="grid gap-1 text-sm text-slate-200">
              Menu Label
              <input required maxLength={160} value={menuLabel} onChange={(event) => setMenuLabel(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
            </label>

            <label className="grid gap-1 text-sm text-slate-200">
              Route Path
              <input required maxLength={160} pattern="/.*" value={routePath} onChange={(event) => setRoutePath(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
            </label>

            <label className="grid gap-1 text-sm text-slate-200">
              Current Status
              <select value={currentStatus} onChange={(event) => setCurrentStatus(event.target.value as SectionStatus)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white">
                <option value="active">Active</option>
                <option value="empty">Empty</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </label>

            <label className="grid gap-1 text-sm text-slate-200">
              Title
              <input required maxLength={160} value={title} onChange={(event) => setTitle(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
            </label>

            {currentStatus === 'active' && (
              <>
                <label className="grid gap-1 text-sm text-slate-200">
                  Subtitle
                  <input value={subtitle} onChange={(event) => setSubtitle(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                </label>
                <label className="grid gap-1 text-sm text-slate-200">
                  Cards (JSON)
                  <textarea value={cards} onChange={(event) => setCards(event.target.value)} rows={5} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-sm text-white" />
                </label>
                <label className="grid gap-1 text-sm text-slate-200">
                  Filters (comma separated)
                  <input value={filters} onChange={(event) => setFilters(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                </label>
              </>
            )}

            {currentStatus === 'empty' && (
              <>
                <label className="grid gap-1 text-sm text-slate-200">
                  Message
                  <input value={message} onChange={(event) => setMessage(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                </label>
                <label className="grid gap-1 text-sm text-slate-200">
                  Guidance
                  <input value={guidance} onChange={(event) => setGuidance(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                </label>
              </>
            )}

            {currentStatus === 'coming_soon' && (
              <>
                <label className="grid gap-1 text-sm text-slate-200">
                  Main heading
                  <input value={heading} onChange={(event) => setHeading(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                </label>
                <label className="grid gap-1 text-sm text-slate-200">
                  Supporting text
                  <input value={subheading} onChange={(event) => setSubheading(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                </label>
                <label className="grid gap-1 text-sm text-slate-200">
                  Preview Items (comma separated)
                  <input value={previewItems} onChange={(event) => setPreviewItems(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                </label>
                <label className="grid gap-1 text-sm text-slate-200">
                  CTA label
                  <input value={ctaLabel} onChange={(event) => setCtaLabel(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                </label>
              </>
            )}
          </form>

          <aside className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-200">
            <div>
              <h2 className="text-xl font-semibold text-white">Admin actions</h2>
              <p className="mt-1 text-slate-300">Create a new section, update the selected content, or remove it entirely.</p>
            </div>

            <div className="grid gap-3">
              <button
                type="button"
                onClick={() => action('POST', '/sections')}
                disabled={loading}
                className="rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Working...' : 'Create section'}
              </button>
              <button
                type="button"
                onClick={() => action('PUT', `/sections/${sectionId}/layout`)}
                disabled={loading}
                className="rounded-xl bg-amber-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Working...' : 'Update section'}
              </button>
              <button
                type="button"
                onClick={() => action('DELETE', `/sections/${sectionId}`)}
                disabled={loading}
                className="rounded-xl bg-rose-500 px-4 py-3 font-semibold text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Working...' : 'Delete section'}
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 text-slate-200">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Response</p>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-100">{statusMessage || 'No action run yet.'}</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
