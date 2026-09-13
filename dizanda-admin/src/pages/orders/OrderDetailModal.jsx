import { Trash2 } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { StatusSelect } from './StatusBadge';

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' });
}

function DetailField({ label, value, className = '' }) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-wide text-admin-muted mb-1">{label}</p>
      <p className="text-sm text-admin-ink">{value}</p>
    </div>
  );
}

export default function OrderDetailModal({ order, onClose, onStatusChange, onDelete }) {
  return (
    <Modal
      open={Boolean(order)}
      onClose={onClose}
      title={order?.source === 'cart' ? 'Cart Quote Request' : 'Custom Cake Request'}
      size="lg"
      footer={
        <>
          <Button variant="danger" icon={Trash2} onClick={onDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      {order && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-admin-ink">{order.customer.name}</p>
              <p className="text-sm text-admin-muted">{order.customer.email}</p>
              {order.customer.phone && <p className="text-sm text-admin-muted">{order.customer.phone}</p>}
            </div>
            <div className="text-right">
              <StatusSelect status={order.status} onChange={onStatusChange} />
              <p className="text-xs text-admin-muted mt-2">Received {formatDate(order.createdAt)}</p>
            </div>
          </div>

          {order.message && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-admin-muted mb-1.5">
                {order.source === 'cart' ? 'Notes' : 'Cake Idea'}
              </p>
              <p className="text-sm text-admin-ink whitespace-pre-wrap rounded-xl bg-slate-50 border border-admin-border px-4 py-3">
                {order.message}
              </p>
            </div>
          )}

          {order.source === 'custom' && order.customDetails && (
            <div className="grid sm:grid-cols-3 gap-4">
              <DetailField label="Design Type" value={order.customDetails.adoneType} />
              <DetailField label="Flavor" value={order.customDetails.flavor} />
              <DetailField label="Floral Finish" value={order.customDetails.flowerChoice} />
              {order.customDetails.uploadedFileName && (
                <DetailField
                  label="Reference Image"
                  value={order.customDetails.uploadedFileName}
                  className="sm:col-span-3"
                />
              )}
            </div>
          )}

          {order.source === 'cart' && order.items?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-admin-muted mb-2">
                Items ({order.items.length})
              </p>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.cartItemId || item.id} className="flex gap-3 rounded-xl border border-admin-border p-3">
                    {item.image && (
                      <div className="w-14 h-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-admin-ink truncate">{item.title}</p>
                      <p className="text-xs text-admin-muted">
                        {[item.adoneType, item.flavor, item.flowers].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-admin-muted shrink-0">Qty {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
