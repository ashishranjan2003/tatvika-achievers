import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('Your message has been sent successfully!');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <main className="container mx-auto py-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <section className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Contact</p>
            <h1 className="mt-3 text-4xl font-bold text-[#0A192F]">Get in touch with Tatvika Achievers</h1>
            <p className="mt-4 text-slate-600">Have questions about courses, enrollment, or student support? Send us a message and our admissions team will respond within one business day.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {status && <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">{status}</div>}
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="form-input mt-1 w-full" placeholder="Enter your name" required />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input mt-1 w-full" placeholder="you@example.com" required />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Phone</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input mt-1 w-full" placeholder="Mobile number" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Message</span>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="form-input mt-1 w-full min-h-[140px]" placeholder="Tell us how we can help" required />
            </label>
            <button type="submit" className="btn btn-primary w-full">Send Message</button>
          </form>
        </section>

        <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0A192F]">Office Information</h2>
            <p className="text-slate-600">Visit our campus or drop us a message for admissions support, career counseling, or course guidance.</p>
          </div>

          <div className="space-y-4 rounded-2xl bg-amber-500/10 p-5">
            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="font-medium text-[#0A192F]">+91 98765 43210</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium text-[#0A192F]">hello@tatvikaachievers.com</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Address</p>
              <p className="font-medium text-[#0A192F]">123 Education Hub, New Delhi, India</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-slate-100">
            <div className="bg-amber-500/10 px-5 py-4">
              <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">Map</p>
            </div>
            <div className="flex h-72 items-center justify-center bg-white text-slate-500">
              Map placeholder
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Contact;
