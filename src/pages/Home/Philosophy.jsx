import { motion } from 'framer-motion';

export default function Philosophy() {
  return (
    <section className="py-24 px-6 md:px-12 bg-luxury-sand/30 border-y border-luxury-sand/60">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Editorial Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] bg-luxury-sand overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop" 
              alt="Pastry Chef Crafting Details" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden sm:block bg-luxury-cream p-8 border border-luxury-sand shadow-lg max-w-xs">
            <p className="text-[10px] uppercase tracking-extreme text-luxury-champagne mb-2">Artisan Craft</p>
            <p className="text-xs text-luxury-muted font-serif italic">
              "Every tier is balanced mathematically, every sugar petal sculpted by hand."
            </p>
          </div>
        </motion.div>

        {/* Right Brand Story */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-xs uppercase tracking-extreme text-luxury-muted">The Philosophy</p>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-charcoal font-light leading-tight">
            An Atelier Built on <br />
            <span className="italic">Uncompromising Detail.</span>
          </h2>
          <div className="w-12 h-[1px] bg-luxury-champagne" />
          <p className="text-xs text-luxury-muted leading-relaxed font-light">
            Founded on the principle that celebration deserves architectural mastery, Dizanda bringsTogether rare single-origin cocoa, edible 24k gold, and botanicals sourced directly from private estates across Europe.
          </p>
          <p className="text-xs text-luxury-muted leading-relaxed font-light">
            We don't merely bake—we design centerpiece sculptures tailored specifically to the lighting, aesthetic, and mood of your grandest occasions.
          </p>
          <div className="pt-4">
            <a 
              href="/about" 
              className="inline-block border-b border-luxury-charcoal pb-1 text-xs uppercase tracking-luxury text-luxury-charcoal hover:border-luxury-champagne hover:text-luxury-champagne transition-colors"
            >
              Read Our Full Story
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}