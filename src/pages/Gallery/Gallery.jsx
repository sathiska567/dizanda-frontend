import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Tag, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', 'Cake Structure', 'Golden Wedding Cakes', 'Cup Cakes', 'Brownies'];
const ADONE_OPTIONS = ['Full Dummy', 'Partial Dummy', 'Full Real'];
const FLAVORS = ['Vanilla', 'Chocolate', 'Strawberry', 'Matcha', 'Caramel', 'Hazelnut', 'Lemon', 'Espresso'];
const PARTIAL_FLAVORS = ['Ribbon', 'Chocolate', 'Vanilla', 'Custom'];
const FLOWER_OPTIONS = ['Fresh Flowers', 'Artificial Flowers', 'Sugar Flowers', 'Mix'];

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Ivory Structure',
    category: 'Cake Structure',
    rate: '$420',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
    description: 'Architectural vanilla sponge with delicate sugar panels and hidden passionfruit mousse.',
    availableFlavors: ['Vanilla', 'Chocolate', 'Red Velvet', 'Hazelnut']
  },
  {
    id: 2,
    title: 'Golden Vows',
    category: 'Golden Wedding Cakes',
    rate: '$760',
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=800&auto=format&fit=crop',
    description: 'Three-tier wedding cake decorated in edible gold, white peonies, and champagne buttercream.',
    availableFlavors: ['Champagne', 'Almond', 'Salted Caramel', 'Lemon']
  },
  {
    id: 3,
    title: 'Rose Petal Cupcakes',
    category: 'Cup Cakes',
    rate: '$120 / dozen',
    image: 'https://images.unsplash.com/photo-1549047026-2c1a62c0b13c?q=80&w=800&auto=format&fit=crop',
    description: 'Mini cupcakes topped with cream cheese frosting, rose petals, and a hint of raspberry.',
    availableFlavors: ['Vanilla', 'Chocolate', 'Strawberry', 'Matcha']
  },
  {
    id: 4,
    title: 'Brownie Bliss Box',
    category: 'Brownies',
    rate: '$95 / box',
    image: 'https://images.unsplash.com/photo-1516685018646-549d7e8d76d0?q=80&w=800&auto=format&fit=crop',
    description: 'Decadent chocolate brownies with toasted nuts, sea salt, and caramel drizzle.',
    availableFlavors: ['Classic Chocolate', 'Salted Caramel', 'Espresso', 'Nutella']
  },
  {
    id: 5,
    title: 'Golden Cascade',
    category: 'Golden Wedding Cakes',
    rate: '$890',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=800&auto=format&fit=crop',
    description: 'Grand wedding cake with gold leaf accents, sugar orchids, and layered hazelnut praline.',
    availableFlavors: ['Vanilla', 'Hazelnut', 'Champagne', 'Strawberry']
  },
  {
    id: 6,
    title: 'Sculpted Garden',
    category: 'Cake Structure',
    rate: '$520',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop',
    description: 'Modern sculpted cake with edible blooms, mirror glaze, and chiffon sponge tiers.',
    availableFlavors: ['White Chocolate', 'Lemon', 'Lavender', 'Coconut']
  },
  {
    id: 7,
    title: 'Frosted Romance',
    category: 'Cup Cakes',
    rate: '$130 / dozen',
    image: 'https://images.unsplash.com/photo-1523475496153-3d6cc3c08b79?q=80&w=800&auto=format&fit=crop',
    description: 'A floral cupcake collection with buttercream swirls and delicate sugar petals.',
    availableFlavors: ['Vanilla', 'Strawberry', 'Chocolate', 'Hazelnut']
  },
  {
    id: 8,
    title: 'Caramel Brownies',
    category: 'Brownies',
    rate: '$110 / box',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    description: 'Chewy brownies layered with caramel and topped with sea salt crystals.',
    availableFlavors: ['Classic Chocolate', 'Caramel', 'Espresso', 'Nutella']
  }
];

const buildInitialOptions = () =>
  Object.fromEntries(
    GALLERY_ITEMS.map(item => [
      String(item.id),
      {
        flavor: FLAVORS[0] || '',
        adoneType: ADONE_OPTIONS[2], // default to Full Real
        customFlavor: '',
        flowers: FLOWER_OPTIONS[0]
      }
    ])
  );

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemOptions, setItemOptions] = useState(buildInitialOptions);

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const activeOptions = selectedImage ? itemOptions[String(selectedImage.id)] : null;

  const handleOptionChange = (rawId, field, value) => {
    const id = String(rawId);
    setItemOptions(prev => {
      const next = { ...prev };
      const item = GALLERY_ITEMS.find(i => i.id === Number(rawId));

      if (field === 'adoneType') {
        if (value === 'Full Dummy') {
          next[id] = { ...next[id], adoneType: value, flavor: '', customFlavor: '' };
        } else if (value === 'Partial Dummy') {
          next[id] = { ...next[id], adoneType: value, flavor: PARTIAL_FLAVORS[0], customFlavor: '' };
        } else {
          next[id] = { ...next[id], adoneType: value, flavor: (FLAVORS[0] ?? ''), customFlavor: '' };
        }
      } else if (field === 'flavor') {
        next[id] = { ...next[id], flavor: value };
        if (value !== 'Custom') next[id].customFlavor = '';
      } else if (field === 'customFlavor') {
        next[id] = { ...next[id], customFlavor: value, flavor: 'Custom' };
      } else {
        next[id] = { ...next[id], [field]: value };
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
          {filteredItems.map(item => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              className="bg-white/70 border border-luxury-sand/70 p-3 flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <div>
                <div
                  onClick={() => setSelectedImage(item)}
                  className="aspect-square overflow-hidden bg-luxury-sand relative cursor-pointer mb-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-luxury-cream/90 backdrop-blur-xs px-3 py-1 text-[11px] font-sans font-medium text-luxury-charcoal border border-luxury-sand">
                    {item.rate}
                  </div>
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
                        value={itemOptions[String(item.id)].adoneType}
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
                        value={itemOptions[String(item.id)].flowers}
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
                  {itemOptions[String(item.id)].adoneType !== 'Full Dummy' && (
                    <>
                      <label className="block uppercase tracking-[0.3em] text-luxury-muted mb-1">Flavor</label>
                      <select
                        value={itemOptions[String(item.id)].flavor}
                        onChange={e => handleOptionChange(item.id, 'flavor', e.target.value)}
                        className="w-full rounded border border-luxury-sand bg-white px-3 py-2 text-[12px] text-luxury-charcoal outline-none transition-shadow duration-200 focus:shadow-sm"
                      >
                        {itemOptions[String(item.id)].adoneType === 'Partial Dummy'
                          ? PARTIAL_FLAVORS.map(flavor => (
                              <option key={flavor} value={flavor}>{flavor}</option>
                            ))
                          : FLAVORS.map(flavor => (
                              <option key={flavor} value={flavor}>{flavor}</option>
                            ))}
                      </select>

                      {itemOptions[String(item.id)].flavor === 'Custom' && (
                        <input
                          type="text"
                          value={itemOptions[String(item.id)].customFlavor}
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
                onClick={() => setSelectedImage(item)}
                className="mt-4 w-full bg-luxury-charcoal text-luxury-cream py-3 text-[12px] uppercase tracking-luxury flex items-center justify-center gap-2 hover:bg-luxury-champagne hover:text-luxury-charcoal transition-colors duration-300"
              >
                Get Rate <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
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
                <img src={selectedImage.image} alt={selectedImage.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-extreme text-luxury-champagne mb-1 flex items-center gap-1">
                    <Sparkles size={11} /> {selectedImage.category}
                  </span>
                  <h2 className="text-2xl font-serif text-luxury-charcoal mb-2">{selectedImage.title}</h2>
                  
                  {/* Price Tag in Modal */}
                  <div className="inline-flex items-center gap-1 bg-luxury-sand/50 px-2.5 py-1 text-xs font-serif text-luxury-charcoal mb-4 border border-luxury-sand">
                    <Tag size={12} className="text-luxury-champagne" />
                    <span>Base Rate: <strong className="font-sans font-medium">{selectedImage.rate}</strong></span>
                  </div>

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

                <a 
                  href="/contact"
                  className="w-full text-center bg-luxury-charcoal text-luxury-cream py-3 text-[10px] uppercase tracking-luxury hover:bg-luxury-champagne hover:text-luxury-charcoal transition-colors"
                >
                  Request a Custom Quote
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}