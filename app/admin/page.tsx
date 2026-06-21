'use client';
import { useState } from 'react';
import AdminDashboard from '@/app/components/admin/AdminDashboard';

const ADMIN_PASSWORD = 'tska2026';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (authenticated) return <AdminDashboard />;

  return (
    <div className="min-h-screen bg-brand-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-ui font-bold text-3xl tracking-widest text-white uppercase">TSKA</p>
          <p className="font-ui font-light text-brand-primary text-sm mt-1">Portail Admin</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl p-8 space-y-4"
        >
          <h2 className="font-display text-2xl font-semibold text-brand-ink mb-6">Connexion</h2>

          <div>
            <label className="block text-xs font-ui font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className={`w-full px-4 py-3 rounded-xl border font-ui text-sm focus:outline-none transition-colors ${
                error ? 'border-red-400 bg-red-50' : 'border-brand-line focus:border-brand-primary'
              }`}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs font-ui mt-1">Mot de passe incorrect</p>
            )}
          </div>

          <button type="submit" className="btn-primary w-full py-3">
            Accéder au tableau de bord
          </button>
        </form>
      </div>
    </div>
  );
}
