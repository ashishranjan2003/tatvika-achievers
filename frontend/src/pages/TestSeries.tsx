import React from 'react';
import { Link } from 'react-router-dom';

const TestSeries: React.FC = () => {
  const tests = [
    { id: 'mock-1', title: 'Mock Test 1', subject: 'Accounts', questions: 50, duration: 60 },
    { id: 'mock-2', title: 'Mock Test 2', subject: 'Economics', questions: 40, duration: 45 },
  ];

  return (
    <main className="container mx-auto py-12">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-[#0A192F]">Test Series</h1>
        <p className="text-slate-600">Take timed mock tests, view analytics, and improve with detailed feedback.</p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {tests.map((t) => (
          <article key={t.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-amber-400/50">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="mb-1 text-xl font-bold text-[#0A192F]">{t.title}</h3>
                <p className="text-sm text-slate-600">Subject: {t.subject}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">{t.questions} Qs</p>
                <p className="text-sm text-slate-500">{t.duration} mins</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-600">Avg Score</p>
                  <p className="font-bold text-[#0A192F]">72%</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-600">Attempts</p>
                  <p className="font-bold text-[#0A192F]">1.2K</p>
                </div>
              </div>

              <Link to={`/tests/${t.id}`} className="rounded-xl bg-[#0A192F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800">Start Test</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default TestSeries;
