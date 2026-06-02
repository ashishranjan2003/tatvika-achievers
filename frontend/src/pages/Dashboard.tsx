import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <main className="container mx-auto py-12">
      <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
        <aside className="space-y-6 p-6 bg-white/90 dark:bg-gray-900/70 rounded-xl shadow-lg">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Student Area</p>
            <h2 className="text-2xl font-bold mt-2">Welcome back, Student</h2>
            <p className="text-gray-600 mt-2">Your learning console is ready with performance insights and quick actions.</p>
          </div>

          <nav className="space-y-3">
            {[
              { label: 'Overview', href: '/dashboard' },
              { label: 'Courses', href: '/courses' },
              { label: 'Tests', href: '/tests' },
              { label: 'Notes', href: '/notes' },
              { label: 'Resources', href: '/resources' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold">Learning streak</h3>
            <div className="rounded-xl bg-primary/10 p-4">
              <p className="text-3xl font-bold">18</p>
              <p className="text-sm text-gray-600">Days active</p>
            </div>
          </section>
        </aside>

        <section className="space-y-8">
          <header className="rounded-xl bg-white/95 dark:bg-gray-900/70 p-6 shadow-lg">
            <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-primary">Dashboard</p>
                <h1 className="text-3xl font-bold">Learning Progress</h1>
              </div>
              <Link to="/purchase" className="btn btn-primary">Upgrade Plan</Link>
            </div>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Enrolled Courses', value: '12' },
              { label: 'Tests Completed', value: '24' },
              { label: 'Study Hours', value: '156' },
              { label: 'Average Score', value: '92%' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-white/95 dark:bg-gray-900/70 p-6 shadow-md">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-semibold mt-3">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr,0.6fr]">
            <article className="rounded-3xl bg-white/95 dark:bg-gray-900/70 p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary">Recent activity</p>
                  <h2 className="text-2xl font-bold">Latest performance</h2>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Stable</span>
              </div>
              <ul className="space-y-4">
                {[
                  { title: 'Completed Accounts mock test', detail: 'Score 95% • 12 Apr' },
                  { title: 'Downloaded Economics revision notes', detail: 'Revision pack • 10 Apr' },
                  { title: 'Joined Business Studies live doubt session', detail: 'Live support • 8 Apr' },
                ].map((item) => (
                  <li key={item.title} className="rounded-3xl border border-gray-200/70 dark:border-gray-700/80 p-4">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </article>

            <aside className="space-y-6">
              <div className="rounded-3xl bg-white/95 dark:bg-gray-900/70 p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Upcoming Tests</h2>
                <ul className="space-y-4">
                  {[
                    { subject: 'Economics', date: '12 Apr', time: '10:00 AM' },
                    { subject: 'Accounts', date: '15 Apr', time: '02:00 PM' },
                  ].map((test) => (
                    <div key={test.subject} className="rounded-3xl bg-gray-50 dark:bg-gray-800 p-4">
                      <p className="font-semibold">{test.subject}</p>
                      <p className="text-sm text-gray-500">{test.date} • {test.time}</p>
                    </div>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-white/95 dark:bg-gray-900/70 p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex flex-col gap-3">
                  <Link to="/courses" className="btn btn-ghost">Browse Courses</Link>
                  <Link to="/tests" className="btn btn-ghost">Start a Test</Link>
                  <Link to="/notes" className="btn btn-ghost">Review Notes</Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
