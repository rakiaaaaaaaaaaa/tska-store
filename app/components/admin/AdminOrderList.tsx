'use client';
import { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { useToast } from '@/app/components/ui/Toast';

export default function AdminOrderList() {
  const { orders, updateOrderStatus, deleteOrder } = useProductStore();
  const show = useToast((s) => s.show);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredOrders = statusFilter ? orders.filter((o) => o.status === statusFilter) : orders;

  const handleStatusChange = (orderId: string, newStatus: any) => {
    updateOrderStatus(orderId, newStatus);
    show('Statut de la commande mis à jour', 'success');
  };

  const handleDelete = (orderId: string) => {
    if (confirm('Supprimer cette commande ?')) {
      deleteOrder(orderId);
      show('Commande supprimée', 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setStatusFilter(null)}
          className={`px-4 py-2 rounded-lg text-sm font-ui transition-colors ${
            statusFilter === null
              ? 'bg-brand-primary text-white'
              : 'bg-brand-pale text-brand-muted hover:text-brand-ink'
          }`}
        >
          Toutes
        </button>
        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-ui transition-colors ${
              statusFilter === status
                ? 'bg-brand-primary text-white'
                : 'bg-brand-pale text-brand-muted hover:text-brand-ink'
            }`}
          >
            {status === 'Pending' ? 'En attente' : status === 'Processing' ? 'Traitement' : status === 'Shipped' ? 'Expédiée' : status === 'Delivered' ? 'Livrée' : 'Annulée'}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-brand-line">
              <th className="text-left px-4 py-3 text-xs font-ui font-semibold uppercase text-brand-muted">Commande</th>
              <th className="text-left px-4 py-3 text-xs font-ui font-semibold uppercase text-brand-muted">Client</th>
              <th className="text-left px-4 py-3 text-xs font-ui font-semibold uppercase text-brand-muted">Date</th>
              <th className="text-left px-4 py-3 text-xs font-ui font-semibold uppercase text-brand-muted">Articles</th>
              <th className="text-left px-4 py-3 text-xs font-ui font-semibold uppercase text-brand-muted">Total</th>
              <th className="text-left px-4 py-3 text-xs font-ui font-semibold uppercase text-brand-muted">Statut</th>
              <th className="text-left px-4 py-3 text-xs font-ui font-semibold uppercase text-brand-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-brand-muted text-sm font-ui">
                  Aucune commande trouvée
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-brand-line hover:bg-brand-pale transition-colors">
                  <td className="px-4 py-3 font-ui font-semibold text-sm text-brand-ink">{order.id}</td>
                  <td className="px-4 py-3 text-sm font-ui text-brand-muted">{order.customer.name}</td>
                  <td className="px-4 py-3 text-sm font-ui text-brand-muted">
                    {new Date(order.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-sm font-ui text-brand-ink">{order.items.length}</td>
                  <td className="px-4 py-3 font-display font-semibold text-brand-primary">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="text-xs font-ui px-2 py-1 rounded border border-brand-line focus:outline-none focus:border-brand-primary"
                    >
                      <option value="Pending">En attente</option>
                      <option value="Processing">Traitement</option>
                      <option value="Shipped">Expédiée</option>
                      <option value="Delivered">Livrée</option>
                      <option value="Cancelled">Annulée</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:text-red-800 transition-colors text-sm font-ui font-semibold"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="bg-brand-pale rounded-xl p-4 flex gap-8 text-sm font-ui">
        <div>
          <span className="text-brand-muted">Total commandes:</span>{' '}
          <span className="font-semibold text-brand-ink">{orders.length}</span>
        </div>
        <div>
          <span className="text-brand-muted">Revenu total:</span>{' '}
          <span className="font-semibold text-brand-primary">${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
