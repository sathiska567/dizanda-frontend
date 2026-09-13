import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  if (!open) return null;

  const widthClass = size === 'lg' ? 'max-w-2xl' : size === 'sm' ? 'max-w-sm' : 'max-w-lg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />
      <div className={`relative w-full ${widthClass} bg-admin-surface rounded-2xl shadow-2xl border border-admin-border max-h-[88vh] flex flex-col`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-admin-border">
          <h3 className="text-base font-semibold text-admin-ink">{title}</h3>
          <button onClick={onClose} className="text-admin-muted hover:text-admin-ink rounded-lg p-1 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-admin-border">{footer}</div>}
      </div>
    </div>
  );
}
