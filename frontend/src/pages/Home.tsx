import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <section className="hero grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-extrabold text-primary-navy mb-4">
            Empowering Students for Academic Excellence
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Expert coaching for Accounts, Business Studies, and Economics — focused
            on clarity, practice, and results.
          </p>
          <div className="flex gap-4" role="group" aria-label="Primary calls to action">
            <Link to="/courses" className="btn btn-primary btn-lg" aria-label="Enroll now">Enroll Now</Link>
            <Link to="/courses" className="btn btn-ghost" aria-label="Explore courses">Explore Courses</Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4" aria-hidden>
            <div className="p-4 bg-white/80 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-md">
              <p className="text-2xl font-bold">50K+</p>
              <p className="text-sm text-gray-500">Students Enrolled</p>
            </div>
            <div className="p-4 bg-white/80 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-md">
              <p className="text-2xl font-bold">95%</p>
              <p className="text-sm text-gray-500">Success Rate</p>
            </div>
            <div className="p-4 bg-white/80 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-md">
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm text-gray-500">Courses Available</p>
            </div>
            <div className="p-4 bg-white/80 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-md">
              <p className="text-2xl font-bold">10+</p>
              <p className="text-sm text-gray-500">Years Experience</p>
            </div>
          </div>
        </div>

        <div className="illustration">
          <div className="w-full h-80 bg-gradient-to-br from-primary-navy-50 to-primary-navy-100 rounded-lg flex items-center justify-center shadow-xl">
            <svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="240" height="160" rx="12" fill="url(#g)" />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#eef2ff" />
                  <stop offset="100%" stopColor="#dde7ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            'Expert Faculty',
            'Comprehensive Notes',
            'Regular Test Series',
            'Recorded Classes',
            'Doubt Support',
            'Affordable Learning',
          ].map((f) => (
            <article key={f} className="p-6 bg-white/90 dark:bg-gray-800/60 backdrop-blur rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">{f}</h4>
              <p className="text-sm text-gray-600">High-quality content and support for every student.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Accounts', 'Business Studies', 'Economics'].map((c) => (
            <div key={c} className="card p-6 bg-white/95 dark:bg-gray-900/60 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-2">{c}</h3>
              <p className="text-sm text-gray-600 mb-4">In-depth syllabus, expert guidance, and practice tests.</p>
              <Link to={`/courses`} className="btn btn-primary" aria-label={`View ${c} course`}>View Course</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <blockquote key={i} className="p-6 bg-white/90 dark:bg-gray-800/60 rounded-lg shadow-md">
              <p className="text-sm text-gray-700 mb-4">“This institute transformed my scores and confidence.”</p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <p className="font-semibold">Student {i}</p>
                  <p className="text-xs text-gray-500">Placed in top universities</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mt-12 text-center py-12 bg-gradient-to-r from-primary-navy to-primary-navy-700 text-white rounded-lg">
        <h3 className="text-2xl font-bold mb-3">Start Your Learning Journey Today</h3>
        <Link to="/signup" className="btn btn-primary btn-lg" aria-label="Get started">Get Started</Link>
      </section>
    </div>
  );
};

export default Home;
