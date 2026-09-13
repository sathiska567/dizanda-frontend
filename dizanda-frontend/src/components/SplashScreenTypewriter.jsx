import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BRAND = 'DIZANDA';
const TYPE_SPEED = 180; // ms per letter

export default function SplashScreenTypewriter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= BRAND.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), TYPE_SPEED);
    return () => clearTimeout(timer);
  }, [count]);

  const doneTyping = count >= BRAND.length;

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-luxury-charcoal"
    >
      <div className="flex items-baseline">
        <span className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-extreme uppercase text-luxury-cream">
          {BRAND.slice(0, count)}
        </span>
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: 'linear' }}
          className="ml-1 h-8 sm:h-11 md:h-13 w-[2px] bg-luxury-champagne"
        />
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: doneTyping ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformOrigin: 'left' }}
        className="mt-6 h-px w-24 bg-luxury-champagne"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: doneTyping ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 text-[10px] sm:text-xs uppercase tracking-extreme text-luxury-muted"
      >
        Bespoke Ceremony Cakes
      </motion.p>
    </motion.div>
  );
}
