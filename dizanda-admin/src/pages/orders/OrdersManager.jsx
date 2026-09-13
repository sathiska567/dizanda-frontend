import { useEffect, useMemo, useState } from 'react';
import { Eye, RefreshCcw, Trash2 } from 'lucide-react';
import { ordersApi } from '../../api/orders.api';
import { getErrorMessage } from '../../api/axiosClient';
import { useToast } from '../../context/ToastContext';
import { socket } from '../../lib/socket';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { StatusSelect, STATUS_META } from './StatusBadge';
import OrderDetailModal from './OrderDetailModal';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function orderSummary(order) {
  if (order.source === 'cart') {
    const count = order.items?.length || 0;
    return `${count} item${count === 1 ? '' : 's'} from cart`;
  }
  if (!order.message) return 'Custom cake request';
  return order.message.length > 60 ? `${order.message.slice(0, 60)}…` : order.message;
}

export default function OrdersManager() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const load = () => {
    setLoading(true);
    ordersApi
      .list()
      .then(setOrders)
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleNewOrder = (order) => {
      setOrders((prev) => (prev ? [order, ...prev] : prev));
      toast.success(`New order from ${order.customer.name}`);
    };
    const handleUpdatedOrder = (order) => {
      setOrders((prev) => prev?.map((o) => (o.id === order.id ? order : o)) ?? prev);
      setSelected((prev) => (prev?.id === order.id ? order : prev));
    };
    const handleDeletedOrder = ({ id }) => {
      setOrders((prev) => prev?.filter((o) => o.id !== id) ?? prev);
    };

    socket.on('order:new', handleNewOrder);
    socket.on('order:updated', handleUpdatedOrder);
    socket.on('order:deleted', handleDeletedOrder);
    return () => {
      socket.off('order:new', handleNewOrder);
      socket.off('order:updated', handleUpdatedOrder);
      socket.off('order:deleted', handleDeletedOrder);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts = useMemo(() => {
    const base = { all: orders?.length || 0, new: 0, contacted: 0, confirmed: 0, completed: 0, cancelled: 0 };
    (orders || []).forEach((o) => {
      base[o.status] = (base[o.status] || 0) + 1;
    });
    return base;
  }, [orders]);

  const filtered = useMemo(() => {
    if (!orders) return [];
    return filter === 'all' ? orders : orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const handleStatusChange = async (order, status) => {
    try {
      const updated = await ordersApi.updateStatus(order.id, status);
      setOrders((prev) => prev.map((o) => (o.id === order.id ? updated : o)));
      setSelected((prev) => (prev?.id === order.id ? updated : prev));
      toast.success(`Order marked as ${STATUS_META[status].label.toLowerCase()}`);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await ordersApi.remove(deleteTarget.id);
      setOrders((prev) => prev.filter((o) => o.id !== deleteTarget.id));
      setSelected((prev) => (prev?.id === deleteTarget.id ? null : prev));
      toast.success('Order removed');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card
        title="Orders & Quote Requests"
        description="Every checkout quote request and custom cake enquiry submitted from the website lands here."
        actions={
          <Button size="sm" variant="secondary" icon={RefreshCcw} onClick={load} loading={loading}>
            Refresh
          </Button>
        }
      >
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border ${
                filter === key
                  ? 'bg-admin-primary text-white border-admin-primary'
                  : 'bg-white text-admin-muted border-admin-border hover:bg-slate-50'
              }`}
            >
              {label}
              <span className={`ml-1.5 ${filter === key ? 'text-white/80' : 'text-admin-muted/70'}`}>
                {counts[key] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {!orders ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <p className="text-sm text-admin-muted text-center py-12">No orders in this view yet.</p>
        ) : (
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-admin-muted border-y border-admin-border">
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Summary</th>
                  <th className="px-6 py-3 font-medium">Received</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b border-admin-border last:border-0 hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-admin-ink">{order.customer.name}</p>
                      <p className="text-xs text-admin-muted">{order.customer.email}</p>
                      {order.customer.phone && (
                        <p className="text-sm font-bold text-black">{order.customer.phone}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-admin-muted uppercase tracking-wide">
                        {order.source === 'cart' ? 'Cart Quote' : 'Custom Order'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-admin-muted max-w-xs truncate">{orderSummary(order)}</td>
                    <td className="px-6 py-4 text-admin-muted whitespace-nowrap">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4">
                      <StatusSelect status={order.status} onChange={(status) => handleStatusChange(order, status)} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="secondary" icon={Eye} onClick={() => setSelected(order)}>
                          View
                        </Button>
                        <Button size="sm" variant="danger" icon={Trash2} onClick={() => setDeleteTarget(order)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <OrderDetailModal
        order={selected}
        onClose={() => setSelected(null)}
        onStatusChange={(status) => selected && handleStatusChange(selected, status)}
        onDelete={() => setDeleteTarget(selected)}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Permanently remove the request from "${deleteTarget?.customer?.name}"?`}
      />
    </div>
  );
}
