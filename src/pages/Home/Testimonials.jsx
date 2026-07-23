import { motion } from 'framer-motion';

const PRESS_QUOTES = [
  {
    quote: "Dizanda has completely redefined cake design into fine art sculpture.",
    source: "Vogue Weddings"
  },
  {
    quote: "The taste matches the staggering beauty—an unforgettable sensory experience.",
    source: "Harper's Bazaar"
  },
  {
    quote: "The centerpiece of our wedding. Basilu and the team delivered beyond expectations.",
    source: "Private Client, Manhattan"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-center">
      <p className="text-xs uppercase tracking-extreme text-luxury-muted mb-12">Accolades & Praise</p>
      
      <div className="grid md:grid-cols-3 gap-12">
        {PRESS_QUOTES.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="flex flex-col justify-between space-y-6"
          >
            <p className="text-base font-serif italic text-luxury-charcoal leading-relaxed">
              "{item.quote}"
            </p>
            <div>
              <div className="w-6 h-[1px] bg-luxury-champagne mx-auto mb-2" />
              <span className="text-[10px] uppercase tracking-extreme text-luxury-muted">{item.source}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}