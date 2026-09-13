export function Label({ children, hint }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wide text-admin-muted mb-1.5">
      {children}
      {hint && <span className="ml-1 font-normal normal-case text-admin-muted/70">({hint})</span>}
    </label>
  );
}

const baseInputClass =
  'w-full rounded-lg border border-admin-border bg-white px-3.5 py-2.5 text-sm text-admin-ink outline-none transition focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/15 placeholder:text-slate-400';

export function Input(props) {
  return <input {...props} className={`${baseInputClass} ${props.className || ''}`} />;
}

export function Textarea(props) {
  return <textarea {...props} className={`${baseInputClass} resize-y ${props.className || ''}`} />;
}

export function Select({ children, ...props }) {
  return (
    <select {...props} className={`${baseInputClass} ${props.className || ''}`}>
      {children}
    </select>
  );
}

export function Field({ label, hint, children }) {
  return (
    <div>
      {label && <Label hint={hint}>{label}</Label>}
      {children}
    </div>
  );
}
