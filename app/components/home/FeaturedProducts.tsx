'use client';
import Link from 'next/link';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/app/components/product/ProductCard';

export default function FeaturedProducts() {
  const products = useProductStore((s) => s.products);
  const featured = products.slice(-4).reverse();

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-4xl font-semibold text-brand-ink">Nouveautés</h2>
        <Link href="/shop" className="text-sm font-ui text-brand-primary hover:text-brand-deep transition-colors">
          Tout voir →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
