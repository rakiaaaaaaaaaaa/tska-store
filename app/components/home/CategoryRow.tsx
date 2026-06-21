'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories } from '@/lib/data';

const categoryBgs = [
  'bg-brand-pale',
  'bg-brand-light/50',
  'bg-rose-50',
  'bg-pink-50',
  'bg-brand-pale',
];

export default function CategoryRow() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-4xl font-semibold text-brand-ink">Shop par Catégorie</h2>
        <Link href="/shop" className="text-sm font-ui text-brand-primary hover:text-brand-deep transition-colors">
          Tout voir →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="shrink-0"
          >
            <Link
              href={`/shop?category=${cat.slug}`}
              className={`
                group flex flex-col justify-between w-44 h-56 rounded-3xl p-5 cursor-pointer
                border border-brand-line hover:border-brand-primary transition-colors duration-300
                ${categoryBgs[i % categoryBgs.length]}
              `}
            >
              <span className="text-5xl">{cat.emoji}</span>
              <div className="flex items-end justify-between">
                <span className="font-ui font-semibold text-brand-ink text-sm">{cat.name}</span>
                <span className="w-7 h-7 rounded-full bg-white border border-brand-line group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white transition-all duration-300 flex items-center justify-center text-xs text-brand-muted">
                  →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
