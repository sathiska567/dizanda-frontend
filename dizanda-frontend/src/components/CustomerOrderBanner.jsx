import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function CustomerOrderBanner({ onOpen }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-[2rem] border border-luxury-sand bg-white/95 p-4 shadow-2xl backdrop-blur-md text-luxury-charcoal md:px-6 md:py-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-extreme text-luxury-muted mb-1">Custom Cake Request</p>
              <h3 className="text-lg font-serif text-luxury-charcoal">Have a cake style in mind?</h3>
              <p className="text-sm text-luxury-muted mt-1">Upload a photo, choose your add-ons, and share your details for a custom order.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpen}
                className="rounded-full bg-luxury-charcoal px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-luxury-cream transition hover:bg-luxury-onyx"
              >
                Custom your order
              </button>
              <button
                type="button"
                onClick={() => setShowBanner(false)}
                className="rounded-full border border-luxury-sand bg-luxury-cream px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-luxury-charcoal transition hover:bg-luxury-sand"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
