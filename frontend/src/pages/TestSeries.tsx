import { useMemo, useState } from 'react'

import { PORTAL_SECTION_IDS, usePortalSection, type PortalCard } from '../lib/portalApi'

function TestCard({ card }: { card: PortalCard }) {
  const href = card.action_url || ''
  const ctaLabel = card.action_label || 'Start Test'

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-amber-400/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="mb-1 text-xl font-bold text-[#0A192F]">{card.title}</h3>
          <p className="text-sm text-slate-600">Subject: {card.subject}</p>
          {card.description && <p className="mt-2 text-sm text-slate-600">{card.description}</p>}
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">{card.questions ?? 0} Qs</p>
          <p className="text-sm text-slate-500">{card.duration ? `${card.duration} mins` : 'Timed'}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-600">Questions</p>
            <p className="font-bold text-[#0A192F]">{card.questions ?? '—'}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-600">Duration</p>
            <p className="font-bold text-[#0A192F]">{card.duration ? `${card.duration} mins` : '—'}</p>
          </div>
        </div>

        {href ? (
          <a
            href={href}
            className="rounded-xl bg-[#0A192F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            {ctaLabel}
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="rounded-xl bg-slate-300 px-4 py-2 text-sm font-semibold text-slate-600"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </article>
  )
}

export default function TestSeries() {
  const sectionState = usePortalSection(PORTAL_SECTION_IDS.tests)
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
      return true
    })
  }, [cards, subject])

  const title = activeLayout?.title || sectionState.section?.menu_label || 'Test Series'
  const subtitle =
    activeLayout?.subtitle ||
    (sectionState.notFound
      ? 'Publish the test series section from the admin panel to show live mocks.'
      : sectionState.error || 'Take timed mock tests, view analytics, and improve with detailed feedback.')

  return (
    <main className="container mx-auto py-12">
      <header className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Tests</p>
        <h1 className="text-4xl font-bold text-[#0A192F]">{title}</h1>
        <p className="mt-2 max-w-2xl text-slate-600">{subtitle}</p>
      </header>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <select className="form-input" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjectOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {sectionState.loading ? (
        <p className="text-slate-600">Loading live section content...</p>
      ) : sectionState.notFound ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">
          No test series section is published yet. Create or update `tests-academic` in the admin panel.
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((card) => (
            <TestCard key={card.id} card={card} />
          ))}
          {filtered.length === 0 && <p className="text-slate-600">No tests found for the selected filters.</p>}
        </section>
      )}
    </main>
  )
}
