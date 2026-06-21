'use client';
import { useProductStore } from '@/store/useProductStore';
import { categories } from '@/lib/data';

export default function FilterSidebar() {
  const { selectedCategory, setCategory, badgeFilter, setBadgeFilter } = useProductStore();

  return (
    <aside className="w-56 shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-ui font-semibold text-xs tracking-widest uppercase text-brand-muted mb-3">
            Catégories
          </h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setCategory(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-ui transition-colors ${
                  !selectedCategory
                    ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                    : 'text-brand-muted hover:text-brand-ink hover:bg-brand-pale'
                }`}
              >
                Tous les Produits
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setCategory(cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-ui transition-colors flex items-center gap-2 ${
                    selectedCategory === cat.slug
                      ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                      : 'text-brand-muted hover:text-brand-ink hover:bg-brand-pale'
                  }`}
                >
                  <span>{cat.emoji}</span> {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Badge filter */}
        <div>
          <h3 className="font-ui font-semibold text-xs tracking-widest uppercase text-brand-muted mb-3">
            Filtrer par
          </h3>
          <ul className="space-y-1">
            {[null, 'NEW', 'HOT', 'SALE'].map((badge) => (
              <li key={badge ?? 'all'}>
                <button
                  onClick={() => setBadgeFilter(badge)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-ui transition-colors ${
                    badgeFilter === badge
                      ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                      : 'text-brand-muted hover:text-brand-ink hover:bg-brand-pale'
                  }`}
                >
                  {badge ?? 'Tous'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
