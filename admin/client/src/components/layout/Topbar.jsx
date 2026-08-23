import { useState } from 'react';
import { LogOut, Menu, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar({ title, onOpenMobileNav }) {
  const { admin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-admin-border bg-admin-surface/90 backdrop-blur-sm px-4 sm:px-8 py-4">
      <div className="flex items-center gap-3">
        <button onClick={onOpenMobileNav} className="lg:hidden text-admin-muted hover:text-admin-ink">
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-admin-ink">{title}</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2.5 rounded-full pl-2 pr-3 py-1.5 hover:bg-slate-100 transition-colors"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-primary-soft text-admin-primary">
            <User size={16} />
          </span>
          <span className="hidden sm:block text-sm font-medium text-admin-ink">{admin?.name}</span>
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-admin-border bg-admin-surface shadow-lg z-20 overflow-hidden">
              <div className="px-4 py-3 border-b border-admin-border">
                <p className="text-sm font-medium text-admin-ink truncate">{admin?.name}</p>
                <p className="text-xs text-admin-muted truncate">{admin?.email}</p>
              </div>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-admin-danger hover:bg-admin-danger-soft"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
