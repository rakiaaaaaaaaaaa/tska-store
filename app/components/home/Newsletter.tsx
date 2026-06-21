'use client';
import { useState } from 'react';
import { useToast } from '@/app/components/ui/Toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const show = useToast((s) => s.show);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    show("Vous êtes sur la liste ! 🎉");
    setEmail('');
  };

  return (
    <section className="bg-brand-ink py-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-brand-primary text-xs font-ui font-semibold tracking-widest uppercase mb-3">
          Offres exclusives
        </p>
        <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
          Accédez en avant-première aux nouveautés
        </h2>
        <p className="text-white/50 font-ui text-sm mb-8">
          Rejoignez le cercle TSKA et soyez les premiers informés.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-ui text-sm focus:outline-none focus:border-brand-primary focus:bg-white/15 transition-all"
          />
          <button type="submit" className="btn-primary whitespace-nowrap">
            S’abonner
          </button>
        </form>

        <p className="text-white/30 text-xs font-ui mt-4">Pas de spam. Désinscription à tout moment.</p>
      </div>
    </section>
  );
}
