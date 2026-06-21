'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import Badge from '@/app/components/ui/Badge';
import { useCartStore } from '@/store/useCartStore';
import { useProductStore } from '@/store/useProductStore';
import { useToast } from '@/app/components/ui/Toast';

const tileBgs = [
  'bg-brand-pale', 'bg-brand-light/40', 'bg-rose-50',
  'bg-pink-50', 'bg-brand-pale', 'bg-fuchsia-50',
];

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useProductStore((s) => s.toggleWishlist);
  const isWishlisted = useProductStore((s) => s.isWishlisted(product.id));
  const show = useToast((s) => s.show);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    show(`${product.name} ajouté au panier`);
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    show(isWishlisted ? 'Retiré des favoris' : `${product.name} ajouté aux favoris`, 'info');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image area */}
        <div className={`relative h-48 rounded-2xl ${tileBgs[index % tileBgs.length]} flex items-center justify-center overflow-hidden mb-3 border border-brand-line`}>
          <span className="text-6xl transition-transform duration-300 group-hover:scale-110">{product.emoji}</span>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 right-3">
              <Badge badge={product.badge} />
            </div>
          )}

          {/* Wishlist button on hover */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            onClick={handleWishlist}
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-colors"
            aria-label="Wishlist"
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill={isWishlisted ? '#E8215A' : 'none'}
              stroke={isWishlisted ? '#E8215A' : 'currentColor'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </motion.button>
        </div>

        {/* Info */}
        <div className="px-1">
          <p className="text-brand-primary text-[11px] font-ui font-semibold uppercase tracking-widest mb-1 capitalize">
            {product.category}
          </p>
          <p className="font-display text-[15px] text-brand-ink font-medium leading-snug mb-2">
            {product.name}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-ui font-semibold text-brand-ink">${product.price}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-8 h-8 rounded-full bg-brand-ink text-white flex items-center justify-center hover:bg-brand-primary transition-colors duration-200"
              aria-label="Add to cart"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
