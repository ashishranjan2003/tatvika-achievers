import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <main className="container mx-auto py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">About Tatvika Achievers</h1>
        <p className="text-gray-600 max-w-2xl">We blend expert teaching, carefully designed study materials, and continuous assessment to help students achieve their academic goals.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <article className="p-6 bg-white/90 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-700">To provide accessible, high-quality coaching that empowers students to achieve academic success through clarity, practice and mentorship.</p>
        </article>

        <aside className="p-6 bg-white/90 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Why Choose Us</h3>
          <ul className="space-y-2 text-gray-700">
            <li>Experienced faculty with proven results</li>
            <li>Comprehensive notes and bite-sized videos</li>
            <li>Regular test series, analytics & feedback</li>
            <li>Dedicated doubt resolution and mentorship</li>
          </ul>
        </aside>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
        <ol className="space-y-4">
          <li className="p-4 bg-white/90 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-sm">
            <strong>2016</strong> — Founded with a focus on quality coaching for commerce students.
          </li>
          <li className="p-4 bg-white/90 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-sm">
            <strong>2019</strong> — Launched full test-series and analytics dashboard.
          </li>
          <li className="p-4 bg-white/90 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-sm">
            <strong>2023</strong> — Reached 50k+ students and expanded online programs.
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Meet The Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: 'Amit Sharma', role: 'Founder & Head Faculty' },
            { name: 'Neha Gupta', role: 'Curriculum Lead' },
            { name: 'Rohan Mehta', role: 'Assessment & Analytics' },
          ].map((m) => (
            <div key={m.name} className="p-6 bg-white/90 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-md">
              <div className="w-16 h-16 rounded-full bg-gray-200 mb-4" />
              <h4 className="font-semibold">{m.name}</h4>
              <p className="text-sm text-gray-600">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-8 bg-gradient-to-r from-primary-navy to-primary-navy-700 text-white rounded-lg">
        <h3 className="text-2xl font-bold mb-3">Ready to join thousands of achievers?</h3>
        <Link to="/signup" className="btn btn-primary" aria-label="Sign up now">Sign Up Now</Link>
      </section>
    </main>
  );
};

export default About;
