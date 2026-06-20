/**
 * Tatvika Achievers - Layout Component Examples
 * Real-world usage scenarios
 */

import React from 'react';
import Layout from './Layout';

/**
 * EXAMPLE 1: Simple Hero Page (Current Setup)
 */
export function HomePageExample() {
  return (
    <Layout>
      <main className="container mx-auto">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <h1 className="text-5xl font-extrabold text-primary-navy mb-4">
            Welcome to Tatvika Achievers
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your premium platform for academic excellence
          </p>
          <button className="btn btn-primary btn-lg">
            Start Learning Today
          </button>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-primary-navy mb-12 text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Comprehensive Courses', 'Expert Notes', 'Test Series'].map((feature) => (
              <div key={feature} className="card p-6 text-center">
                <h3 className="text-2xl font-bold text-primary-navy mb-2">{feature}</h3>
                <p className="text-gray-600">Premium quality content designed by experts</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

/**
 * EXAMPLE 2: Courses Page with Grid
 */
export function CoursesPageExample() {
  const courses = [
    { id: 1, title: 'Mathematics', level: 'Advanced', students: 1250 },
    { id: 2, title: 'Physics', level: 'Intermediate', students: 890 },
    { id: 3, title: 'Chemistry', level: 'Advanced', students: 756 },
    { id: 4, title: 'Biology', level: 'Beginner', students: 543 },
  ];

  return (
    <Layout>
      <main className="container mx-auto py-12">
        <h1 className="text-5xl font-bold text-primary-navy mb-8">
          Our Courses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-navy mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Level: <span className="badge badge-gold">{course.level}</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {course.students} students enrolled
                </p>
                <button className="btn btn-primary w-full">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}

/**
 * EXAMPLE 3: Notes/Materials Listing Page
 */
export function NotesPageExample() {
  const materials = [
    { id: 1, title: 'Chapter 1: Fundamentals', type: 'PDF', size: '2.5 MB' },
    { id: 2, title: 'Chapter 2: Advanced Topics', type: 'PDF', size: '3.1 MB' },
    { id: 3, title: 'Summary Notes', type: 'PDF', size: '1.2 MB' },
  ];

  return (
    <Layout>
      <main className="container mx-auto py-12">
        <h1 className="text-5xl font-bold text-primary-navy mb-8">
          Study Materials
        </h1>

        <div className="space-y-4">
          {materials.map((material) => (
            <div
              key={material.id}
              className="card p-6 flex items-center justify-between hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-primary-navy">
                  {material.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {material.type} • {material.size}
                </p>
              </div>
              <button className="btn btn-secondary">Download</button>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}

/**
 * EXAMPLE 4: Test Series Page with Filters
 */
export function TestSeriesPageExample() {
  const [difficulty, setDifficulty] = React.useState<'all' | 'beginner' | 'advanced'>('all');

  const tests = [
    { id: 1, title: 'Mock Test 1', difficulty: 'beginner', questions: 50, time: 60 },
    { id: 2, title: 'Mock Test 2', difficulty: 'advanced', questions: 100, time: 120 },
    { id: 3, title: 'Chapter Quiz', difficulty: 'beginner', questions: 20, time: 30 },
  ];

  const filtered = difficulty === 'all' 
    ? tests 
    : tests.filter(t => t.difficulty === difficulty);

  return (
    <Layout>
      <main className="container mx-auto py-12">
        <h1 className="text-5xl font-bold text-primary-navy mb-8">
          Test Series
        </h1>

        {/* Filters */}
        <div className="mb-8 flex gap-4">
          {['all', 'beginner', 'advanced'].map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level as 'all' | 'beginner' | 'advanced')}
              className={`btn ${
                difficulty === level
                  ? 'btn-primary'
                  : 'btn-ghost'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((test) => (
            <div key={test.id} className="card p-6">
              <h3 className="text-xl font-bold text-primary-navy mb-4">
                {test.title}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Questions:</span> {test.questions}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Duration:</span> {test.time} minutes
                </p>
                <p className="text-sm">
                  <span className="badge badge-primary">{test.difficulty}</span>
                </p>
              </div>
              <button className="btn btn-primary w-full">
                Start Test
              </button>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}

/**
 * EXAMPLE 5: About Page with Content
 */
export function AboutPageExample() {
  return (
    <Layout>
      <main className="container mx-auto py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-primary-navy mb-4">
            About Tatvika Achievers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering students with premium educational content since 2020
          </p>
        </section>

        {/* Content Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-primary-navy mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe that quality education should be accessible to every student.
              Our mission is to provide world-class study materials and resources.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary-navy mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To become the most trusted platform for academic excellence,
              helping students achieve their dreams and reach their full potential.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 rounded-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-primary-navy mb-8 text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '50K+', label: 'Students' },
              { number: '500+', label: 'Courses' },
              { number: '10K+', label: 'Tests' },
              { number: '95%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-primary-navy mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-primary-navy mb-4">
            Join Thousands of Successful Students
          </h2>
          <button className="btn btn-primary btn-lg">
            Get Started Today
          </button>
        </section>
      </main>
    </Layout>
  );
}

/**
 * EXAMPLE 6: Contact Page with Form
 */
export function ContactPageExample() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <Layout>
      <main className="container mx-auto py-12">
        <h1 className="text-5xl font-bold text-primary-navy mb-12 text-center">
          Get In Touch
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  className="form-textarea"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card p-6">
              <h3 className="text-xl font-bold text-primary-navy mb-2">Email</h3>
              <a
                href="mailto:support@tatvikaachievers.com"
                className="text-gold-premium hover:underline"
              >
                support@tatvikaachievers.com
              </a>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold text-primary-navy mb-2">Phone</h3>
              <a
                href="tel:+919876543210"
                className="text-gold-premium hover:underline"
              >
                +919310999571
              </a>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold text-primary-navy mb-2">Address</h3>
              <p className="text-gray-600">
                123 Education Hub<br />
                New Delhi, India 110001
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold text-primary-navy mb-4">Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

/**
 * EXAMPLE 7: Dashboard Page (For Logged-In Users)
 */
export function DashboardPageExample() {
  return (
    <Layout>
      <main className="container mx-auto py-12">
        {/* Welcome Section */}
        <section className="mb-12">
          <h1 className="text-5xl font-bold text-primary-navy mb-2">
            Welcome Back, Student!
          </h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Courses Enrolled', value: '12' },
            { label: 'Tests Completed', value: '24' },
            { label: 'Study Hours', value: '156' },
            { label: 'Your Score', value: '92%' },
          ].map((stat) => (
            <div key={stat.label} className="card p-6 text-center">
              <p className="text-4xl font-bold text-gold-premium mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-3xl font-bold text-primary-navy mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {['Completed Physics Mock Test', 'Started Chemistry Chapter 5', 'Uploaded Notes'].map(
              (activity) => (
                <div key={activity} className="card p-4 flex items-center gap-4">
                  <div className="w-2 h-2 bg-gold-premium rounded-full"></div>
                  <p className="text-gray-700">{activity}</p>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default {
  HomePageExample,
  CoursesPageExample,
  NotesPageExample,
  TestSeriesPageExample,
  AboutPageExample,
  ContactPageExample,
  DashboardPageExample,
};
