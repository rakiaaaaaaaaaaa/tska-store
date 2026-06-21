'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Category, Product, Order } from '@/types';
import { categories as seedCategories, products as seedProducts, sampleOrders } from '@/lib/data';

interface ProductStore {
  products: Product[];
  categories: Category[];
  orders: Order[];
  wishlist: string[];
  searchQuery: string;
  selectedCategory: string | null;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  badgeFilter: string | null;
  hydrated: boolean;

  hydrate: () => Promise<void>;

  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  addCategory: (category: Category) => void;
  removeCategory: (id: string) => void;

  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;

  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  setSearchQuery: (q: string) => void;
  setCategory: (cat: string | null) => void;
  setSortBy: (sort: ProductStore['sortBy']) => void;
  setBadgeFilter: (badge: string | null) => void;

  filteredProducts: () => Product[];
}

// Persists the product/category/order catalog to a JSON file on the server
// (see app/api/store/route.ts and lib/store-db.ts) so it's shared across
// every visitor instead of living only in one browser's localStorage.
function syncToServer(state: Pick<ProductStore, 'products' | 'categories' | 'orders'>) {
  fetch('/api/store', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      products: state.products,
      categories: state.categories,
      orders: state.orders,
    }),
  }).catch(() => {});
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: seedProducts,
      categories: seedCategories,
      orders: sampleOrders,
      wishlist: [],
      searchQuery: '',
      selectedCategory: null,
      sortBy: 'featured',
      badgeFilter: null,
      hydrated: false,

      hydrate: async () => {
        const res = await fetch('/api/store');
        const data = await res.json();
        set({ products: data.products, categories: data.categories, orders: data.orders, hydrated: true });
      },

      addProduct: (product) => {
        set((s) => ({ products: [...s.products, product] }));
        syncToServer(get());
      },

      updateProduct: (id, updates) => {
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
        syncToServer(get());
      },

      deleteProduct: (id) => {
        set((s) => ({ products: s.products.filter((p) => p.id !== id) }));
        syncToServer(get());
      },

      addCategory: (category) => {
        set((s) => ({ categories: [...s.categories, category] }));
        syncToServer(get());
      },

      removeCategory: (id) => {
        set((s) => ({ categories: s.categories.filter((c) => c.id !== id) }));
        syncToServer(get());
      },

      addOrder: (order) => {
        set((s) => ({ orders: [...s.orders, order] }));
        syncToServer(get());
      },

      updateOrderStatus: (id, status) => {
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        }));
        syncToServer(get());
      },

      deleteOrder: (id) => {
        set((s) => ({ orders: s.orders.filter((o) => o.id !== id) }));
        syncToServer(get());
      },

      toggleWishlist: (productId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(productId)
            ? s.wishlist.filter((id) => id !== productId)
            : [...s.wishlist, productId],
        })),

      isWishlisted: (productId) => get().wishlist.includes(productId),

      setSearchQuery: (q) => set({ searchQuery: q }),
      setCategory: (cat) => set({ selectedCategory: cat }),
      setSortBy: (sort) => set({ sortBy: sort }),
      setBadgeFilter: (badge) => set({ badgeFilter: badge }),

      filteredProducts: () => {
        const { products, searchQuery, selectedCategory, sortBy, badgeFilter } = get();
        let result = [...products];

        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          result = result.filter(
            (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
          );
        }

        if (selectedCategory) {
          result = result.filter((p) => p.category === selectedCategory);
        }

        if (badgeFilter) {
          result = result.filter((p) => p.badge === badgeFilter);
        }

        switch (sortBy) {
          case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
          case 'newest':
            result.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0));
            break;
          default:
            break;
        }

        return result;
      },
    }),
    { name: 'tska-wishlist', skipHydration: true, partialize: (s) => ({ wishlist: s.wishlist }) }
  )
);
