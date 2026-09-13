import { motion } from 'framer-motion';

const BRAND = 'DIZANDA';

export default function SplashScreen() {
  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-luxury-charcoal"
    >
      <div className="flex overflow-hidden">
        {BRAND.split('').map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-extreme uppercase text-luxury-cream inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: 'easeInOut' }}
        className="mt-6 h-px w-24 bg-luxury-champagne"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-4 text-[10px] sm:text-xs uppercase tracking-extreme text-luxury-muted"
      >
        Bespoke Ceremony Cakes
      </motion.p>
    </motion.div>
  );
}
