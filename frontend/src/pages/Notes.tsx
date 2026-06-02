import React, { useState, useMemo } from 'react';
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
        <h1 className="text-4xl font-bold mb-2">Notes & Resources</h1>
        <p className="text-gray-600">Download chapter notes, summaries and quick revision sheets for all subjects.</p>
      </header>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((n) => (
            <article key={n.id} className="p-4 bg-white/90 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-md">
              <h3 className="font-semibold mb-1">{n.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{n.subject} • {n.size}</p>
              <div className="flex gap-2">
                <button className="btn btn-secondary" aria-label={`Preview ${n.title}`}>Preview</button>
                <a className="btn btn-primary" href="#" onClick={(e) => e.preventDefault()} aria-label={`Download ${n.title}`}>Download</a>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <p className="mt-6 text-gray-600">No resources found for your search.</p>}
      </section>
    </main>
  );
};

export default Notes;
