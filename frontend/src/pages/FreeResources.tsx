import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import { PORTAL_SECTION_IDS, usePortalSection, type PortalCard } from '../lib/portalApi'

function ResourceCard({ card }: { card: PortalCard }) {
  const tags = card.tags || [card.subject]

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-amber-400/50">
      <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
        {tags[0]}
      </span>
      <h3 className="mt-3 text-xl font-bold text-[#0A192F]">{card.title}</h3>
      <p className="mb-3 mt-2 text-sm text-slate-600">
        {card.size || card.description || `Tags: ${tags.join(', ')}`}
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        {card.preview_url ? (
          <a
            href={card.preview_url}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-[#0A192F] transition-colors hover:bg-slate-50"
          >
            Preview
          </a>
        ) : (
          <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-[#0A192F] transition-colors hover:bg-slate-50" disabled type="button">
            Preview
          </button>
        )}
        {card.download_url ? (
          <a
            href={card.download_url}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-[#0A192F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Download
          </a>
        ) : (
          <button className="rounded-xl bg-[#0A192F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800" disabled type="button">
            Download
          </button>
        )}
      </div>
    </article>
  )
}

export default function FreeResources() {
  const sectionState = usePortalSection(PORTAL_SECTION_IDS.resources)
  const [tag, setTag] = useState('All')
  const [query, setQuery] = useState('')

  const activeLayout = sectionState.section?.layout.current_status === 'active' ? sectionState.section.layout : null
  const cards = activeLayout?.cards || []

  const tags = useMemo(() => {
    const values = cards.flatMap((card) => card.tags || [card.subject])
    return ['All', ...Array.from(new Set(values))]
  }, [cards])

  const filtered = useMemo(() => {
    return cards.filter((card) => {
      const cardTags = card.tags || [card.subject]
      if (tag !== 'All' && !cardTags.includes(tag)) return false
      if (
        query &&
        !`${card.title} ${card.subject} ${cardTags.join(' ')} ${card.description || ''}`.toLowerCase().includes(query.toLowerCase())
      ) {
        return false
      }
      return true
    })
  }, [cards, tag, query])

  const title = activeLayout?.title || sectionState.section?.menu_label || 'Free Resources'
  const subtitle =
    activeLayout?.subtitle ||
    (sectionState.notFound
      ? 'Publish the resources section from the admin panel to show live downloads.'
      : sectionState.error || 'Download free notes, mindmaps and quick revision sheets curated by our experts.')

  return (
    <main className="container mx-auto py-12">
      <header className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Resources</p>
        <h1 className="text-4xl font-bold text-[#0A192F]">{title}</h1>
        <p className="mt-2 max-w-2xl text-slate-600">{subtitle}</p>
      </header>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {tags.map((value) => (
            <button
              key={value}
              className={`rounded-full px-3 py-1 text-sm font-bold uppercase tracking-wider transition-colors ${
                value === tag
                  ? 'bg-amber-500/10 text-[#D4AF37]'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-[#0A192F]'
              }`}
              onClick={() => setTag(value)}
              type="button"
            >
              {value}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <label className="sr-only" htmlFor="resources-search">Search resources</label>
          <input id="resources-search" className="form-input" placeholder="Search resources" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Link to="/notes" className="btn btn-ghost">All Notes</Link>
        </div>
      </div>

      {sectionState.loading ? (
        <p className="text-slate-600">Loading live section content...</p>
      ) : sectionState.notFound ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">
          No free resources section is published yet. Create or update `resources-free` in the admin panel.
        </section>
      ) : (
        <section>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {filtered.map((card) => (
              <ResourceCard key={card.id} card={card} />
            ))}
          </div>

          {filtered.length === 0 && <p className="mt-6 text-slate-600">No resources match your filters.</p>}
        </section>
      )}
    </main>
  )
}
