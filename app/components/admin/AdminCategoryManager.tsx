'use client';
import { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { useToast } from '@/app/components/ui/Toast';

export default function AdminCategoryManager() {
  const categories = useProductStore((s) => s.categories);
  const addCategory = useProductStore((s) => s.addCategory);
  const removeCategory = useProductStore((s) => s.removeCategory);
  const show = useToast((s) => s.show);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🏷️');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addCategory({ id: Date.now().toString(), name, emoji, slug: name.toLowerCase().replace(/\s+/g, '-') });
    show(`Catégorie "${name}" ajoutée`);
    setName('');
    setEmoji('🏷️');
  };

  return (
    <div className="space-y-6 max-w-xl">
      <form onSubmit={handleAdd} className="bg-white border border-brand-line rounded-2xl p-6 flex gap-3">
        <input
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="w-14 text-center border border-brand-line rounded-xl px-2 py-2.5 text-xl focus:outline-none focus:border-brand-primary"
          placeholder="🏷️"
          maxLength={2}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-brand-line rounded-xl px-4 py-2.5 text-sm font-ui focus:outline-none focus:border-brand-primary"
          placeholder="Nom de la catégorie"
          required
        />
        <button type="submit" className="btn-primary">Ajouter</button>
      </form>

      <div className="bg-white border border-brand-line rounded-2xl overflow-hidden">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-4 px-5 py-4 border-b border-brand-line last:border-0 hover:bg-brand-pale/50"
          >
            {/* Drag handle (visual only) */}
            <div className="flex flex-col gap-0.5 cursor-grab text-brand-muted opacity-40">
              {[0, 1, 2].map((n) => (
                <div key={n} className="w-3.5 h-0.5 bg-current rounded-full" />
              ))}
            </div>

            <span className="text-2xl">{cat.emoji}</span>
            <span className="flex-1 font-ui font-medium text-brand-ink">{cat.name}</span>
            <span className="text-xs font-ui text-brand-muted bg-brand-pale px-2 py-1 rounded-full">{cat.slug}</span>

            <button
              onClick={() => { removeCategory(cat.id); show(`Catégorie "${cat.name}" supprimée`, 'error'); }}
              className="text-brand-muted hover:text-red-500 transition-colors ml-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
