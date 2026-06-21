'use client';
import { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { useToast } from '@/app/components/ui/Toast';
import { Product, Badge } from '@/types';

export default function AdminAddForm() {
  const categories = useProductStore((s) => s.categories);
  const addProduct = useProductStore((s) => s.addProduct);
  const show = useToast((s) => s.show);

  const [form, setForm] = useState({
    name: '', category: 'clothing', price: '',
    description: '', emoji: '📦', badge: '' as string,
    inStock: true, stock: '10',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    const product: Product = {
      id: `p${Date.now()}`,
      name: form.name,
      category: form.category,
      price: parseFloat(form.price),
      description: form.description,
      emoji: form.emoji || '📦',
      badge: (form.badge as Badge) || null as Badge,
      inStock: form.inStock,
      stock: parseInt(form.stock, 10) || 0,
    };
    addProduct(product);
    show(`"${product.name}" ajouté!`);
    setForm({ name: '', category: 'clothing', price: '', description: '', emoji: '📦', badge: '', inStock: true, stock: '10' });
  };

  const field = 'w-full px-4 py-2.5 rounded-xl border border-brand-line text-sm font-ui focus:outline-none focus:border-brand-primary transition-colors';

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 bg-white border border-brand-line rounded-2xl p-6">
      <h3 className="font-ui font-semibold text-sm uppercase tracking-wider text-brand-muted mb-2">Nouveau Produit</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-ui font-semibold uppercase tracking-wider text-brand-muted mb-1.5">Nom *</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Nom du produit" required />
        </div>

        <div>
          <label className="block text-xs font-ui font-semibold uppercase tracking-wider text-brand-muted mb-1.5">Catégorie</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={field}>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-ui font-semibold uppercase tracking-wider text-brand-muted mb-1.5">Prix *</label>
          <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={field} placeholder="0.00" min="0" step="0.01" required />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-ui font-semibold uppercase tracking-wider text-brand-muted mb-1.5">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${field} resize-none`} rows={3} placeholder="Description du produit…" />
        </div>

        <div>
          <label className="block text-xs font-ui font-semibold uppercase tracking-wider text-brand-muted mb-1.5">Emoji / URL Image</label>
          <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} className={field} placeholder="📦" />
        </div>

        <div>
          <label className="block text-xs font-ui font-semibold uppercase tracking-wider text-brand-muted mb-1.5">Badge</label>
          <select value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className={field}>
            <option value="">Aucun</option>
            <option value="NEW">NEW</option>
            <option value="HOT">HOT</option>
            <option value="SALE">SALE</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-ui font-semibold uppercase tracking-wider text-brand-muted mb-1.5">Quantité en stock</label>
          <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className={field} placeholder="10" min="0" step="1" />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setForm({ ...form, inStock: !form.inStock })}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${form.inStock ? 'bg-brand-primary' : 'bg-brand-line'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${form.inStock ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
          <span className="text-sm font-ui text-brand-muted">En Stock</span>
        </div>
      </div>

      <button type="submit" className="btn-primary w-full py-3">
        Ajouter Produit
      </button>
    </form>
  );
}
