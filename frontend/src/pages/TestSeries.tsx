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
        <h1 className="text-4xl font-bold">Test Series</h1>
        <p className="text-gray-600">Take timed mock tests, view analytics, and improve with detailed feedback.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((t) => (
          <article key={t.id} className="card p-6 bg-white/95 dark:bg-gray-900/60 rounded-lg shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-xl mb-1">{t.title}</h3>
                <p className="text-sm text-gray-600">Subject: {t.subject}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{t.questions} Qs</p>
                <p className="text-sm text-gray-500">{t.duration} mins</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="p-4 bg-white/80 dark:bg-gray-800/50 rounded shadow-sm">
                  <p className="text-sm text-gray-600">Avg Score</p>
                  <p className="font-bold">72%</p>
                </div>
                <div className="p-4 bg-white/80 dark:bg-gray-800/50 rounded shadow-sm">
                  <p className="text-sm text-gray-600">Attempts</p>
                  <p className="font-bold">1.2K</p>
                </div>
              </div>

              <Link to={`/tests/${t.id}`} className="btn btn-primary">Start Test</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default TestSeries;
