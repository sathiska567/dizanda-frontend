import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Tag, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', 'Signature Tiers', 'Bespoke Sculptures', 'Petit Gateaux'];

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'The Ivory Renaissance',
    category: 'Signature Tiers',
    rate: '$280',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop',
    description: 'Triple-tiered Tahitian vanilla bean sponge infused with champagne reduction and white truffle ganache.'
  },
  {
    id: 2,
    title: 'Midnight Velvet',
    category: 'Bespoke Sculptures',
    rate: '$350',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
    description: 'Structural 72% Valrhona dark chocolate cake decorated with 24k leaf accents and edible obsidian fragments.'
  },
  {
    id: 3,
    title: 'Golden Horizon',
    category: 'Signature Tiers',
    rate: '$410',
    image: 'https://images.unsplash.com/photo-1525257023060-74944f5c8716?q=80&w=800&auto=format&fit=crop',
    description: 'Hand-sculpted sugar flowers sitting atop salted caramel layers and praline buttercream.'
  },
  {
    id: 4,
    title: 'Opaline Tartlet Set',
    category: 'Petit Gateaux',
    rate: '$120 / set',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
    description: 'Miniature tartlets with wild blackberry curd, edible micro-botanicals, and gold dust.'
  },
  {
    id: 5,
    title: 'Monolith Rose',
    category: 'Bespoke Sculptures',
    rate: '$480',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop',
    description: 'Architectural sugar sculpture draped over delicate elderflower and raspberry mousse tiers.'
  },
  {
    id: 6,
    title: 'Matcha Supreme',
    category: 'Petit Gateaux',
    rate: '$140 / set',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop',
    description: 'Ceremonial grade Uji matcha sponge layered with white chocolate yuzu cremeux.'
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = activeCategory === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="pt-28 pb-20 bg-luxury-cream min-h-screen px-4 md:px-10 max-w-7xl mx-auto">
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

      {/* Gallery Grid - 2 COLUMNS ON MOBILE */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <AnimatePresence>
          {filteredItems.map(item => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              className="bg-white/60 border border-luxury-sand/70 p-2.5 sm:p-3 flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Image Box */}
                <div 
                  onClick={() => setSelectedImage(item)}
                  className="aspect-square overflow-hidden bg-luxury-sand relative cursor-pointer mb-3"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Badge Rate overlay */}
                  <div className="absolute top-2 right-2 bg-luxury-cream/90 backdrop-blur-xs px-2 py-0.5 text-[9px] font-sans font-medium text-luxury-charcoal border border-luxury-sand">
                    {item.rate}
                  </div>
                </div>

                {/* Details */}
                <span className="text-[9px] uppercase tracking-wider text-luxury-champagne block mb-1 font-medium">
                  {item.category}
                </span>
                <h3 className="text-sm md:text-base font-serif text-luxury-charcoal line-clamp-1 mb-1">
                  {item.title}
                </h3>
              </div>

              {/* Get Rate / Inquiry Button */}
              <button 
                onClick={() => setSelectedImage(item)}
                className="mt-3 w-full bg-luxury-charcoal text-luxury-cream py-2 text-[9px] sm:text-[10px] uppercase tracking-luxury flex items-center justify-center gap-1.5 hover:bg-luxury-champagne hover:text-luxury-charcoal transition-colors duration-300"
              >
                Get Rate Quote <ArrowRight size={10} />
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

                  <p className="text-[11px] text-luxury-muted leading-relaxed mb-6 font-light">
                    {selectedImage.description}
                  </p>
                </div>

                <a 
                  href="/contact"
                  className="w-full text-center bg-luxury-charcoal text-luxury-cream py-3 text-[10px] uppercase tracking-luxury hover:bg-luxury-champagne hover:text-luxury-charcoal transition-colors"
                >
                  Book Custom Commission
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}