
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-luxury-sand">
      {/* Editorial Structural Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-cream/40 z-10" />
      
      {/* Fine art graphic background placeholder - replace url with dynamic assets later */}
      <div 
        className="absolute inset-0 w-full h-full scale-105 bg-cover bg-center opacity-85 transition-transform duration-10000 ease-out"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=1974&auto=format&fit=crop')` }}
      />

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16">
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="text-xs uppercase tracking-extreme text-luxury-charcoal mb-4"
        >
          Haute Pâtisserie Architecture
        </motion.p>

<motion.h1 
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
  className="text-5xl md:text-8xl font-light tracking-wide text-luxury-charcoal leading-tight font-serif mb-8"
>
  Sculpted Sugars,<br />
  <span className="italic">Timeless Flavors.</span>
</motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <button className="border border-luxury-charcoal px-8 py-3.5 text-xs uppercase tracking-luxury text-luxury-charcoal bg-transparent hover:bg-luxury-charcoal hover:text-luxury-cream transition-all duration-500 ease-in-out">
            Explore The Atelier
          </button>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
        <span className="text-[9px] tracking-extreme text-luxury-charcoal uppercase block opacity-60 animate-pulse">Scroll</span>
      </div>
    </section>
  );
}