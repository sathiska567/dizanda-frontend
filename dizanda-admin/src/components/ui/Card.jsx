export default function Card({ title, description, actions, children, className = '' }) {
  return (
    <div className={`bg-admin-surface border border-admin-border rounded-2xl shadow-sm ${className}`}>
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-admin-border">
          <div>
            {title && <h2 className="text-base font-semibold text-admin-ink">{title}</h2>}
            {description && <p className="text-sm text-admin-muted mt-1">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
