import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const FreeResources: React.FC = () => {
  const [tag, setTag] = useState('All');
  const [query, setQuery] = useState('');

  const resources = useMemo(
    () => [
      { id: 'res-1', title: 'Revision Notes - Accounts', tags: ['accounts', 'revision'], size: '120KB' },
      { id: 'res-2', title: 'Quick Formulas - Economics', tags: ['economics', 'formulas'], size: '80KB' },
      { id: 'res-3', title: 'Mindmap - Business Studies', tags: ['business', 'mindmap'], size: '200KB' },
    ],
    []
  );

  const tags = useMemo(() => ['All', 'accounts', 'business', 'economics', 'revision', 'formulas', 'mindmap'], []);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (tag !== 'All' && !r.tags.includes(tag)) return false;
      if (query && !`${r.title} ${r.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [resources, tag, query]);

  return (
    <main className="container mx-auto py-12">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-[#0A192F]">Free Resources</h1>
        <p className="text-slate-600">Download free notes, mindmaps and quick revision sheets curated by our experts.</p>
      </header>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {tags.map((t) => (
            <button
              key={t}
              className={`rounded-full px-3 py-1 text-sm font-bold uppercase tracking-wider transition-colors ${
                t === tag
                  ? 'bg-amber-500/10 text-[#D4AF37]'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-[#0A192F]'
              }`}
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <label className="sr-only" htmlFor="resources-search">Search resources</label>
          <input id="resources-search" className="form-input" placeholder="Search resources" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Link to="/notes" className="btn btn-ghost">All Notes</Link>
        </div>
      </div>

      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filtered.map((r) => (
            <article key={r.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-amber-400/50">
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">{r.tags[0]}</span>
              <h3 className="mt-3 text-xl font-bold text-[#0A192F]">{r.title}</h3>
              <p className="mb-3 mt-2 text-sm text-slate-600">Tags: {r.tags.join(', ')} - {r.size}</p>
              <div className="flex gap-2">
                <a href="#" onClick={(e) => e.preventDefault()} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-[#0A192F] transition-colors hover:bg-slate-50">Preview</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="rounded-xl bg-[#0A192F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800">Download</a>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && <p className="mt-6 text-slate-600">No resources match your filters.</p>}
      </section>
    </main>
  );
};

export default FreeResources;
