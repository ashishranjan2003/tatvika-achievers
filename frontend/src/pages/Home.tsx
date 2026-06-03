import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-black leading-tight tracking-normal text-[#0A192F] md:text-5xl">
            Empowering Students for <br />
            <span className="bg-gradient-to-r from-[#0A192F] to-amber-600 bg-clip-text text-transparent">
              Academic Excellence
            </span>
          </h2>
          <p className="max-w-2xl text-lg font-normal leading-relaxed text-slate-600">
            Expert coaching for Accounts, Business Studies, and Economics - focused
            on clarity, practice, and results.
          </p>
        </div>

        <div className="flex flex-wrap gap-4" role="group" aria-label="Primary calls to action">
          <Link
            to="/courses"
            className="rounded-xl bg-[#0A192F] px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
            aria-label="Enroll now"
          >
            Enroll Now
          </Link>
          <Link
            to="/courses"
            className="rounded-xl border-2 border-slate-200 bg-white px-8 py-3.5 font-bold text-[#0A192F] transition-all duration-200 hover:bg-slate-50"
            aria-label="Explore courses"
          >
            Explore Courses
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2" aria-hidden>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="text-3xl font-black text-[#0A192F]">50K+</div>
            <div className="mt-1 text-sm font-semibold text-slate-500">Students Enrolled</div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="text-3xl font-black text-[#0A192F]">95%</div>
            <div className="mt-1 text-sm font-semibold text-slate-500">Success Rate</div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 text-3xl font-bold tracking-normal text-slate-950">Features</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            'Expert Faculty',
            'Comprehensive Notes',
            'Regular Test Series',
            'Recorded Classes',
            'Doubt Support',
            'Affordable Learning',
          ].map((feature) => (
            <article key={feature} className="rounded-lg border border-slate-200 bg-white p-6 shadow-md">
              <h4 className="mb-2 font-semibold text-slate-950">{feature}</h4>
              <p className="text-sm text-slate-600">High-quality content and support for every student.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 text-3xl font-bold tracking-normal text-slate-950">Popular Courses</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {['Accounts', 'Business Studies', 'Economics'].map((course) => (
            <div key={course} className="rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-xl font-semibold text-slate-950">{course}</h3>
              <p className="mb-4 text-sm text-slate-600">In-depth syllabus, expert guidance, and practice tests.</p>
              <Link
                to="/courses"
                className="inline-flex rounded-lg bg-[#0A192F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-navy-700"
                aria-label={`View ${course} course`}
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 text-3xl font-bold tracking-normal text-slate-950">Testimonials</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((student) => (
            <blockquote key={student} className="rounded-lg border border-slate-200 bg-white p-6 shadow-md">
              <p className="mb-4 text-sm text-slate-700">This institute transformed my scores and confidence.</p>
              <footer className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div>
                  <p className="font-semibold text-slate-950">Student {student}</p>
                  <p className="text-xs text-slate-500">Placed in top universities</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg bg-[#0A192F] py-12 text-center text-white">
        <h3 className="mb-3 text-2xl font-bold tracking-normal">Start Your Learning Journey Today</h3>
        <Link
          to="/signup"
          className="inline-flex rounded-lg bg-gold-premium px-6 py-3 text-base font-semibold text-[#0A192F] transition-colors hover:bg-gold-light"
          aria-label="Get started"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;
