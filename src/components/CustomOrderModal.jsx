import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud } from 'lucide-react';

const ADONE_TYPES = ['Full Dummy', 'Partial Dummy', 'Full Real'];
const FLAVORS = ['Vanilla', 'Chocolate', 'Strawberry', 'Matcha', 'Caramel', 'Hazelnut', 'Lemon', 'Espresso'];
const FLOWER_OPTIONS = ['Fresh Flowers', 'Artificial Flowers', 'Sugar Flowers', 'Mix'];

export default function CustomOrderModal({ open, onClose }) {
  const [form, setForm] = useState({
    cakeIdea: '',
    adoneType: ADONE_TYPES[0],
    flavor: FLAVORS[0],
    flowerChoice: FLOWER_OPTIONS[0],
    name: '',
    email: '',
    phone: '',
    uploadedFileName: '',
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = event => {
    const file = event.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, uploadedFileName: file.name }));
    }
  };

  useEffect(() => {
    if (open) {
      setForm({
        cakeIdea: '',
        adoneType: ADONE_TYPES[0],
        flavor: FLAVORS[0],
        flowerChoice: FLOWER_OPTIONS[0],
        name: '',
        email: '',
        phone: '',
        uploadedFileName: '',
      });
    }
  }, [open]);

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Custom order submitted', form);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[100vw] sm:max-w-2xl bg-luxury-cream text-luxury-charcoal rounded-3xl shadow-2xl border border-luxury-sand overflow-hidden max-h-[calc(100vh-2rem)]"
            onClick={event => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-luxury-sand">
              <div>
                <p className="text-[10px] uppercase tracking-extreme text-luxury-muted mb-1">Custom Cake Request</p>
                <h2 className="text-2xl font-serif">Tell Us Your Cake Vision</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close custom order form"
                className="rounded-full p-2 text-luxury-charcoal hover:bg-luxury-sand/40 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium uppercase tracking-[0.28em] text-luxury-muted">Cake Style Idea</label>
                <textarea
                  value={form.cakeIdea}
                  onChange={e => handleChange('cakeIdea', e.target.value)}
                  placeholder="Describe the shape, style, decoration or inspiration..."
                  className="w-full min-h-30 rounded-xl border border-luxury-sand bg-white px-4 py-3 text-sm text-luxury-charcoal outline-none focus:ring-2 focus:ring-luxury-champagne"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-medium uppercase tracking-[0.28em] text-luxury-muted">
                  Upload Cake Photo
                  <span className="block text-xs font-normal text-luxury-muted mt-1">Attach a reference image or inspiration photo.</span>
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-luxury-sand bg-white px-4 py-4">
                  <UploadCloud size={24} className="text-luxury-champagne" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-luxury-charcoal">{form.uploadedFileName || 'No file selected'}</p>
                    <p className="text-xs text-luxury-muted">JPEG, PNG or web image</p>
                  </div>
                  <label className="cursor-pointer rounded-full bg-luxury-charcoal px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-luxury-cream transition-colors hover:bg-luxury-onyx">
                    Choose
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-extreme text-luxury-muted mb-2">Adone Type</label>
                  <select
                    value={form.adoneType}
                    onChange={e => handleChange('adoneType', e.target.value)}
                    className="w-full rounded-xl border border-luxury-sand bg-white px-4 py-3 text-sm text-luxury-charcoal outline-none focus:ring-2 focus:ring-luxury-champagne"
                  >
                    {ADONE_TYPES.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-extreme text-luxury-muted mb-2">Flavor</label>
                  <select
                    value={form.flavor}
                    onChange={e => handleChange('flavor', e.target.value)}
                    className="w-full rounded-xl border border-luxury-sand bg-white px-4 py-3 text-sm text-luxury-charcoal outline-none focus:ring-2 focus:ring-luxury-champagne"
                  >
                    {FLAVORS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-extreme text-luxury-muted mb-2">Floral Finish</label>
                  <select
                    value={form.flowerChoice}
                    onChange={e => handleChange('flowerChoice', e.target.value)}
                    className="w-full rounded-xl border border-luxury-sand bg-white px-4 py-3 text-sm text-luxury-charcoal outline-none focus:ring-2 focus:ring-luxury-champagne"
                  >
                    {FLOWER_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-extreme text-luxury-muted mb-2">Name</label>
                  <input
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-luxury-sand bg-white px-4 py-3 text-sm text-luxury-charcoal outline-none focus:ring-2 focus:ring-luxury-champagne"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-extreme text-luxury-muted mb-2">Contact Number</label>
                  <input
                    value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder="Phone number"
                    className="w-full rounded-xl border border-luxury-sand bg-white px-4 py-3 text-sm text-luxury-charcoal outline-none focus:ring-2 focus:ring-luxury-champagne"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-extreme text-luxury-muted mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="Email address"
                    className="w-full rounded-xl border border-luxury-sand bg-white px-4 py-3 text-sm text-luxury-charcoal outline-none focus:ring-2 focus:ring-luxury-champagne"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-luxury-charcoal px-6 py-3 text-sm uppercase tracking-[0.3em] text-luxury-charcoal transition-colors hover:bg-luxury-sand"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-luxury-charcoal px-6 py-3 text-sm uppercase tracking-[0.3em] text-luxury-cream transition-colors hover:bg-luxury-onyx"
                >
                  Send Request
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
