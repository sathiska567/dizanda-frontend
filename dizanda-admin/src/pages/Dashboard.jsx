import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ClipboardList, GalleryHorizontalEnd, Home, ImageIcon, Users } from 'lucide-react';
import { homeApi } from '../api/home.api';
import { aboutApi } from '../api/about.api';
import { galleryApi } from '../api/gallery.api';
import { ordersApi } from '../api/orders.api';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import StatusBadge from './orders/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { socket } from '../lib/socket';

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

export default function Dashboard() {
  const { admin } = useAuth();
  const toast = useToast();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState(null);

  useEffect(() => {
    Promise.all([homeApi.get(), aboutApi.get(), galleryApi.get(), ordersApi.list()]).then(
      ([home, about, gallery, orders]) => {
        setStats({
          featuredProducts: home.featuredProducts.length,
          teamMembers: about.team.length,
          galleryCategories: gallery.categories.length,
          galleryItems: gallery.items.length,
          newOrders: orders.filter((o) => o.status === 'new').length,
        });
        setRecentOrders(orders.slice(0, 5));
      },
    );
  }, []);

  useEffect(() => {
    const handleNewOrder = (order) => {
      setRecentOrders((prev) => [order, ...(prev || [])].slice(0, 5));
      setStats((prev) => (prev ? { ...prev, newOrders: prev.newOrders + 1 } : prev));
      toast.success(`New order from ${order.customer.name}`);
    };

    socket.on('order:new', handleNewOrder);
    return () => socket.off('order:new', handleNewOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = [
    { label: 'New Orders', value: stats?.newOrders, icon: ClipboardList, to: '/orders' },
    { label: 'Featured Products', value: stats?.featuredProducts, icon: ImageIcon, to: '/home' },
    { label: 'Team Members', value: stats?.teamMembers, icon: Users, to: '/about' },
    { label: 'Gallery Categories', value: stats?.galleryCategories, icon: Home, to: '/gallery' },
    { label: 'Gallery Items', value: stats?.galleryItems, icon: GalleryHorizontalEnd, to: '/gallery' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-admin-ink">Welcome back, {admin?.name?.split(' ')[0]}</h2>
        <p className="text-sm text-admin-muted mt-1">
          Manage the content visitors see on the Dizanda website — home page imagery, the About Us story, and the gallery portfolio.
        </p>
      </div>

      {!stats ? (
        <Spinner />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map(({ label, value, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="bg-admin-surface border border-admin-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-admin-primary-soft text-admin-primary">
                  <Icon size={18} />
                </span>
                <ArrowUpRight size={16} className="text-admin-muted" />
              </div>
              <p className="text-2xl font-semibold text-admin-ink">{value}</p>
              <p className="text-xs text-admin-muted mt-1">{label}</p>
            </Link>
          ))}
        </div>
      )}

      <Card
        title="Recent Orders"
        description="The latest checkout quote requests and custom cake enquiries."
        actions={
          <Link to="/orders" className="text-sm font-medium text-admin-primary hover:underline whitespace-nowrap">
            View all →
          </Link>
        }
      >
        {!recentOrders ? (
          <Spinner />
        ) : recentOrders.length === 0 ? (
          <p className="text-sm text-admin-muted text-center py-8">No orders yet.</p>
        ) : (
          <div className="divide-y divide-admin-border -my-1">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                to="/orders"
                className="flex items-center gap-4 py-3.5 first:pt-1 last:pb-1 hover:bg-slate-50/60 -mx-2 px-2 rounded-xl transition-colors"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-admin-primary-soft text-admin-primary font-semibold">
                  {order.customer.name?.charAt(0).toUpperCase() || '?'}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-medium text-admin-ink truncate">{order.customer.name}</p>
                    {order.customer.phone && (
                      <p className="text-sm font-bold text-black whitespace-nowrap">{order.customer.phone}</p>
                    )}
                  </div>
                  <p className="text-sm text-admin-muted truncate">{orderSummary(order)}</p>
                </div>
                <div className="text-right shrink-0">
                  <StatusBadge status={order.status} />
                  <p className="text-xs text-admin-muted mt-1.5">{formatDate(order.createdAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>

      <div className="grid md:grid-cols-4 gap-4">
        <Card title="Orders" description="Checkout quote requests and custom cake enquiries from customers." className="flex flex-col">
          <Link to="/orders" className="text-sm font-medium text-admin-primary hover:underline">
            View Orders →
          </Link>
        </Card>
        <Card title="Home Page" description="Hero banner, headline copy and featured commissions." className="flex flex-col">
          <Link to="/home" className="text-sm font-medium text-admin-primary hover:underline">
            Manage Home Page →
          </Link>
        </Card>
        <Card title="About Us" description="Brand story, philosophy quote and founder profiles." className="flex flex-col">
          <Link to="/about" className="text-sm font-medium text-admin-primary hover:underline">
            Manage About Us →
          </Link>
        </Card>
        <Card title="Gallery" description="Portfolio categories and individual gallery pieces." className="flex flex-col">
          <Link to="/gallery" className="text-sm font-medium text-admin-primary hover:underline">
            Manage Gallery →
          </Link>
        </Card>
      </div>
    </div>
  );
}
