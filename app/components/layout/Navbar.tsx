'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useProductStore } from '@/store/useProductStore';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Vêtements', href: '/shop?category=clothing' },
  { label: 'Casquettes', href: '/shop?category=caps' },
  { label: 'Robes', href: '/shop?category=robes' },
  { label: 'Maquillage', href: '/shop?category=makeup' },
  { label: 'Maison', href: '/shop?category=homeware' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const openCart = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.totalItems());
  const wishlist = useProductStore((s) => s.wishlist);
  const setSearchQuery = useProductStore((s) => s.setSearchQuery);

  return (
    <header className="sticky top-0 z-50 bg-brand-surface/95 backdrop-blur-sm border-b border-brand-line h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5 shrink-0">
          <span className="font-ui font-bold text-xl tracking-widest text-brand-ink uppercase">TSKA</span>
          <span className="font-ui font-light text-xl text-brand-primary">.store</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-ui text-brand-muted hover:text-brand-ink transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={searchValue}
                onChange={(e) => { setSearchValue(e.target.value); setSearchQuery(e.target.value); }}
                placeholder="Cherche un produit…"
                className="text-sm border border-brand-line rounded-full px-3 py-1 focus:outline-none focus:border-brand-primary w-40 font-ui"
                onBlur={() => { setSearchOpen(false); }}
                onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-brand-pale transition-colors"
              aria-label="Chercher"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          )}

          {/* Wishlist */}
          <Link
            href="/shop"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-brand-pale transition-colors relative"
            aria-label="Favoris"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button
            onClick={openCart}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-brand-pale transition-colors relative"
            aria-label="Panier"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu principal"
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-0.5 bg-brand-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-brand-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-brand-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-brand-surface border-b border-brand-line md:hidden z-40 animate-fade-in">
          <nav className="flex flex-col py-4 px-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-sm font-ui text-brand-muted hover:text-brand-ink border-b border-brand-line last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
