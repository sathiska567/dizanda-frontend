import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar, { MobileSidebar } from './Sidebar';
import Topbar from './Topbar';

const TITLES = {
  '/': 'Dashboard',
  '/home': 'Home Page Management',
  '/about': 'About Us Management',
  '/gallery': 'Gallery Management',
  '/orders': 'Orders & Quote Requests',
};

export default function AdminLayout() {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const title = TITLES[location.pathname] || 'Dizanda Admin';

  return (
    <div className="flex min-h-screen bg-admin-bg">
      <Sidebar />
      {mobileNavOpen && <MobileSidebar onClose={() => setMobileNavOpen(false)} />}

      <div className="flex-1 min-w-0">
        <Topbar title={title} onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
