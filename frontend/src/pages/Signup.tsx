import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill all fields.');
      return;
    }
    // TODO: integrate signup
    navigate('/dashboard');
  };

  return (
    <main className="container mx-auto py-12 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Create Student Account</h1>
      <form onSubmit={submit} className="p-6 bg-white/95 dark:bg-gray-900/60 rounded-lg shadow-md">
        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

        <label className="block mb-2">
          <span className="text-sm">Full name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="form-input mt-1 w-full" placeholder="Your name" required />
        </label>

        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input mt-1 w-full" placeholder="you@example.com" required />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input mt-1 w-full" placeholder="Create a password" required />
        </label>

        <div className="flex items-center justify-between">
          <button type="submit" className="btn btn-primary">Create account</button>
          <Link to="/login" className="text-sm text-primary">Already have an account?</Link>
        </div>
      </form>
    </main>
  );
};

export default Signup;
