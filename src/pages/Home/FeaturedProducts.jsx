import { motion } from 'framer-motion';

const SIGNATURE_CAKES = [
  {
    id: 1,
    name: 'The Noir Marquis',
    flavor: '70% Valrhona Dark Ganache & Espresso',
    price: '$280',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Solstice Blossom',
    flavor: 'Elderflower, Wild Raspberry & Pistachio',
    price: '$340',
    img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Aurelia Crown',
    flavor: 'Champagne Sponge & Salted Praline',
    price: '$410',
    img: 'https://images.unsplash.com/photo-1525257023060-74944f5c8716?q=80&w=800&auto=format&fit=crop'
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <p className="text-xs uppercase tracking-extreme text-luxury-muted mb-3">Signature Menu</p>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-charcoal font-light">Available Commissions</h2>
        </div>
        <a 
          href="/gallery" 
          className="mt-4 md:mt-0 text-xs uppercase tracking-luxury text-luxury-muted hover:text-luxury-charcoal transition-colors border-b border-luxury-sand pb-1 self-start"
        >
          View Complete Catalog →
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {SIGNATURE_CAKES.map((cake, idx) => (
          <motion.div 
            key={cake.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/4] bg-luxury-sand overflow-hidden mb-6 relative">
              <img 
                src={cake.img} 
                alt={cake.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <span className="absolute top-4 right-4 bg-luxury-cream/90 backdrop-blur-sm px-3 py-1 text-[10px] tracking-wider uppercase font-medium">
                {cake.price}
              </span>
            </div>
            <h3 className="text-xl font-serif text-luxury-charcoal group-hover:text-luxury-champagne transition-colors mb-1">
              {cake.name}
            </h3>
            <p className="text-xs text-luxury-muted font-light mb-4">{cake.flavor}</p>
            <button className="text-[10px] uppercase tracking-extreme border border-luxury-charcoal/30 w-full py-2.5 group-hover:bg-luxury-charcoal group-hover:text-luxury-cream transition-all">
              Reserve Order
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}