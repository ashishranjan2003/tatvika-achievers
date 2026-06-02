import React, { useState, useMemo } from 'react';
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
        <h1 className="text-4xl font-bold">Free Resources</h1>
        <p className="text-gray-600">Download free notes, mindmaps and quick revision sheets curated by our experts.</p>
      </header>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto"> 
          {tags.map((t) => (
            <button key={t} className={`px-3 py-1 rounded-full ${t === tag ? 'bg-primary text-white' : 'bg-white/80 dark:bg-gray-800/60'}`} onClick={() => setTag(t)}>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <article key={r.id} className="p-4 bg-white/90 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-md">
              <h3 className="font-semibold mb-1">{r.title}</h3>
              <p className="text-sm text-gray-600 mb-3">Tags: {r.tags.join(', ')} • {r.size}</p>
              <div className="flex gap-2">
                <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-secondary">Preview</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-primary">Download</a>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && <p className="mt-6 text-gray-600">No resources match your filters.</p>}
      </section>
    </main>
  );
};

export default FreeResources;
