'use client';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const filteredProducts = useProductStore((s) => s.filteredProducts);
  useProductStore((s) => s.products);
  useProductStore((s) => s.searchQuery);
  useProductStore((s) => s.selectedCategory);
  useProductStore((s) => s.sortBy);
  useProductStore((s) => s.badgeFilter);
  const products = filteredProducts();

  if (products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
        <span className="text-5xl mb-4">🔍</span>
        <h3 className="font-display text-2xl text-brand-muted mb-2">Aucun produit trouvé</h3>
        <p className="text-sm text-brand-muted font-ui">Essaie de modifier tes filtres ou ta recherche</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
