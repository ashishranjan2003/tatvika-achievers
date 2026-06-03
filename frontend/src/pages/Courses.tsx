import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const CourseCard: React.FC<{ id: string; title: string; price?: string; duration?: string }> = ({ id, title, price, duration }) => (
  <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-amber-400/50">
    <div className="mb-4 flex h-36 items-center justify-center rounded-xl bg-amber-500/10 text-sm font-bold uppercase tracking-wider text-[#D4AF37]">Course</div>
    <h3 className="mb-2 text-xl font-bold text-[#0A192F]">{title}</h3>
    <p className="mb-4 text-sm text-slate-600">Short description of the course covering syllabus highlights.</p>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{duration || '3 months'}</p>
        <p className="text-lg font-bold text-[#0A192F]">{price || '₹1,999'}</p>
      </div>
      <Link to={`/courses/${id}`} className="rounded-xl bg-[#0A192F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800" aria-label={`View ${title}`}>View</Link>
    </div>
  </article>
);

const Courses: React.FC = () => {
  const [subject, setSubject] = useState('All Subjects');
  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [query, setQuery] = useState('');

  const courses = useMemo(
    () => [
      { id: 'accounts-foundation', title: 'Accounts - Foundation', price: '₹1,499', subject: 'Accounts' },
      { id: 'business-advanced', title: 'Business Studies - Advanced', price: '₹2,499', subject: 'Business Studies' },
      { id: 'econ-crash', title: 'Economics - Crash Course', price: '₹1,299', subject: 'Economics' },
    ],
    []
  );

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (subject !== 'All Subjects' && c.subject !== subject) return false;
      if (priceFilter === 'Free' && c.price && !c.price.startsWith('₹0')) return false;
      if (priceFilter === 'Paid' && (!c.price || c.price.startsWith('₹0'))) return false;
      if (query && !c.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [courses, subject, priceFilter, query]);

  return (
    <main className="container mx-auto py-12">
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-bold text-[#0A192F]">Courses</h1>

        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="course-search">Search courses</label>
          <input id="course-search" className="form-input" placeholder="Search courses" value={query} onChange={(e) => setQuery(e.target.value)} />

          <select className="form-input" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option>All Subjects</option>
            <option>Accounts</option>
            <option>Business Studies</option>
            <option>Economics</option>
          </select>

          <select className="form-input" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option>All Prices</option>
            <option>Free</option>
            <option>Paid</option>
          </select>
        </div>
      </header>

      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filtered.map((c) => (
            <CourseCard key={c.id} id={c.id} title={c.title} price={c.price} />
          ))}
        </div>
        {filtered.length === 0 && <p className="mt-6 text-slate-600">No courses found for the selected filters.</p>}
      </section>
    </main>
  );
};

export default Courses;
