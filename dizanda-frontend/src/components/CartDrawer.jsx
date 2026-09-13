import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../lib/adminApi';

const initialContact = { name: '', email: '', phone: '', notes: '' };

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [contact, setContact] = useState(initialContact);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setError('');
    }
  }, [open]);

  const handleContactChange = (field, value) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await submitOrder({
        source: 'cart',
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        message: contact.notes,
        items,
      });
      setSubmitted(true);
      setContact(initialContact);
      clearCart();
    } catch (err) {
      setError(err.message || 'Could not send your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-luxury-cream text-luxury-charcoal shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-luxury-sand">
              <h2 className="text-xl font-serif">Your Selections</h2>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="rounded-full p-2 hover:bg-luxury-sand/40 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-3">
                <ShoppingBag size={32} className="text-luxury-champagne" />
                <h3 className="text-lg font-serif">Request Sent</h3>
                <p className="text-sm text-luxury-muted">
                  Thank you. Our atelier team will reach out shortly with a custom quote for your selections.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 rounded-full bg-luxury-charcoal text-luxury-cream px-6 py-3 text-xs uppercase tracking-[0.3em] hover:bg-luxury-onyx transition-colors"
                >
                  Close
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-3">
                <ShoppingBag size={32} className="text-luxury-muted" />
                <h3 className="text-lg font-serif">Your list is empty</h3>
                <p className="text-sm text-luxury-muted">
                  Browse the gallery and add cake designs you'd like a quote for.
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="flex gap-4 border-b border-luxury-sand pb-4">
                      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-luxury-sand">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-serif truncate">{item.title}</h4>
                        <p className="text-[11px] text-luxury-muted mb-2">
                          {item.adoneType}
                          {item.flavor ? ` · ${item.flavor}` : ''}
                          {item.flowers ? ` · ${item.flowers}` : ''}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-luxury-sand rounded-full">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1.5 disabled:opacity-30"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="p-1.5"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.cartItemId)}
                            className="text-luxury-muted hover:text-luxury-charcoal transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="border-t border-luxury-sand px-6 py-5 space-y-3">
                  <p className="text-[10px] uppercase tracking-extreme text-luxury-muted">Request a quote for these items</p>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full rounded-xl border border-luxury-sand bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-luxury-champagne"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      placeholder="Email"
                      required
                      className="w-full rounded-xl border border-luxury-sand bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-luxury-champagne"
                    />
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      placeholder="Phone"
                      className="w-full rounded-xl border border-luxury-sand bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-luxury-champagne"
                    />
                  </div>
                  <textarea
                    value={contact.notes}
                    onChange={(e) => handleContactChange('notes', e.target.value)}
                    placeholder="Anything else we should know?"
                    className="w-full min-h-16 rounded-xl border border-luxury-sand bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-luxury-champagne"
                  />
                  {error && <p className="text-xs text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-luxury-charcoal text-luxury-cream py-3 text-xs uppercase tracking-[0.3em] hover:bg-luxury-onyx transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting && <Loader2 size={14} className="animate-spin" />}
                    {submitting ? 'Sending…' : 'Submit Quote Request'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
