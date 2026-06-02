import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    // TODO: integrate auth
    navigate('/dashboard');
  };

  return (
    <main className="container mx-auto py-12 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Student Portal Login</h1>
      <form onSubmit={submit} className="p-6 bg-white/95 dark:bg-gray-900/60 rounded-lg shadow-md">
        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input mt-1 w-full" placeholder="you@example.com" required />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input mt-1 w-full" placeholder="••••••••" required />
        </label>

        <div className="flex items-center justify-between">
          <button type="submit" className="btn btn-primary">Login</button>
          <Link to="/signup" className="text-sm text-primary">Create account</Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
