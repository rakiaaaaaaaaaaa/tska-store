'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useProductStore } from '@/store/useProductStore';
import { Order } from '@/types';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;
  const orders = useProductStore((s) => s.orders);

  const order = orders.find((o) => o.id === orderId) as Order | undefined;

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="font-display text-4xl font-semibold text-brand-ink mb-4">Commande non trouvée</h1>
        <p className="text-brand-muted mb-8">Nous ne pouvons pas retrouver cette commande.</p>
        <Link href="/shop" className="btn-primary">
          Retourner à la boutique
        </Link>
      </div>
    );
  }

  const orderDate = new Date(order.date);
  const deliveryDate = new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="font-display text-4xl font-semibold text-brand-ink mb-2">Commande confirmée !</h1>
        <p className="text-brand-muted">Merci pour ton achat, yalla!</p>
      </motion.div>

      {/* Order Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl border border-brand-line p-8 mb-8"
      >
        <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-brand-line">
          <div>
            <p className="text-xs font-ui font-semibold text-brand-muted uppercase tracking-wider mb-2">Numéro de commande</p>
            <p className="font-display text-2xl font-semibold text-brand-ink">{order.id}</p>
          </div>
          <div>
            <p className="text-xs font-ui font-semibold text-brand-muted uppercase tracking-wider mb-2">Date de commande</p>
            <p className="font-display text-2xl font-semibold text-brand-ink">
              {orderDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-8">
          <h2 className="font-display text-lg font-semibold text-brand-ink mb-4">Informations de livraison</h2>
          <div className="space-y-2 text-sm font-ui text-brand-muted">
            <p>
              <span className="font-semibold text-brand-ink">{order.customer.name}</span>
            </p>
            <p>{order.customer.address}</p>
            <p>{order.customer.city}</p>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="mb-8 pb-8 border-b border-brand-line">
          <h2 className="font-display text-lg font-semibold text-brand-ink mb-4">Livraison estimée</h2>
          <p className="text-sm font-ui text-brand-muted">
            <span className="font-semibold text-brand-ink">
              {deliveryDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <br />
            Livraison standard (5 jours ouvrables)
          </p>
        </div>

        {/* Order Items */}
        <h2 className="font-display text-lg font-semibold text-brand-ink mb-4">Articles commandés</h2>
        <div className="space-y-4 mb-8 pb-8 border-b border-brand-line">
          {order.items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}`}
              className="flex items-center justify-between p-4 bg-brand-pale rounded-xl"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.product.emoji}</span>
                <div>
                  <p className="font-semibold text-brand-ink text-sm">{item.product.name}</p>
                  <p className="text-xs text-brand-muted">
                    Qté: {item.quantity} {item.size && `• Taille: ${item.size}`}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-brand-ink">${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-ui">
            <span className="text-brand-muted">Sous-total</span>
            <span className="font-semibold text-brand-ink">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-ui">
            <span className="text-brand-muted">Livraison</span>
            <span className="font-semibold text-brand-ink">${order.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-display font-semibold pt-2 border-t border-brand-line">
            <span className="text-brand-ink">Total</span>
            <span className="text-brand-primary">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      {/* Email Confirmation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 border border-blue-200 rounded-3xl p-6 mb-8"
      >
        <p className="text-sm font-ui text-blue-900">
          <span className="font-semibold">Confirmation par email :</span> Un email de confirmation a été envoyé à{' '}
          <span className="font-semibold">{order.customer.email}</span>. Vérifie ton dossier spam si tu ne le vois pas.
        </p>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/my-orders" className="flex-1 btn-primary text-center py-3">
          Voir mes commandes
        </Link>
        <Link href="/shop" className="flex-1 btn-ghost text-center py-3">
          Continuer les achats
        </Link>
      </div>

      {/* Print Option */}
      <div className="mt-6 text-center">
        <button
          onClick={() => window.print()}
          className="text-sm text-brand-primary hover:text-brand-deep transition-colors font-ui font-semibold"
        >
          🖨️ Imprimer la commande
        </button>
      </div>
    </div>
  );
}
