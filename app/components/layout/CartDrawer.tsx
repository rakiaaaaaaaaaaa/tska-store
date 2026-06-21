'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/app/components/ui/Toast';
import Link from 'next/link';

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal } = useCartStore();
  const show = useToast((s) => s.show);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-[90] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-brand-surface z-[100] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-line">
              <h2 className="font-display text-2xl font-semibold">Ton Panier</h2>
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-pale transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-16">
                  <span className="text-5xl">🛍️</span>
                  <p className="font-display text-xl text-brand-muted">Ton panier est vide, yalla !</p>
                  <button
                    onClick={closeCart}
                    className="btn-primary text-sm"
                  >
                    Commencer les achats
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex gap-4 p-3 rounded-xl bg-white border border-brand-line"
                  >
                    {/* Emoji image */}
                    <div className="w-16 h-16 rounded-lg bg-brand-pale flex items-center justify-center text-2xl shrink-0">
                      {item.product.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-ui font-medium text-sm text-brand-ink truncate">{item.product.name}</p>
                      {item.size && <p className="text-xs text-brand-muted mt-0.5">Taille : {item.size}</p>}
                      <p className="text-brand-primary font-semibold text-sm mt-1">${item.product.price}</p>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-brand-line flex items-center justify-center text-xs hover:border-brand-primary transition-colors"
                        >−</button>
                        <span className="text-sm font-ui w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-brand-line flex items-center justify-center text-xs hover:border-brand-primary transition-colors"
                        >+</button>
                        <button
                          onClick={() => { removeItem(item.product.id); show('Article retiré du panier', 'info'); }}
                          className="ml-auto text-brand-muted hover:text-brand-primary transition-colors"
                          aria-label="Remove"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6m4-6v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-brand-line space-y-3">
                <div className="flex justify-between text-sm font-ui">
                  <span className="text-brand-muted">Sous-total</span>
                  <span className="font-semibold text-brand-ink">${subtotal().toFixed(2)}</span>
                </div>
                <p className="text-xs text-brand-muted">Livraison calculée à la caisse</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center btn-primary py-3 rounded-full font-semibold"
                >
                  Commander
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-brand-muted hover:text-brand-ink transition-colors"
                >
                  Continuer les achats
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
