'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const showcaseTiles = [
  { emoji: '🧢', bg: 'bg-brand-primary/20', label: 'Casquettes' },
  { emoji: '🩱', bg: 'bg-brand-light/60', label: 'Robes' },
  { emoji: '👗', bg: 'bg-brand-primary/10', label: 'Vêtements' },
];

export default function Hero() {
  return (
    <section className="relative bg-brand-ink overflow-hidden min-h-[85vh] flex items-center">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Subtle rose glow */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 right-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-brand-primary text-sm font-ui font-semibold tracking-widest uppercase mb-6"
            >
              Nouvelle collection 2026
            </motion.p>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.95] text-white mb-6">
              <span className="block">Portez l’</span>
              <em className="block text-brand-primary not-italic">inattendu</em>
            </h1>

            <p className="text-white/60 font-ui text-base sm:text-lg leading-relaxed max-w-md mb-8">
              Casquettes, robes, vêtements & plus — sélectionnés pour ceux qui se démarquent.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/shop" className="btn-primary">
                Acheter maintenant
              </Link>
              <Link href="/shop" className="btn-ghost">
                Voir le lookbook
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-white/10">
              {[['12+', 'Produits'], ['5', 'Catégories'], ['Offert', 'Retours']].map(([val, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl text-white">{val}</p>
                  <p className="text-xs text-white/40 font-ui uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Asymmetric product grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4 h-[480px]"
          >
            {/* Tall left tile */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`${showcaseTiles[0].bg} rounded-3xl flex flex-col items-center justify-center row-span-2 cursor-pointer border border-white/10`}
            >
              <span className="text-8xl mb-4">{showcaseTiles[0].emoji}</span>
              <span className="font-ui text-white/70 text-sm uppercase tracking-widest">{showcaseTiles[0].label}</span>
            </motion.div>

            {/* Two smaller right tiles */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className={`${showcaseTiles[1].bg} rounded-3xl flex flex-col items-center justify-center cursor-pointer border border-white/10`}
            >
              <span className="text-5xl mb-2">{showcaseTiles[1].emoji}</span>
              <span className="font-ui text-white/70 text-xs uppercase tracking-widest">{showcaseTiles[1].label}</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className={`${showcaseTiles[2].bg} rounded-3xl flex flex-col items-center justify-center cursor-pointer border border-white/10`}
            >
              <span className="text-5xl mb-2">{showcaseTiles[2].emoji}</span>
              <span className="font-ui text-white/70 text-xs uppercase tracking-widest">{showcaseTiles[2].label}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
