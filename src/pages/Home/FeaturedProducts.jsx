import { motion } from 'framer-motion';
import { DEFAULT_HOME_CONTENT } from './homeContent';

export default function FeaturedProducts({ products = DEFAULT_HOME_CONTENT.featuredProducts }) {
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
        {products.map((cake, idx) => (
          <motion.div
            key={cake.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="group cursor-pointer"
          >
            <div className="aspect-3/4 bg-luxury-sand overflow-hidden mb-6 relative">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
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
