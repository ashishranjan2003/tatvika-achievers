import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import { PORTAL_SECTION_IDS, usePortalSection, type PortalCard } from '../lib/portalApi'

function CourseCard({ card }: { card: PortalCard }) {
  const href = card.action_url || `/purchase?item=${encodeURIComponent(card.id)}`
  const actionLabel = card.action_label || 'View'

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-amber-400/50">
      <div className="mb-4 flex h-36 items-center justify-center rounded-xl bg-amber-500/10 text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
        {card.class_section || 'Course'}
      </div>
      <h3 className="mb-2 text-xl font-bold text-[#0A192F]">{card.title}</h3>
      <p className="mb-4 text-sm text-slate-600">
        {card.description || 'Short description of the course covering syllabus highlights.'}
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {card.class_section && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {card.class_section}
          </span>
        )}
        {card.subject && (
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-[#D4AF37]">
            {card.subject}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{card.duration ? `${card.duration} mins` : '3 months'}</p>
          <p className="text-lg font-bold text-[#0A192F]">{card.price || '₹1,999'}</p>
          {card.actual_price && (
            <p className="text-sm text-slate-500 line-through">{card.actual_price}</p>
          )}
        </div>
        <Link
          to={href}
          className="rounded-xl bg-[#0A192F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          aria-label={`${actionLabel} ${card.title}`}
        >
          {actionLabel}
        </Link>
      </div>
    </article>
  )
}

export default function Courses() {
  const sectionState = usePortalSection(PORTAL_SECTION_IDS.courses)
  const [subject, setSubject] = useState('All Subjects')
  const [priceFilter, setPriceFilter] = useState('All Prices')
  const [query, setQuery] = useState('')

  const activeLayout = sectionState.section?.layout.current_status === 'active' ? sectionState.section.layout : null
  const cards = activeLayout?.cards || []

  const subjectOptions = useMemo(() => {
    const labels = cards.map((card) => card.subject).filter(Boolean)
    return ['All Subjects', ...Array.from(new Set(labels))]
  }, [cards])

  const filtered = useMemo(() => {
    return cards.filter((card) => {
      if (subject !== 'All Subjects' && card.subject !== subject) return false
      if (priceFilter === 'Free' && card.price && !card.price.startsWith('₹0')) return false
      if (priceFilter === 'Paid' && (!card.price || card.price.startsWith('₹0'))) return false
      if (query && !`${card.title} ${card.subject} ${card.description || ''}`.toLowerCase().includes(query.toLowerCase())) {
        return false
      }
      return true
    })
  }, [cards, subject, priceFilter, query])

  const title = activeLayout?.title || sectionState.section?.menu_label || 'Courses'
  const subtitle =
    activeLayout?.subtitle ||
    (sectionState.notFound
      ? 'Publish the lectures section from the admin panel to show live content.'
      : sectionState.error || 'Browse the live lectures catalog.')

  return (
    <main className="container mx-auto py-12">
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Lectures</p>
          <h1 className="text-4xl font-bold text-[#0A192F]">{title}</h1>
          <p className="mt-2 max-w-2xl text-slate-600">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="course-search">Search courses</label>
          <input id="course-search" className="form-input" placeholder="Search courses" value={query} onChange={(e) => setQuery(e.target.value)} />

          <select className="form-input" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjectOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          <select className="form-input" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option>All Prices</option>
            <option>Free</option>
            <option>Paid</option>
          </select>
        </div>
      </header>

      {sectionState.loading ? (
        <p className="text-slate-600">Loading live section content...</p>
      ) : sectionState.notFound ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">
          No lectures section is published yet. Create or update `lectures-academic` in the admin panel.
        </section>
      ) : (
        <section>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {filtered.map((card) => (
              <CourseCard key={card.id} card={card} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="mt-6 text-slate-600">No courses found for the selected filters.</p>
          )}
        </section>
      )}
    </main>
  )
}
