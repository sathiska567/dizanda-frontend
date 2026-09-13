import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useAdminContent } from '../../hooks/useAdminContent';
import { DEFAULT_HOME_CONTENT } from '../Home/homeContent';
import ParallaxImage from '../Home/ParallaxImage';
import TiltCard from '../Home/TiltCard';

export default function Collection() {
  const home = useAdminContent('/home', DEFAULT_HOME_CONTENT);
  const cakes = home.featuredProducts;

  return (
    <div className="pt-32 pb-24 bg-luxury-cream min-h-screen px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-16">
        <p className="text-[10px] uppercase tracking-extreme text-luxury-muted mb-3">Every Signature Cake</p>
        <h1 className="text-4xl md:text-6xl font-serif text-luxury-charcoal font-light mb-4">The Collection</h1>
        <div className="w-12 h-[1px] bg-luxury-champagne mx-auto" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {cakes.map((cake, idx) => (
          <motion.div
            key={cake.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (idx % 8) * 0.08 }}
            className="group cursor-pointer"
          >
            <TiltCard className="block aspect-3/4">
              <ParallaxImage
                src={cake.image}
                alt={cake.name}
                className="h-full w-full bg-luxury-sand"
                imgClassName="group-hover:scale-110 transition-transform duration-700 ease-out"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-luxury-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif text-luxury-cream leading-tight mb-1">
                        {cake.name}
                      </h3>
                      <p className="text-[11px] text-luxury-cream/70 font-light opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                        {cake.flavor}
                      </p>
                    </div>
                    <a
                      href="/gallery"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 grid place-items-center w-9 h-9 rounded-full border border-luxury-cream/50 text-luxury-cream group-hover:bg-luxury-champagne group-hover:border-luxury-champagne group-hover:text-luxury-charcoal transition-colors"
                      aria-label={`Enquire about ${cake.name}`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </ParallaxImage>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-20">
        <p className="text-sm text-luxury-muted font-light mb-4">Looking for something bespoke?</p>
        <a
          href="/contact"
          className="inline-block text-xs uppercase tracking-extreme border border-luxury-charcoal/30 px-8 py-3 hover:bg-luxury-charcoal hover:text-luxury-cream transition-all"
        >
          Book a Consultation
        </a>
      </div>
    </div>
  );
}
