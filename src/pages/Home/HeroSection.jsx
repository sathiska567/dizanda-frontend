
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-luxury-sand">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-sand/70 via-luxury-cream/80 to-luxury-cream/100" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="text-center lg:text-left"
          >
            <p className="text-xs uppercase tracking-extreme text-luxury-charcoal/70 mb-4">Bespoke Ceremony Cakes</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-tight text-luxury-charcoal mb-6">
              Sculptural cakes for the most memorable moments.
            </h1>
            <p className="max-w-2xl mx-auto lg:mx-0 text-sm md:text-base text-luxury-charcoal/80 leading-relaxed mb-8">
              A refined atelier where architectural sugar artistry meets elegant flavor direction for weddings, editorial events, and private celebrations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center rounded-full border border-luxury-charcoal bg-luxury-charcoal px-6 py-3 text-xs uppercase tracking-[0.32em] text-luxury-cream transition hover:bg-luxury-onyx"
              >
                View Gallery
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-luxury-charcoal bg-white/90 px-6 py-3 text-xs uppercase tracking-[0.32em] text-luxury-charcoal transition hover:bg-luxury-cream"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="rounded-[2rem] border border-luxury-sand bg-white/90 p-6 shadow-2xl backdrop-blur-sm"
          >
            <p className="text-[10px] uppercase tracking-extreme text-luxury-muted mb-3">Featured Atelier Service</p>
            <h2 className="text-2xl font-serif text-luxury-charcoal mb-4">Editorial Wedding Cakes</h2>
            <p className="text-sm text-luxury-charcoal/80 leading-relaxed mb-6">
              Elegant tiered compositions with hand-sculpted florals, gold leaf detailing, and signature fillings.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl overflow-hidden bg-luxury-sand h-36">
                <img
                  src="https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=600&auto=format&fit=crop"
                  alt="Gold wedding cake"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden bg-luxury-sand h-36">
                <img
                  src="https://images.unsplash.com/photo-1525257023060-74944f5c8716?q=80&w=600&auto=format&fit=crop"
                  alt="Modern wedding cake"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}