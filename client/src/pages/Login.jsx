import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await api.login(email, password);
      login(token, user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="font-serif text-3xl text-bone mb-8">Log in</h1>

      <form onSubmit={handleSubmit} className="space-y-4 font-sans">
        <div>
          <label className="block text-xs text-bone/50 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-surface border border-hairline rounded-sm px-3 py-2 text-bone focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block text-xs text-bone/50 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-surface border border-hairline rounded-sm px-3 py-2 text-bone focus:outline-none focus:border-gold"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-ink font-medium py-2 rounded-sm hover:bg-bone transition-colors disabled:opacity-50"
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="font-sans text-sm text-bone/50 mt-6">
        No account yet?{' '}
        <Link to="/signup" className="text-gold hover:text-bone transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
}
