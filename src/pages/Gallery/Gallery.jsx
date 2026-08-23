import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAdminContent } from '../../hooks/useAdminContent';
import { DEFAULT_GALLERY_CONTENT } from './galleryContent';

const ADONE_OPTIONS = ['Full Dummy', 'Partial Dummy', 'Full Real'];
const FLAVORS = ['Vanilla', 'Chocolate', 'Strawberry', 'Matcha', 'Caramel', 'Hazelnut', 'Lemon', 'Espresso'];
const PARTIAL_FLAVORS = ['Ribbon', 'Chocolate', 'Vanilla', 'Custom'];
const FLOWER_OPTIONS = ['Fresh Flowers', 'Artificial Flowers', 'Sugar Flowers', 'Mix'];

const DEFAULT_ITEM_OPTIONS = {
  flavor: FLAVORS[0] || '',
  adoneType: ADONE_OPTIONS[2], // default to Full Real
  customFlavor: '',
  flowers: FLOWER_OPTIONS[0]
};

export default function Gallery() {
  const { addItem } = useCart();
  const gallery = useAdminContent('/gallery', DEFAULT_GALLERY_CONTENT);
  const GALLERY_ITEMS = gallery.items;
  const CATEGORIES = ['All', ...gallery.categories.map(c => c.name)];

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemOptions, setItemOptions] = useState({});
  const [addedId, setAddedId] = useState(null);
  const [flyingItems, setFlyingItems] = useState([]);
  const modalImageRef = useRef(null);

  // Live gallery content can replace the fallback items (with different ids)
  // after the initial render, so option lookups always fall back to sane
  // defaults instead of assuming every item already has an entry.
  const getOptions = (id) => itemOptions[String(id)] || DEFAULT_ITEM_OPTIONS;

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const activeOptions = selectedImage ? getOptions(selectedImage.id) : null;

  const buildCartPayload = (item) => {
    const options = getOptions(item.id);
    const flavor = options.adoneType === 'Full Dummy'
      ? ''
      : options.flavor === 'Custom'
      ? options.customFlavor || 'Custom'
      : options.flavor;

    return {
      id: item.id,
      title: item.title,
      image: item.image,
      category: item.category,
      adoneType: options.adoneType,
      flavor,
      flowers: options.flowers,
    };
  };

  const flagAdded = (itemId) => {
    setAddedId(itemId);
    setTimeout(() => setAddedId((current) => (current === itemId ? null : current)), 1200);
  };

  const handleGetRate = (item, imgEl) => {
    const payload = buildCartPayload(item);
    const cartIcon = document.querySelector('[data-cart-icon]');

    if (!imgEl || !cartIcon) {
      addItem(payload);
      flagAdded(item.id);
      return;
    }

    const start = imgEl.getBoundingClientRect();
    const end = cartIcon.getBoundingClientRect();

    setFlyingItems((prev) => [
      ...prev,
      {
        flyId: `${item.id}-${Date.now()}`,
        image: item.image,
        payload,
        itemId: item.id,
        start,
        end,
      },
    ]);
  };

  const handleFlightComplete = (flyId, payload, itemId) => {
    addItem(payload);
    flagAdded(itemId);
    setFlyingItems((prev) => prev.filter((f) => f.flyId !== flyId));
  };

  const handleOptionChange = (rawId, field, value) => {
    const id = String(rawId);
    setItemOptions(prev => {
      const next = { ...prev };
      const current = prev[id] || DEFAULT_ITEM_OPTIONS;

      if (field === 'adoneType') {
        if (value === 'Full Dummy') {
          next[id] = { ...current, adoneType: value, flavor: '', customFlavor: '' };
        } else if (value === 'Partial Dummy') {
          next[id] = { ...current, adoneType: value, flavor: PARTIAL_FLAVORS[0], customFlavor: '' };
        } else {
          next[id] = { ...current, adoneType: value, flavor: (FLAVORS[0] ?? ''), customFlavor: '' };
        }
      } else if (field === 'flavor') {
        next[id] = { ...current, flavor: value, customFlavor: value === 'Custom' ? current.customFlavor : '' };
      } else if (field === 'customFlavor') {
        next[id] = { ...current, customFlavor: value, flavor: 'Custom' };
      } else {
        next[id] = { ...current, [field]: value };
      }

      return next;
    });
  };

  return (
    <div className="pt-28 pb-20 bg-luxury-cream min-h-screen px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <p className="text-[10px] uppercase tracking-extreme text-luxury-muted mb-2">Our Atelier Portfolio</p>
        <h1 className="text-3xl md:text-5xl font-serif text-luxury-charcoal font-light mb-3">The Gallery</h1>
        <p className="text-xs text-luxury-muted leading-relaxed font-light">
          Explore our collection of hand-carved confectionary sculptures and luxury desserts.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 border-b border-luxury-sand pb-4">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`text-[11px] uppercase tracking-luxury transition-all relative pb-2 ${
              activeCategory === category 
                ? 'text-luxury-charcoal font-medium' 
                : 'text-luxury-muted hover:text-luxury-charcoal'
            }`}
          >
            {category}
            {activeCategory === category && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-0 left-0 w-full h-[1.5px] bg-luxury-champagne"
              />
            )}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <AnimatePresence>
          {filteredItems.map(item => {
            const options = getOptions(item.id);
            return (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              className="gallery-card bg-white/70 border border-luxury-sand/70 p-3 flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <div>
                <div
                  onClick={() => setSelectedImage(item)}
                  className="aspect-square overflow-hidden bg-luxury-sand relative cursor-pointer mb-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-card-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <span className="text-[11px] uppercase tracking-wider text-luxury-champagne block mb-1 font-medium">
                  {item.category}
                </span>
                <h3 className="text-base md:text-lg font-serif text-luxury-charcoal mb-3">
                  {item.title}
                </h3>

                <div className="space-y-3 text-[11px] text-luxury-charcoal">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <label className="block uppercase tracking-[0.3em] text-luxury-muted mb-1">Adone Type</label>
                      <select
                        value={options.adoneType}
                        onChange={e => handleOptionChange(item.id, 'adoneType', e.target.value)}
                        className="w-full rounded border border-luxury-sand bg-white px-3 py-2 text-[12px] text-luxury-charcoal outline-none transition-shadow duration-200 focus:shadow-sm"
                      >
                        {ADONE_OPTIONS.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block uppercase tracking-[0.3em] text-luxury-muted mb-1">Flowers</label>
                      <select
                        value={options.flowers}
                        onChange={e => handleOptionChange(item.id, 'flowers', e.target.value)}
                        className="w-full rounded border border-luxury-sand bg-white px-3 py-2 text-[12px] text-luxury-charcoal outline-none transition-shadow duration-200 focus:shadow-sm"
                      >
                        {FLOWER_OPTIONS.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Flavor: hidden for Full Dummy, Partial Dummy has limited options + custom */}
                  {options.adoneType !== 'Full Dummy' && (
                    <>
                      <label className="block uppercase tracking-[0.3em] text-luxury-muted mb-1">Flavor</label>
                      <select
                        value={options.flavor}
                        onChange={e => handleOptionChange(item.id, 'flavor', e.target.value)}
                        className="w-full rounded border border-luxury-sand bg-white px-3 py-2 text-[12px] text-luxury-charcoal outline-none transition-shadow duration-200 focus:shadow-sm"
                      >
                        {options.adoneType === 'Partial Dummy'
                          ? PARTIAL_FLAVORS.map(flavor => (
                              <option key={flavor} value={flavor}>{flavor}</option>
                            ))
                          : FLAVORS.map(flavor => (
                              <option key={flavor} value={flavor}>{flavor}</option>
                            ))}
                      </select>

                      {options.flavor === 'Custom' && (
                        <input
                          type="text"
                          value={options.customFlavor}
                          onChange={e => handleOptionChange(item.id, 'customFlavor', e.target.value)}
                          placeholder="Enter custom flavor"
                          className="w-full rounded border border-luxury-sand bg-white px-3 py-2 text-[12px] text-luxury-charcoal outline-none transition-shadow duration-200 focus:shadow-sm"
                        />
                      )}
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => handleGetRate(item, e.currentTarget.closest('.gallery-card')?.querySelector('.gallery-card-img'))}
                className="mt-4 w-full bg-luxury-charcoal text-luxury-cream py-3 text-[12px] uppercase tracking-luxury flex items-center justify-center gap-2 hover:bg-luxury-champagne hover:text-luxury-charcoal transition-colors duration-300"
              >
                {addedId === item.id ? (
                  <>Added <Check size={14} /></>
                ) : (
                  <>Get Rate <ShoppingBag size={14} /></>
                )}
              </button>
            </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Rate Inquiry Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-luxury-charcoal/90 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-luxury-cream max-w-2xl w-full grid sm:grid-cols-2 overflow-hidden shadow-2xl relative border border-luxury-sand"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-10 text-luxury-charcoal hover:text-luxury-champagne"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="h-48 sm:h-auto bg-luxury-sand">
                <img ref={modalImageRef} src={selectedImage.image} alt={selectedImage.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-extreme text-luxury-champagne mb-1 flex items-center gap-1">
                    <Sparkles size={11} /> {selectedImage.category}
                  </span>
                  <h2 className="text-2xl font-serif text-luxury-charcoal mb-2">{selectedImage.title}</h2>

                  <p className="text-[11px] text-luxury-muted leading-relaxed mb-4 font-light">
                    {selectedImage.description}
                  </p>

                  <div className="space-y-3 text-[11px] text-luxury-charcoal mb-4">
                    <div>
                      <span className="block uppercase tracking-[0.3em] text-luxury-muted mb-1">Adone Type</span>
                      <p className="text-sm font-medium">{activeOptions?.adoneType}</p>
                    </div>

                    <div>
                      <span className="block uppercase tracking-[0.3em] text-luxury-muted mb-1">Flavor</span>
                      <p className="text-sm font-medium">
                        {activeOptions?.adoneType === 'Full Dummy'
                          ? 'No flavor (Dummy)'
                          : activeOptions?.flavor === 'Custom'
                          ? activeOptions?.customFlavor || 'Custom'
                          : activeOptions?.flavor || '—'
                        }
                      </p>
                    </div>

                    <div>
                      <span className="block uppercase tracking-[0.3em] text-luxury-muted mb-1">Flowers</span>
                      <p className="text-sm font-medium">{activeOptions?.flowers}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleGetRate(selectedImage, modalImageRef.current);
                    setSelectedImage(null);
                  }}
                  className="w-full bg-luxury-charcoal text-luxury-cream py-3 text-[10px] uppercase tracking-luxury flex items-center justify-center gap-2 hover:bg-luxury-champagne hover:text-luxury-charcoal transition-colors"
                >
                  Get Rate <ShoppingBag size={13} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flying "Get Rate" -> cart animation */}
      <AnimatePresence>
        {flyingItems.map((fly) => (
          <motion.img
            key={fly.flyId}
            src={fly.image}
            initial={{
              top: fly.start.top,
              left: fly.start.left,
              width: fly.start.width,
              height: fly.start.height,
              opacity: 1,
              borderRadius: '12px',
            }}
            animate={{
              top: fly.end.top + fly.end.height / 2 - 10,
              left: fly.end.left + fly.end.width / 2 - 10,
              width: 20,
              height: 20,
              opacity: 0.4,
              borderRadius: '50%',
            }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={() => handleFlightComplete(fly.flyId, fly.payload, fly.itemId)}
            className="fixed z-100 object-cover shadow-xl pointer-events-none"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}