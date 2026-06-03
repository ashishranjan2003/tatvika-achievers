import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <main className="container mx-auto py-12">
      <header className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-[#0A192F]">About Tatvika Achievers</h1>
        <p className="max-w-2xl text-slate-600">We blend expert teaching, carefully designed study materials, and continuous assessment to help students achieve their academic goals.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold text-[#0A192F]">Our Mission</h2>
          <p className="text-slate-700">To provide accessible, high-quality coaching that empowers students to achieve academic success through clarity, practice and mentorship.</p>
        </article>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-semibold text-[#0A192F]">Why Choose Us</h3>
          <ul className="space-y-2 text-slate-700">
            <li>Experienced faculty with proven results</li>
            <li>Comprehensive notes and bite-sized videos</li>
            <li>Regular test series, analytics & feedback</li>
            <li>Dedicated doubt resolution and mentorship</li>
          </ul>
        </aside>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-[#0A192F]">Our Journey</h2>
        <ol className="space-y-4">
          <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <strong>2016</strong> — Founded with a focus on quality coaching for commerce students.
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <strong>2019</strong> — Launched full test-series and analytics dashboard.
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <strong>2023</strong> — Reached 50k+ students and expanded online programs.
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-[#0A192F]">Meet The Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: 'Amit Sharma', role: 'Founder & Head Faculty' },
            { name: 'Neha Gupta', role: 'Curriculum Lead' },
            { name: 'Rohan Mehta', role: 'Assessment & Analytics' },
          ].map((m) => (
            <div key={m.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 h-16 w-16 rounded-full bg-amber-500/10" />
              <h4 className="font-semibold text-[#0A192F]">{m.name}</h4>
              <p className="text-sm text-slate-600">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-[#0A192F] py-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-3">Ready to join thousands of achievers?</h3>
        <Link to="/signup" className="btn btn-primary" aria-label="Sign up now">Sign Up Now</Link>
      </section>
    </main>
  );
};

export default About;
