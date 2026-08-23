export const STATUS_ORDER = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'];

export const STATUS_META = {
  new: { label: 'New', className: 'bg-admin-primary-soft text-admin-primary' },
  contacted: { label: 'Contacted', className: 'bg-amber-50 text-amber-700' },
  confirmed: { label: 'Confirmed', className: 'bg-sky-50 text-sky-700' },
  completed: { label: 'Completed', className: 'bg-admin-success-soft text-admin-success' },
  cancelled: { label: 'Cancelled', className: 'bg-admin-danger-soft text-admin-danger' },
};

export default function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.new;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${meta.className}`}>
      {meta.label}
    </span>
  );
}

export function StatusSelect({ status, onChange }) {
  const meta = STATUS_META[status] || STATUS_META.new;
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-full border-0 pl-2.5 pr-7 py-1 text-xs font-medium outline-none cursor-pointer focus:ring-2 focus:ring-admin-primary/30 ${meta.className}`}
    >
      {STATUS_ORDER.map((key) => (
        <option key={key} value={key}>
          {STATUS_META[key].label}
        </option>
      ))}
    </select>
  );
}
