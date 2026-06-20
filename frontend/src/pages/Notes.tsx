import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import { PORTAL_SECTION_IDS, usePortalSection, type PortalCard } from '../lib/portalApi'

function ResourceAction({
  href,
  label,
  kind,
}: {
  href?: string | null
  label: string
  kind: 'preview' | 'download'
}) {
  const baseClass =
    kind === 'preview'
      ? 'rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-[#0A192F] transition-colors hover:bg-slate-50'
      : 'rounded-xl bg-[#0A192F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800'

  if (href) {
    return (
      <a
        className={baseClass}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
      >
        {label}
      </a>
    )
  }

  return (
    <button className={baseClass} disabled type="button" aria-label={label}>
      {label}
    </button>
  )
}

function NoteCard({ card }: { card: PortalCard }) {
  const tags = card.tags || [card.subject]

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-amber-400/50">
      <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
        {card.subject}
      </span>
      <h3 className="mb-1 mt-3 text-xl font-bold text-[#0A192F]">{card.title}</h3>
      <p className="mb-3 text-sm text-slate-600">{card.size || card.description || 'Downloadable study material'}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <ResourceAction href={card.preview_url} kind="preview" label="Preview" />
        <ResourceAction href={card.download_url} kind="download" label="Download" />
      </div>
    </article>
  )
}

export default function Notes() {
  const sectionState = usePortalSection(PORTAL_SECTION_IDS.notes)
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState('All Subjects')

  const activeLayout = sectionState.section?.layout.current_status === 'active' ? sectionState.section.layout : null
  const cards = activeLayout?.cards || []

  const subjectOptions = useMemo(() => {
    const labels = cards.map((card) => card.subject).filter(Boolean)
    return ['All Subjects', ...Array.from(new Set(labels))]
  }, [cards])

  const filtered = useMemo(() => {
    return cards.filter((card) => {
      if (subject !== 'All Subjects' && card.subject !== subject) return false
      if (
        query &&
        !`${card.title} ${card.subject} ${(card.tags || []).join(' ')} ${card.description || ''}`.toLowerCase().includes(query.toLowerCase())
      ) {
        return false
      }
      return true
    })
  }, [cards, subject, query])

  const title = activeLayout?.title || sectionState.section?.menu_label || 'Notes & Resources'
  const subtitle =
    activeLayout?.subtitle ||
    (sectionState.notFound
      ? 'Publish the books section from the admin panel to show live notes.'
      : sectionState.error || 'Download chapter notes, summaries and quick revision sheets for all subjects.')

  return (
    <main className="container mx-auto py-12">
      <header className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Book</p>
        <h1 className="text-4xl font-bold text-[#0A192F]">{title}</h1>
        <p className="mt-2 max-w-2xl text-slate-600">{subtitle}</p>
      </header>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <label className="sr-only" htmlFor="notes-search">Search notes</label>
          <input id="notes-search" className="form-input w-full" placeholder="Search notes, chapters, topics..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="flex gap-3">
          <select className="form-input" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjectOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <Link to="/resources" className="btn btn-ghost">Browse All Resources</Link>
        </div>
      </div>

      {sectionState.loading ? (
        <p className="text-slate-600">Loading live section content...</p>
      ) : sectionState.notFound ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">
          No notes section is published yet. Create or update `books-academic` in the admin panel.
        </section>
      ) : (
        <section aria-live="polite">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {filtered.map((card) => (
              <NoteCard key={card.id} card={card} />
            ))}
          </div>
          {filtered.length === 0 && <p className="mt-6 text-slate-600">No notes found for your search.</p>}
        </section>
      )}
    </main>
  )
}
