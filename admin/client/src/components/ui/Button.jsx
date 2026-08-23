import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-admin-primary text-white hover:bg-admin-primary-hover',
  secondary: 'bg-white text-admin-ink border border-admin-border hover:bg-slate-50',
  danger: 'bg-white text-admin-danger border border-red-200 hover:bg-admin-danger-soft',
  ghost: 'text-admin-muted hover:text-admin-ink hover:bg-slate-100',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  className = '',
  disabled,
  type = 'button',
  ...props
}) {
  const sizeClass = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm';
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${sizeClass} ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 size={15} className="animate-spin" /> : Icon ? <Icon size={15} /> : null}
      {children}
    </button>
  );
}
