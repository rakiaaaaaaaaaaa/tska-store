'use client';
import { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { useToast } from '@/app/components/ui/Toast';
import Badge from '@/app/components/ui/Badge';

export default function AdminProductList() {
  const products = useProductStore((s) => s.products);
  const deleteProduct = useProductStore((s) => s.deleteProduct);
  const updateProduct = useProductStore((s) => s.updateProduct);
  const show = useToast((s) => s.show);
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher des produits…"
        className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-brand-line text-sm font-ui focus:outline-none focus:border-brand-primary"
      />

      <div className="bg-white border border-brand-line rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-brand-pale border-b border-brand-line">
            <tr>
              {['Produit', 'Catégorie', 'Prix', 'Badge', 'Stock', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-ui font-semibold uppercase tracking-wider text-brand-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-line">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-brand-pale/50 transition-colors">
                <td className="px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">{p.emoji}</span>
                  {editId === p.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border-b border-brand-primary text-sm font-ui focus:outline-none bg-transparent"
                      onBlur={() => { updateProduct(p.id, { name: editName }); setEditId(null); show('Produit mis à jour'); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { updateProduct(p.id, { name: editName }); setEditId(null); show('Produit mis à jour'); } }}
                      autoFocus
                    />
                  ) : (
                    <span className="font-ui font-medium text-brand-ink">{p.name}</span>
                  )}
                </td>
                <td className="px-4 py-3 capitalize">
                  <span className="text-brand-muted font-ui">{p.category}</span>
                </td>
                <td className="px-4 py-3 font-ui font-semibold text-brand-ink">${p.price}</td>
                <td className="px-4 py-3">
                  <Badge badge={p.badge} />
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-ui font-semibold px-2 py-1 rounded-full ${p.stock < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {p.stock} {p.stock < 5 && '⚠️'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditId(p.id); setEditName(p.name); }}
                      className="text-brand-muted hover:text-brand-primary transition-colors"
                      title="Modifier"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => { deleteProduct(p.id); show(`"${p.name}" supprimé`, 'error'); }}
                      className="text-brand-muted hover:text-red-500 transition-colors"
                      title="Supprimer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6m4-6v6"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-brand-muted font-ui text-sm">Aucun produit ne correspond à ta recherche</div>
        )}
      </div>
    </div>
  );
}
