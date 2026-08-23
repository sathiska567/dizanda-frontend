import { NavLink } from 'react-router-dom';
import { ClipboardList, GalleryHorizontalEnd, Home, LayoutDashboard, Users, X } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/home', label: 'Home Page', icon: Home },
  { to: '/about', label: 'About Us', icon: Users },
  { to: '/gallery', label: 'Gallery', icon: GalleryHorizontalEnd },
  { to: '/orders', label: 'Orders', icon: ClipboardList },
];

function NavList({ onNavigate }) {
  return (
    <nav className="flex-1 px-3 py-6 space-y-1">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-admin-primary text-white'
                : 'text-slate-300 hover:bg-admin-sidebar-hover hover:text-white'
            }`
          }
        >
          <Icon size={17} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-admin-sidebar text-slate-300 min-h-screen sticky top-0">
      <div className="px-6 py-6 border-b border-white/10">
        <p className="text-white font-serif text-xl tracking-wide">Dizanda</p>
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 mt-1">Admin Console</p>
      </div>
      <NavList />
      <div className="px-6 py-5 border-t border-white/10 text-[11px] text-slate-500">
        Dizanda Admin Panel v1.0
      </div>
    </aside>
  );
}

export function MobileSidebar({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative w-64 h-full bg-admin-sidebar text-slate-300 flex flex-col">
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <p className="text-white font-serif text-xl">Dizanda</p>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <NavList onNavigate={onClose} />
      </div>
    </div>
  );
}
