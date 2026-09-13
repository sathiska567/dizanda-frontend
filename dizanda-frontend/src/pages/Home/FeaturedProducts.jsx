import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_HOME_CONTENT } from './homeContent';
import ParallaxImage from './ParallaxImage';
import TiltCard from './TiltCard';

export default function FeaturedProducts({ products = DEFAULT_HOME_CONTENT.featuredProducts }) {
  return (
    <section className="py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <p className="text-sm uppercase tracking-extreme text-luxury-muted mb-3">Signature Menu</p>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-charcoal font-light">The Collection</h2>
        </div>
        <a
          href="/gallery"
          className="mt-4 md:mt-0 text-sm uppercase tracking-luxury text-luxury-muted hover:text-luxury-charcoal transition-colors border-b border-luxury-sand pb-1 self-start"
        >
          Full Catalog →
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {products.map((cake, idx) => (
          <motion.div
            key={cake.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (idx % 8) * 0.08 }}
          >
            <Link to="/collection" className="group block cursor-pointer">
              <TiltCard className="block aspect-3/4">
                <ParallaxImage
                  src={cake.image}
                  alt={cake.name}
                  className="h-full w-full bg-luxury-sand"
                  imgClassName="group-hover:scale-110 transition-transform duration-700 ease-out"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/70 via-luxury-charcoal/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-end justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-serif text-luxury-cream leading-tight">{cake.name}</h3>
                      <span className="shrink-0 grid place-items-center w-9 h-9 rounded-full border border-luxury-cream/50 text-luxury-cream group-hover:bg-luxury-champagne group-hover:border-luxury-champagne group-hover:text-luxury-charcoal transition-colors">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </ParallaxImage>
              </TiltCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
