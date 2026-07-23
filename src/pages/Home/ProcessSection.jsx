import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Design Consultation',
    desc: 'We review your event mood boards, venue palette, and structural preferences.'
  },
  {
    num: '02',
    title: 'Private Tasting',
    desc: 'A curated tasting box delivered to your residence featuring six seasonal flavor combinations.'
  },
  {
    num: '03',
    title: 'Architectural Crafting',
    desc: 'Hand-sculpted sugar flowers and structural baking executed 24 hours prior to delivery.'
  },
  {
    num: '04',
    title: 'White-Glove Delivery',
    desc: 'Temperature-controlled transport and direct on-site setup by our atelier team.'
  }
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-luxury-onyx text-luxury-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-extreme text-luxury-champagne mb-3">Seamless Experience</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light mb-4">The Bespoke Process</h2>
          <p className="text-xs text-luxury-muted font-light leading-relaxed">
            From initial sketch to the moment of cutting, we ensure every detail is handled with precision.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, idx) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="border-t border-luxury-cream/10 pt-8 space-y-4 relative"
            >
              <span className="text-2xl font-serif text-luxury-champagne">{step.num}</span>
              <h3 className="text-lg font-serif">{step.title}</h3>
              <p className="text-xs text-luxury-muted leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}