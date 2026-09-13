
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParallaxImage from './ParallaxImage';

const COLLECTIONS = [
  {
    id: 1,
    title: 'The Wedding Editorial',
    desc: 'Monolithic tier structures draped in premium white chocolate ribbons.',
    img: 'https://images.unsplash.com/photo-1525257023060-74944f5c8716?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Avant-Garde Ganache',
    desc: 'Sharp geometric silhouettes layered with dark single-origin dark chocolates.',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop'
  }
];

export default function Collections() {
  return (
    <section className="bg-luxury-cream py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-light tracking-wide text-luxury-charcoal">Curated Masterpieces</h2>
        <div className="w-12 h-[1px] bg-luxury-champagne mx-auto mt-4" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {COLLECTIONS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
          <Link to="/collection" className="group block cursor-pointer">
            <ParallaxImage
              src={item.img}
              alt={item.title}
              className="bg-luxury-sand aspect-[4/5] mb-6"
              imgClassName="grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <h3 className="text-xl tracking-wide text-luxury-charcoal mb-2">{item.title}</h3>
            <p className="text-sm text-luxury-muted leading-relaxed font-light mb-4 max-w-sm">{item.desc}</p>
            <span className="text-sm tracking-luxury uppercase border-b border-luxury-charcoal/30 group-hover:border-luxury-champagne pb-1 transition-colors">
              View Collection
            </span>
          </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}