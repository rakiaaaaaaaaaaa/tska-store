'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import Badge from '@/app/components/ui/Badge';
import { useCartStore } from '@/store/useCartStore';
import { useProductStore } from '@/store/useProductStore';
import { useToast } from '@/app/components/ui/Toast';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const tabs = ['Description', 'Détails', 'Avis'] as const;

const tileBgs = ['bg-brand-pale', 'bg-brand-light/50', 'bg-rose-50', 'bg-pink-50'];

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Description');

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useProductStore((s) => s.toggleWishlist);
  const isWishlisted = useProductStore((s) => s.isWishlisted(product.id));
  const show = useToast((s) => s.show);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product, selectedSize ?? undefined);
    show(`${product.name} ajouté au panier`);
    openCart();
  };

  const bgClass = tileBgs[parseInt(product.id.replace('p', '')) % tileBgs.length];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs font-ui text-brand-muted mb-8 flex items-center gap-2">
        <a href="/" className="hover:text-brand-ink">Accueil</a>
        <span>/</span>
        <a href="/shop" className="hover:text-brand-ink">Boutique</a>
        <span>/</span>
        <a href={`/shop?category=${product.category}`} className="capitalize hover:text-brand-ink">{product.category}</a>
        <span>/</span>
        <span className="text-brand-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`${bgClass} rounded-3xl aspect-square flex items-center justify-center border border-brand-line mb-4`}>
            <span className="text-[120px]">{product.emoji}</span>
          </div>
          {/* Thumbnail strip */}
          <div className="flex gap-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`w-20 h-20 rounded-xl ${bgClass} flex items-center justify-center border-2 border-brand-line hover:border-brand-primary transition-colors cursor-pointer`}>
                <span className="text-3xl">{product.emoji}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <p className="text-brand-primary text-xs font-ui font-semibold uppercase tracking-widest mb-2 capitalize">
            {product.category}
          </p>

          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-brand-ink leading-tight">
              {product.name}
            </h1>
            {product.badge && <Badge badge={product.badge} />}
          </div>

          <p className="font-display text-3xl text-brand-ink mb-4">${product.price}</p>

          <p className="text-brand-muted font-ui text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Size selector */}
          <div className="mb-6">
            <p className="text-xs font-ui font-semibold uppercase tracking-wider text-brand-muted mb-3">
              Taille
            </p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-11 h-11 rounded-xl text-sm font-ui font-medium border transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-brand-ink text-white border-brand-ink'
                      : 'border-brand-line text-brand-muted hover:border-brand-primary hover:text-brand-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-xs font-ui font-semibold uppercase tracking-wider text-brand-muted mb-3">Qté</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-brand-line flex items-center justify-center hover:border-brand-primary transition-colors"
              >
                −
              </button>
              <span className="w-8 text-center font-ui font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border border-brand-line flex items-center justify-center hover:border-brand-primary transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary py-3 text-sm"
            >
              Ajouter au Panier
            </button>
            <button
              onClick={() => { toggleWishlist(product.id); show(isWishlisted ? 'Retiré des favoris' : 'Ajouté aux favoris', 'info'); }}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                isWishlisted ? 'bg-brand-primary border-brand-primary text-white' : 'border-brand-line hover:border-brand-primary'
              }`}
              aria-label="Wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-brand-line">
            {[['🚚', 'Retours gratuits'], ['🔒', 'Paiement sécurisé'], ['⭐', 'Avis 5 étoiles']].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-1.5 text-xs font-ui text-brand-muted">
                <span>{icon}</span> {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-t border-brand-line">
        <div className="flex gap-0 border-b border-brand-line">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-ui font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-brand-primary text-brand-ink'
                  : 'border-transparent text-brand-muted hover:text-brand-ink'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-8 max-w-2xl">
          {activeTab === 'Description' && (
            <p className="text-brand-muted font-ui text-sm leading-relaxed">{product.description}</p>
          )}
          {activeTab === 'Détails' && (
            <ul className="space-y-2 text-sm font-ui text-brand-muted">
              <li>• Matériaux premium, walla!</li>
              <li>• Lavage à froid en machine</li>
              <li>• Le mannequin mesure 1,75 m et porte une taille M</li>
              <li>• Livraison en 3 à 5 jours ouvrables, yalla!</li>
            </ul>
          )}
          {activeTab === 'Avis' && (
            <p className="text-brand-muted font-ui text-sm">Pas d'avis pour le moment. Sois le premier à en laisser un!</p>
          )}
        </div>
      </div>
    </div>
  );
}
