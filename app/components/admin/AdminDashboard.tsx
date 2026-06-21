'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AdminOverview from './AdminOverview';
import AdminAddForm from './AdminAddForm';
import AdminProductList from './AdminProductList';
import AdminCategoryManager from './AdminCategoryManager';
import AdminOrderList from './AdminOrderList';
import { useProductStore } from '@/store/useProductStore';
import { useToast } from '@/app/components/ui/Toast';

type Tab = 'overview' | 'add' | 'products' | 'categories' | 'orders';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Aperçu', icon: '📊' },
  { id: 'add', label: 'Ajouter', icon: '➕' },
  { id: 'products', label: 'Produits', icon: '📦' },
  { id: 'orders', label: 'Commandes', icon: '🛒' },
  { id: 'categories', label: 'Catégories', icon: '🏷️' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const store = useProductStore();
  const show = useToast((s) => s.show);

  const handleExport = () => {
    const data = {
      products: store.products,
      categories: store.categories,
      orders: store.orders,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tska-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    show('Données exportées avec succès', 'success');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.products && data.categories) {
          show('Données importées avec succès', 'success');
          window.location.reload();
        }
      } catch {
        show('Erreur lors de l\'import du fichier', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-brand-pale/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-brand-primary text-xs font-ui font-semibold tracking-widest uppercase mb-1">Admin</p>
            <h1 className="font-display text-4xl font-semibold text-brand-ink">Dashboard</h1>
          </div>
          <Link href="/shop" className="text-sm font-ui text-brand-muted hover:text-brand-ink transition-colors flex items-center gap-1">
            ← Retour à la boutique
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-brand-line rounded-2xl p-1.5 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-ui font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-brand-muted hover:text-brand-ink hover:bg-brand-pale'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Data Actions */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={handleExport}
            className="text-sm font-ui font-semibold text-brand-primary hover:text-brand-deep transition-colors px-4 py-2 rounded-lg border border-brand-primary hover:bg-brand-pale"
          >
            📥 Exporter données
          </button>
          <label className="text-sm font-ui font-semibold text-brand-primary hover:text-brand-deep transition-colors px-4 py-2 rounded-lg border border-brand-primary hover:bg-brand-pale cursor-pointer">
            📤 Importer données
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <AdminOverview />}
            {activeTab === 'add' && <AdminAddForm />}
            {activeTab === 'products' && <AdminProductList />}
            {activeTab === 'orders' && <AdminOrderList />}
            {activeTab === 'categories' && <AdminCategoryManager />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
