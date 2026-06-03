import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const Notes: React.FC = () => {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('All Subjects');

  const notes = useMemo(
    () => [
      { id: 1, title: 'Accounts Chapter 1', subject: 'Accounts', size: '120KB' },
      { id: 2, title: 'Business Studies Summary', subject: 'Business Studies', size: '250KB' },
      { id: 3, title: 'Economics Key Concepts', subject: 'Economics', size: '180KB' },
    ],
    []
  );

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      if (subject !== 'All Subjects' && n.subject !== subject) return false;
      if (query && !`${n.title} ${n.subject}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [notes, subject, query]);

  return (
    <main className="container mx-auto py-12">
      <header className="mb-6">
        <h1 className="mb-2 text-4xl font-bold text-[#0A192F]">Notes & Resources</h1>
        <p className="text-slate-600">Download chapter notes, summaries and quick revision sheets for all subjects.</p>
      </header>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <label className="sr-only" htmlFor="notes-search">Search notes</label>
          <input id="notes-search" className="form-input w-full" placeholder="Search notes, chapters, topics..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="flex gap-3">
          <select className="form-input" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option>All Subjects</option>
            <option>Accounts</option>
            <option>Business Studies</option>
            <option>Economics</option>
          </select>
          <Link to="/resources" className="btn btn-ghost">Browse All Resources</Link>
        </div>
      </div>

      <section aria-live="polite">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filtered.map((n) => (
            <article key={n.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-amber-400/50">
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">{n.subject}</span>
              <h3 className="mb-1 mt-3 text-xl font-bold text-[#0A192F]">{n.title}</h3>
              <p className="mb-3 text-sm text-slate-600">{n.size}</p>
              <div className="flex gap-2">
                <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-[#0A192F] transition-colors hover:bg-slate-50" aria-label={`Preview ${n.title}`}>Preview</button>
                <a className="rounded-xl bg-[#0A192F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800" href="#" onClick={(e) => e.preventDefault()} aria-label={`Download ${n.title}`}>Download</a>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <p className="mt-6 text-slate-600">No resources found for your search.</p>}
      </section>
    </main>
  );
};

export default Notes;
