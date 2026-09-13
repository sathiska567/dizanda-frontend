import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import SocialAuthButtons from './SocialAuthButtons';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
    }, {
      data: { full_name: name },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Account created. Check your email to confirm and then log in.');
      setName('');
      setEmail('');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream px-6 py-20">
      <div className="w-full max-w-md bg-white/95 border border-luxury-sand shadow-lg rounded-3xl p-10">
        <h1 className="text-3xl font-serif tracking-extreme uppercase text-luxury-charcoal mb-4">
          Create your account
        </h1>
        <p className="text-sm text-luxury-muted mb-8">
          Join Dizanda and start saving your favorites, checking out faster, and managing orders.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-[11px] uppercase tracking-[0.35em] text-luxury-champagne">
            Full Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-luxury-sand bg-luxury-cream/80 px-4 py-3 text-sm text-luxury-charcoal focus:outline-none focus:ring-2 focus:ring-luxury-champagne"
            />
          </label>

          <label className="block text-[11px] uppercase tracking-[0.35em] text-luxury-champagne">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-luxury-sand bg-luxury-cream/80 px-4 py-3 text-sm text-luxury-charcoal focus:outline-none focus:ring-2 focus:ring-luxury-champagne"
            />
          </label>

          <label className="block text-[11px] uppercase tracking-[0.35em] text-luxury-champagne">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-2 w-full rounded-3xl border border-luxury-sand bg-luxury-cream/80 px-4 py-3 text-sm text-luxury-charcoal focus:outline-none focus:ring-2 focus:ring-luxury-champagne"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-luxury-charcoal text-luxury-cream py-3 text-sm uppercase tracking-[0.35em] transition hover:bg-luxury-onyx disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {message && (
          <div className="mt-6 rounded-3xl border border-luxury-sand bg-luxury-cream/90 px-5 py-4 text-sm text-luxury-charcoal">
            {message}
          </div>
        )}

        <div className="my-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-luxury-sand" />
          <span className="text-[11px] uppercase tracking-[0.35em] text-luxury-muted">Or</span>
          <span className="h-px flex-1 bg-luxury-sand" />
        </div>

        <SocialAuthButtons onError={setMessage} />

        <p className="mt-8 text-center text-sm text-luxury-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-luxury-champagne hover:text-luxury-charcoal">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
