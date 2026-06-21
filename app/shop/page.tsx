'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useProductStore } from '@/store/useProductStore';
import FilterSidebar from '@/app/components/product/FilterSidebar';
import ProductGrid from '@/app/components/product/ProductGrid';

function ShopContent() {
  const searchParams = useSearchParams();
  const { setCategory, setSortBy, sortBy, filteredProducts, selectedCategory } = useProductStore();

  useEffect(() => {
    const category = searchParams.get('category');
    setCategory(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const count = filteredProducts().length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Page heading */}
      <div className="mb-8">
        <p className="text-brand-primary text-xs font-ui font-semibold tracking-widest uppercase mb-2">
          {selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'Tous les produits'}
        </p>
        <h1 className="font-display text-5xl font-semibold text-brand-ink">Boutique</h1>
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 py-3 border-y border-brand-line">
        <p className="text-sm font-ui text-brand-muted">
          <span className="font-semibold text-brand-ink">{count}</span> produits
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as Parameters<typeof setSortBy>[0])}
          className="text-sm font-ui border border-brand-line rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-brand-primary cursor-pointer"
        >
          <option value="featured">En vedette</option>
          <option value="price-asc">Prix : Bas → Haut</option>
          <option value="price-desc">Prix : Haut → Bas</option>
          <option value="newest">Les plus récents</option>
        </select>
      </div>

      {/* Layout */}
      <div className="flex gap-8">
        <FilterSidebar />
        <ProductGrid />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-brand-muted font-ui">Chargement…</div>}>
      <ShopContent />
    </Suspense>
  );
}
