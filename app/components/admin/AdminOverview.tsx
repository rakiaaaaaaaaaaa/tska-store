'use client';
import { useProductStore } from '@/store/useProductStore';

export default function AdminOverview() {
  const products = useProductStore((s) => s.products);
  const categories = useProductStore((s) => s.categories);
  const orders = useProductStore((s) => s.orders);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockCount = products.filter((p) => p.stock < 5).length;

  const stats = [
    { label: 'Total Produits', value: products.length, icon: '📦', color: 'bg-brand-pale border-brand-primary/20' },
    { label: 'Catégories', value: categories.length, icon: '🏷️', color: 'bg-rose-50 border-rose-200' },
    { label: 'Commandes', value: orders.length, icon: '🛒', color: 'bg-pink-50 border-pink-200' },
    { label: 'Revenu total', value: `$${totalRevenue.toFixed(0)}`, icon: '💰', color: 'bg-fuchsia-50 border-fuchsia-200' },
  ];

  const categoryCounts = categories.map((cat) => ({
    name: cat.name,
    emoji: cat.emoji,
    count: products.filter((p) => p.category === cat.slug).length,
  }));

  const maxCount = Math.max(...categoryCounts.map((c) => c.count), 1);

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`border rounded-2xl p-5 ${s.color}`}>
            <span className="text-3xl block mb-3">{s.icon}</span>
            <p className="font-display text-3xl font-semibold text-brand-ink">{s.value}</p>
            <p className="text-xs font-ui text-brand-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <p className="text-sm font-ui text-yellow-900">
            <span className="font-semibold">⚠️ {lowStockCount} produit(s)</span> ont moins de 5 unités en stock
          </p>
        </div>
      )}

      {/* Category bar chart */}
      <div className="bg-white border border-brand-line rounded-2xl p-6">
        <h3 className="font-ui font-semibold text-sm text-brand-muted uppercase tracking-wider mb-6">
          Produits par Catégorie
        </h3>
        <div className="space-y-4">
          {categoryCounts.map((c) => (
            <div key={c.name} className="flex items-center gap-4">
              <div className="w-24 text-sm font-ui flex items-center gap-1.5">
                <span>{c.emoji}</span>
                <span className="text-brand-muted">{c.name}</span>
              </div>
              <div className="flex-1 bg-brand-line rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all duration-700"
                  style={{ width: `${(c.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-sm font-ui font-semibold text-brand-ink w-4 text-right">{c.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
