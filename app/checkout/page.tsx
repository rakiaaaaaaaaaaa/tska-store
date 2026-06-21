'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useProductStore } from '@/store/useProductStore';
import { CheckoutAddress, Order } from '@/types';
import { useToast } from '@/app/components/ui/Toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const { addOrder } = useProductStore();
  const show = useToast((s) => s.show);

  const [formData, setFormData] = useState<CheckoutAddress>({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="font-display text-4xl font-semibold text-brand-ink mb-4">Ton panier est vide</h1>
        <p className="text-brand-muted mb-8">Ajoute des articles avant de passer la commande.</p>
        <Link href="/shop" className="btn-primary">
          Continuer les achats
        </Link>
      </div>
    );
  }

  const shipping = 10;
  const total = subtotal() + shipping;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
    if (!formData.city.trim()) newErrors.city = 'La ville est requise';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      show('Veuillez remplir tous les champs correctement', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `ORD-${Date.now()}`;
      const order: Order = {
        id: orderId,
        date: new Date().toISOString(),
        customer: formData,
        items,
        subtotal: subtotal(),
        shipping,
        total,
        status: 'Pending',
      };

      addOrder(order);
      clearCart();
      show('Commande passée avec succès !', 'success');

      router.push(`/order-confirmation/${orderId}`);
    } catch (error) {
      show('Une erreur s\'est produite. Essaie à nouveau.', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-semibold text-brand-ink mb-8">Passer la commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-brand-line">
            <h2 className="font-display text-2xl font-semibold text-brand-ink">Informations de livraison</h2>

            {/* Name */}
            <div>
              <label className="block text-sm font-ui font-semibold mb-2 text-brand-muted">Nom complet *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border font-ui text-sm focus:outline-none transition-colors ${
                  errors.name ? 'border-red-400 bg-red-50' : 'border-brand-line focus:border-brand-primary'
                }`}
                placeholder="Sara Ben Ali"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-ui font-semibold mb-2 text-brand-muted">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border font-ui text-sm focus:outline-none transition-colors ${
                  errors.email ? 'border-red-400 bg-red-50' : 'border-brand-line focus:border-brand-primary'
                }`}
                placeholder="sara@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-ui font-semibold mb-2 text-brand-muted">Adresse *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border font-ui text-sm focus:outline-none transition-colors ${
                  errors.address ? 'border-red-400 bg-red-50' : 'border-brand-line focus:border-brand-primary'
                }`}
                placeholder="123 Rue de la Paix"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-ui font-semibold mb-2 text-brand-muted">Ville *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border font-ui text-sm focus:outline-none transition-colors ${
                  errors.city ? 'border-red-400 bg-red-50' : 'border-brand-line focus:border-brand-primary'
                }`}
                placeholder="Tunis"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-ui font-semibold mb-2 text-brand-muted">Téléphone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border font-ui text-sm focus:outline-none transition-colors ${
                  errors.phone ? 'border-red-400 bg-red-50' : 'border-brand-line focus:border-brand-primary'
                }`}
                placeholder="+216 12 345 678"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4 border-t border-brand-line">
              {[['🔒', 'Paiement sécurisé'], ['🚚', 'Livraison rapide'], ['↩️', 'Retours gratuits']].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2 text-xs font-ui text-brand-muted">
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-3 text-sm font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Traitement...' : 'Confirmer la commande'}
            </button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="sticky top-24 bg-white p-6 rounded-3xl border border-brand-line space-y-6">
            <h2 className="font-display text-xl font-semibold text-brand-ink">Résumé de la commande</h2>

            {/* Items */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.product.emoji}</span>
                    <div>
                      <p className="font-medium text-brand-ink">{item.product.name}</p>
                      <p className="text-xs text-brand-muted">Qté: {item.quantity}</p>
                      {item.size && <p className="text-xs text-brand-muted">Taille: {item.size}</p>}
                    </div>
                  </div>
                  <p className="font-semibold text-brand-ink">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-brand-line">
              <div className="flex justify-between text-sm font-ui">
                <span className="text-brand-muted">Sous-total</span>
                <span className="font-semibold text-brand-ink">${subtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-ui">
                <span className="text-brand-muted">Livraison</span>
                <span className="font-semibold text-brand-ink">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-display font-semibold pt-2 border-t border-brand-line">
                <span className="text-brand-ink">Total</span>
                <span className="text-brand-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Continue Shopping */}
            <Link href="/shop" className="block text-center text-sm text-brand-muted hover:text-brand-ink transition-colors">
              ← Continuer les achats
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
