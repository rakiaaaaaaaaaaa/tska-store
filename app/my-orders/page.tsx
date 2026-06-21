'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useProductStore } from '@/store/useProductStore';

export default function MyOrdersPage() {
  const orders = useProductStore((s) => s.orders);

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="font-display text-4xl font-semibold text-brand-ink mb-4">Aucune commande</h1>
        <p className="text-brand-muted mb-8">Tu n\'as pas encore passé de commande.</p>
        <Link href="/shop" className="btn-primary">
          Commencer à acheter
        </Link>
      </div>
    );
  }

  const sortedOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'En attente';
      case 'Processing':
        return 'Traitement en cours';
      case 'Shipped':
        return 'Expédiée';
      case 'Delivered':
        return 'Livrée';
      case 'Cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-semibold text-brand-ink mb-8">Mes commandes</h1>

      <div className="space-y-4">
        {sortedOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/order-confirmation/${order.id}`}>
              <div className="bg-white rounded-2xl border border-brand-line p-6 hover:border-brand-primary hover:shadow-lg transition-all cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  {/* Order ID */}
                  <div>
                    <p className="text-xs font-ui font-semibold text-brand-muted uppercase tracking-wider mb-1">
                      Commande
                    </p>
                    <p className="font-display font-semibold text-brand-ink">{order.id}</p>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-xs font-ui font-semibold text-brand-muted uppercase tracking-wider mb-1">Date</p>
                    <p className="text-sm font-ui text-brand-ink">
                      {new Date(order.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  {/* Items */}
                  <div>
                    <p className="text-xs font-ui font-semibold text-brand-muted uppercase tracking-wider mb-1">
                      Articles
                    </p>
                    <p className="text-sm font-ui text-brand-ink">{order.items.length} article(s)</p>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-xs font-ui font-semibold text-brand-muted uppercase tracking-wider mb-1">Total</p>
                    <p className="font-display font-semibold text-brand-primary">${order.total.toFixed(2)}</p>
                  </div>

                  {/* Status */}
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-ui font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="mt-4 pt-4 border-t border-brand-line">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {order.items.slice(0, 5).map((item, i) => (
                      <div key={i} className="flex-shrink-0 text-2xl">{item.product.emoji}</div>
                    ))}
                    {order.items.length > 5 && (
                      <div className="flex-shrink-0 text-sm font-ui text-brand-muted flex items-center">
                        +{order.items.length - 5}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="mt-12 text-center">
        <Link href="/shop" className="text-sm text-brand-primary hover:text-brand-deep transition-colors font-ui font-semibold">
          ← Continuer les achats
        </Link>
      </div>
    </div>
  );
}
